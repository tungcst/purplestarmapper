// src/pages/生日時辰輸入組件.u1s33.js
import { local } from 'wix-storage';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';
import wixData from 'wix-data';

$w.onReady(function () {
    console.log("[Birth Input Page] Velo onReady.");

    if (!wixUsers.currentUser.loggedIn) {
        console.warn("[Birth Input Page] User not logged in. Redirecting to sign-in.");
        wixLocation.to('/sign-in'); // 假設登錄頁面路徑
        return;
    }

    const language = wixWindow.multilingual.currentLanguage || 'zh';
    const messages = {
        zh: { required: "請完整填寫所有必填項。", button: "生成專屬報告", error: "提交失敗，請稍後重試。" },
        en: { required: "Please fill all fields.", button: "Generate Report", error: "Submission failed. Please try again." }
    };

    const birthDatePicker = $w("#birthDate");
    const birthTimeDropdown = $w("#birthTime");
    const genderDropdown = $w("#gender");
    const serviceDropdown = $w("#serviceSelect");
    const submitButton = $w("#submitButton");
    const statusMessage = $w("#statusMessage"); // 假設你有一個文本元素用於顯示狀態/錯誤

    if (statusMessage && statusMessage.hide) statusMessage.hide();

    if (submitButton.type) {
        submitButton.label = messages[language].button;
    } else {
        console.error("[Birth Input Page] Submit button #submitButton not found.");
        if(statusMessage) { statusMessage.text = "頁面初始化錯誤。"; statusMessage.show(); }
        return;
    }

    // 初始化下拉選項 (這部分您的代碼已經有了，保持即可)
    if (genderDropdown.type) {
        genderDropdown.options = [
            { label: language === 'zh' ? "男命" : "Male", value: "M" },
            { label: language === 'zh' ? "女命" : "Female", value: "F" }
        ];
    }
    if (serviceDropdown.type) {
        serviceDropdown.options = [
            { label: language === 'zh' ? "紫微斗數全面分析" : "Comprehensive Purple Star Analysis", value: "ziwei" },
            { label: language === 'zh' ? "事業運勢全面分析" : "Career Fortune Analysis", value: "career" },
            { label: language === 'zh' ? "愛情運勢全面分析" : "Love Fortune Analysis", value: "love" }
        ];
    }
    if (birthTimeDropdown.type) {
        birthTimeDropdown.options = [
            { label: (language === 'zh' ? "子時" : "Zi") + " (23:00-00:59)", value: "0" },
            { label: (language === 'zh' ? "丑時" : "Chou") + " (01:00-02:59)", value: "1" },
            { label: (language === 'zh' ? "寅時" : "Yin") + " (03:00-04:59)", value: "2" },
            { label: (language === 'zh' ? "卯時" : "Mao") + " (05:00-06:59)", value: "3" },
            { label: (language === 'zh' ? "辰時" : "Chen") + " (07:00-08:59)", value: "4" },
            { label: (language === 'zh' ? "巳時" : "Si") + " (09:00-10:59)", value: "5" },
            { label: (language === 'zh' ? "午時" : "Wu") + " (11:00-12:59)", value: "6" },
            { label: (language === 'zh' ? "未時" : "Wei") + " (13:00-14:59)", value: "7" },
            { label: (language === 'zh' ? "申時" : "Shen") + " (15:00-16:59)", value: "8" },
            { label: (language === 'zh' ? "酉時" : "You") + " (17:00-18:59)", value: "9" },
            { label: (language === 'zh' ? "戌時" : "Xu") + " (19:00-20:59)", value: "10" },
            { label: (language === 'zh' ? "亥時" : "Hai") + " (21:00-22:59)", value: "11" }
        ];
    }

    let isSubmitting = false;
    submitButton.onClick(async () => {
        if (isSubmitting) {
            console.log("[Birth Input Page] Submission in progress, ignoring click.");
            return;
        }
        isSubmitting = true;
        submitButton.disable();
        if (statusMessage && statusMessage.hide) statusMessage.hide();

        const birthDateValue = birthDatePicker.value;
        const birthTimeValue = birthTimeDropdown.value; // 這是時辰索引 "0" 到 "11"
        const genderValue = genderDropdown.value;
        const serviceValue = serviceDropdown.value;

        if (!birthDateValue || !birthTimeValue || !genderValue || !serviceValue) {
            console.warn("[Birth Input Page] Input validation failed: All fields are required.");
            if(statusMessage) {
                statusMessage.text = messages[language].required;
                statusMessage.show();
            }
            submitButton.enable();
            isSubmitting = false;
            return;
        }

        // 紫微斗數子時換日邏輯 (晚上11點換日)
        let adjustedBirthDate = new Date(birthDateValue.getTime()); // 複製日期對象
        const selectedHourIndex = parseInt(birthTimeValue, 10); // "0" 代表子時

        // 判斷是否是 "當天的" 23:00-23:59 (仍算當日子時，但日期需調整為下一天給 iztro)
        // 或 "隔天的" 00:00-00:59 (也算子時，日期是正確的)
        // react-iztro 的 birthTime 參數期望的是 0-12 的索引，0代表早子/晚子，1代表丑時1點...
        // 我們的下拉框 "0" 代表整個 23:00-00:59 的子時。
        // 如果用戶選擇了子時 (value "0")，並且如果需要，我們應該將公曆日期調整到 "第二天"
        // react-iztro 內部會根據傳入的公曆年月日和時辰索引來確定正確的干支。
        // 關鍵是傳給 react-iztro 的公曆日期。
        // 紫微斗數的習慣：23點即換日。
        // 若 DatePicker 選擇的是 5月21日，選擇了子時，則命盤應按 5月22日子時排。

        // 簡化處理：如果選的是 "0" (子時)，直接將日期推後一天，讓後端或 iztro 處理具體是哪個子時。
        // react-iztro 的 birthTime: 0 能夠處理子時。
        // 主要問題是公曆日期是否需要調整。
        // 根據你的要求：晚上11時已是換日了，即是子時就是另一天的開始。
        // 這意味著，如果用戶選擇的是 2024-05-21 的子時，則實際上是 2024-05-22 的子時。
        // 所以，如果 birthTimeValue 是 "0"，我們將日期加一天。
        if (birthTimeValue === "0") {
            adjustedBirthDate.setDate(adjustedBirthDate.getDate() + 1);
            console.log(`[Birth Input Page] Zi Shi selected. Adjusted date to: 
${adjustedBirthDate.toISOString().split('T')[0]}`);
        }
        
        const dataForStorageAndDB = {
            userId: wixUsers.currentUser.id,
            birthDate: adjustedBirthDate.toISOString().split('T')[0], // YYYY-MM-DD
            birthTime: selectedHourIndex, // 數字 0-11
            gender: genderValue,
            service: serviceValue,
            solar: true, // 假設總是陽曆輸入
            lang: language,
            generatedAt: new Date(),
            status: "pending", // 新報告初始狀態為 pending
            isPaid: false // 新報告默認為未付費/試閱
        };

        console.log("[Birth Input Page] Data to be saved:", dataForStorageAndDB);

        try {
            // 1. 先將初步報告存入 Wix Data，獲取 reportId
            if(statusMessage) { statusMessage.text = "正在生成報告記錄..."; statusMessage.show(); }
            const insertedReport = await wixData.insert("Reports", dataForStorageAndDB);
            const newReportId = insertedReport._id;
            console.log(`[Birth Input Page] Report record saved to Wix Data. Report ID: ${newReportId}`);

            // 2. 將 reportId 和核心數據存入 local storage 供報告頁面快速讀取 (可選，但有助於UX)
            // 報告頁面應主要依賴 reportId 從數據庫加載完整數據以保證一致性
            const dataForLocalStorage = {
                reportId: newReportId, // 包含 reportId
                birthDate: dataForStorageAndDB.birthDate,
                birthTime: dataForStorageAndDB.birthTime,
                gender: dataForStorageAndDB.gender,
                service: dataForStorageAndDB.service,
                solar: dataForStorageAndDB.solar,
                lang: dataForStorageAndDB.lang
            };
            local.setItem("currentReportInput", JSON.stringify(dataForLocalStorage));
            console.log("[Birth Input Page] Core data saved to local storage for chart page.");

            // 3. 跳轉到報告頁面，並附帶 reportId
            if(statusMessage) statusMessage.text = "正在跳轉至報告頁面...";
            wixLocation.to(`/chart?reportId=${newReportId}`);

        } catch (error) {
            console.error("[Birth Input Page] Error saving report to Wix Data or redirecting:", error);
            if(statusMessage) {
                statusMessage.text = messages[language].error + (error.message ? ` (${error.message})` : "");
                statusMessage.show();
            }
            submitButton.enable();
            isSubmitting = false;
        }
    });
});
