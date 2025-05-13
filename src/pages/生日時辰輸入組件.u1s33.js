// 在你的生日時辰輸入頁面 .jsrp.js 文件中
import { local } from 'wix-storage'; // 如果你確實還需要在某處用到它
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';
import wixData from 'wix-data';

$w.onReady(function () {
    console.log("生日時辰輸入頁面 Velo 初始化");
    if (!wixUsers.currentUser.loggedIn) {
        console.warn("用戶未登錄，導向登錄頁面");
        wixLocation.to('/sign-in'); // 假設你的登錄頁面是 /sign-in
        return;
    }

    const elementsToVerify = ['#birthDate', '#birthTime', '#gender', '#serviceSelect', '#submitButton'];
    elementsToVerify.forEach(id => {
        if (!$w(id).type) console.error(`錯誤：找不到元素 ${id}`);
    });

    let language = wixWindow.multilingual.currentLanguage || 'zh';
    let messages = {
        zh: { required: "請填寫所有欄位", button: "生成命盤", error: "提交失敗，請稍後重試" },
        en: { required: "Please fill all fields", button: "Generate Chart", error: "Submission failed, please try again" }
    };

    if ($w("#submitButton").type) $w("#submitButton").label = messages[language].button;
    if ($w("#gender").type) $w("#gender").options = [
        { label: language === 'zh' ? "男" : "Male", value: "M" },
        { label: language === 'zh' ? "女" : "Female", value: "F" }
    ];
    if ($w("#serviceSelect").type) $w("#serviceSelect").options = [
        { label: language === 'zh' ? "紫微斗數" : "Purple Star", value: "ziwei" },
        { label: language === 'zh' ? "事業運勢" : "Career", value: "career" },
        { label: language === 'zh' ? "愛情運勢" : "Love", value: "love" }
    ];
    if ($w("#birthTime").type) $w("#birthTime").options = [
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

    let isSubmitting = false;
    $w("#submitButton").onClick(() => {
        if (isSubmitting) return;
        isSubmitting = true;
        $w("#submitButton").disable();

        let birthDateValue = $w("#birthDate").value;
        let birthTimeValue = $w("#birthTime").value; // "0"-"11"
        let genderValue = $w("#gender").value;     // "M" or "F"
        let serviceValue = $w("#serviceSelect").value;

        if (!birthDateValue || !birthTimeValue || !genderValue || !serviceValue) {
            $w("#submitButton").label = messages[language].required;
            setTimeout(() => {
                $w("#submitButton").label = messages[language].button;
                $w("#submitButton").enable();
                isSubmitting = false;
            }, 2000);
            return;
        }

        let adjustedChartDate = new Date(birthDateValue);
        if (birthTimeValue === "0") { 
            adjustedChartDate.setDate(adjustedChartDate.getDate() + 1);
        }

        const reportInsertData = {
            userId: wixUsers.currentUser.id,
            chartBirthDate: adjustedChartDate,
            chartBirthTimeIndex: parseInt(birthTimeValue, 10),
            originalBirthDate: birthDateValue,
            gender: genderValue,
            service: serviceValue,
            solar: true,
            lang: language,
            generatedAt: new Date(),
            status: "pending",
            isPaid: false
        };

        wixData.insert("Reports", reportInsertData)
            .then(result => {
                console.log("報告記錄已儲存到 Wix Data:", result._id);
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
    });
});
