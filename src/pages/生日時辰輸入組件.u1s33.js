import { local } from 'wix-storage';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';
import wixData from 'wix-data';

$w.onReady(function () {
    console.log("生日時辰輸入頁面 Velo 初始化");

    // 檢查會員登錄
    if (!wixUsers.currentUser.loggedIn) {
        console.warn("用戶未登錄，導向登錄頁面");
        wixLocation.to('/sign-in');
        return;
    }

    // 檢查元素是否存在
    const elements = ['#birthDate', '#birthTime', '#gender', '#serviceSelect', '#submitButton'];
    elements.forEach(id => {
        console.log(`檢查元素 ${id}:`, $w(id).type ? '存在' : '不存在');
    });

    // 設置語言和訊息
    let language = wixWindow.multilingual.currentLanguage || 'zh';
    let messages = {
        zh: { required: "請填寫所有欄位", button: "生成命盤", error: "提交失敗，請稍後重試" },
        en: { required: "Please fill all fields", button: "Generate Chart", error: "Submission failed, please try again" }
    };

    // 設置提交按鈕
    if ($w("#submitButton").type) {
        $w("#submitButton").label = messages[language].button;
    } else {
        console.error("錯誤：找不到 #submitButton");
        return;
    }

    // 設置性別選項
    if ($w("#gender").type) {
        $w("#gender").options = [
            { label: language === 'zh' ? "男" : "Male", value: "M" },
            { label: language === 'zh' ? "女" : "Female", value: "F" }
        ];
    }

    // 設置服務選項
    if ($w("#serviceSelect").type) {
        $w("#serviceSelect").options = [
            { label: language === 'zh' ? "紫微斗數" : "Purple Star", value: "ziwei" },
            { label: language === 'zh' ? "事業運勢" : "Career", value: "career" },
            { label: language === 'zh' ? "愛情運勢" : "Love", value: "love" }
        ];
    }

    // 設置時辰選項（0-11）
    if ($w("#birthTime").type) {
        $w("#birthTime").options = [
            { label: language === 'zh' ? "子時 (23:00-01:00)" : "Zi (23:00-01:00)", value: "0" },
            { label: language === 'zh' ? "丑時 (01:00-03:00)" : "Chou (01:00-03:00)", value: "1" },
            { label: language === 'zh' ? "寅時 (03:00-05:00)" : "Yin (03:00-05:00)", value: "2" },
            { label: language === 'zh' ? "卯時 (05:00-07:00)" : "Mao (05:00-07:00)", value: "3" },
            { label: language === 'zh' ? "辰時 (07:00-09:00)" : "Chen (07:00-09:00)", value: "4" },
            { label: language === 'zh' ? "巳時 (09:00-11:00)" : "Si (09:00-11:00)", value: "5" },
            { label: language === 'zh' ? "午時 (11:00-13:00)" : "Wu (11:00-13:00)", value: "6" },
            { label: language === 'zh' ? "未時 (13:00-15:00)" : "Wei (13:00-15:00)", value: "7" },
            { label: language === 'zh' ? "申時 (15:00-17:00)" : "Shen (15:00-17:00)", value: "8" },
            { label: language === 'zh' ? "酉時 (17:00-19:00)" : "You (17:00-19:00)", value: "9" },
            { label: language === 'zh' ? "戌時 (19:00-21:00)" : "Xu (19:00-21:00)", value: "10" },
            { label: language === 'zh' ? "亥時 (21:00-23:00)" : "Hai (21:00-23:00)", value: "11" }
        ];
    } else {
        console.error("錯誤：找不到 #birthTime");
        return;
    }

    // 提交按鈕事件
    let isSubmitting = false;
    $w("#submitButton").onClick(() => {
        if (isSubmitting) {
            console.log("防抖：正在提交，忽略重複點擊");
            return;
        }
        isSubmitting = true;
        $w("#submitButton").disable();

        console.log("提交按鈕被點擊");

        let birthDate = $w("#birthDate").value;
        let birthTime = $w("#birthTime").value;
        let gender = $w("#gender").value;
        let service = $w("#serviceSelect").value;

        console.log("輸入數據:", { birthDate, birthTime, gender, service });

        if (!birthDate || !birthTime || !gender || !service) {
            console.warn("輸入不完整");
            $w("#submitButton").label = messages[language].required;
            setTimeout(() => {
                $w("#submitButton").label = messages[language].button;
                $w("#submitButton").enable();
                isSubmitting = false;
            }, 2000);
            return;
        }

        // 子時換日邏輯
        let adjustedDate = new Date(birthDate);
        if (birthTime === "0") { // 子時 (23:00-01:00)
            adjustedDate.setDate(adjustedDate.getDate() + 1);
        }

        // 儲存數據到 wix-storage
        const birthData = {
            birthDate: adjustedDate.toISOString().split('T')[0], // YYYY-MM-DD
            birthTime: parseInt(birthTime, 10), // 時辰索引 (0-11)
            gender: gender,
            service: service,
            solar: true, // 預設陽曆
            lang: language,
            userMarked as completeId: wixUsers.currentUser.id
        };

        console.log("儲存到 wix-storage 的數據:", birthData);

        try {
            local.setItem("birthChartData", JSON.stringify(birthData));
            console.log("數據已儲存到 wix-storage");

            // 儲存到 Wix Data
            const reportData = {
                userId: birthData.userId,
                birthDate: birthData.birthDate,
                birthTime: birthData.birthTime,
                gender: birthData.gender,
                service: birthData.service,
                solar: birthData.solar,
                lang: birthData.lang,
                generatedAt: new Date(),
                status: "pending", // 待報告生成
                isPaid: false // 預設免費
            };

            wixData.insert("Reports", reportData)
                .then(result => {
                    console.log("報告記錄已儲存到 Wix Data:", result);
                    wixLocation.to(`/chart?reportId=${result._id}`);
                })
                .catch(err => {
                    console.error("儲存報告記錄失敗:", err);
                    $w("#submitButton").label = messages[language].error;
                    setTimeout(() => {
                        $w("#submitButton").label = messages[language].button;
                        $w("#submitButton").enable();
                        isSubmitting = false;
                    }, 2000);
                });
        } catch (err) {
            console.error("儲存或導向失敗:", err);
            $w("#submitButton").label = messages[language].error;
            setTimeout(() => {
                $w("#submitButton").label = messages[language].button;
                $w("#submitButton").enable();
                isSubmitting = false;
            }, 2000);
        }
    });
});
