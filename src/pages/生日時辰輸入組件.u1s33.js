import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    console.log("Velo 初始化，$w 是否可用:", typeof $w === 'function');

    const elements = ['#birthDate', '#birthTime', '#gender', '#serviceSelect', '#submitButton'];
    elements.forEach(id => {
        console.log(`檢查元素 ${id}:`, $w(id).type ? '存在' : '不存在');
    });

    let language = wixWindow.multilingual.currentLanguage || 'zh';
    let messages = {
        zh: { required: "請填寫所有欄位", button: "生成命盤", error: "導向失敗，請稍後重試" },
        en: { required: "Please fill all fields", button: "Generate Chart", error: "Redirect failed, please try again" }
    };

    if (!$w("#submitButton").type) {
        console.error("錯誤：找不到 #submitButton");
        return;
    }
    $w("#submitButton").label = messages[language].button;

    if ($w("#gender").type) {
        $w("#gender").options = [
            { label: language === 'zh' ? "男" : "Male", value: "M" },
            { label: language === 'zh' ? "女" : "Female", value: "F" }
        ];
    }

    if ($w("#serviceSelect").type) {
        $w("#serviceSelect").options = [
            { label: language === 'zh' ? "紫微斗數" : "Purple Star", value: "ziwei" },
            { label: language === 'zh' ? "事業運勢" : "Career", value: "career" },
            { label: language === 'zh' ? "愛情運勢" : "Love", value: "love" }
        ];
    }

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
    }

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

        let queryParams = {
            birthDate: birthDate.toISOString(),
            birthTime: birthTime, // 整數值（0-11）
            gender: gender,
            service: service,
            lang: language
        };
        let url = `/chart?${new URLSearchParams(queryParams).toString()}`;
        console.log("導向 URL:", url);

        try {
            wixLocation.to(url);
            console.log("導向已觸發");
        } catch (err) {
            console.error("導向失敗:", err);
            $w("#submitButton").label = messages[language].error;
            setTimeout(() => {
                $w("#submitButton").label = messages[language].button;
                $w("#submitButton").enable();
                isSubmitting = false;
            }, 2000);
        }

        setTimeout(() => {
            $w("#submitButton").enable();
            isSubmitting = false;
        }, 5000); // 延長防抖時間
    });
});