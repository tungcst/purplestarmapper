// Velo Code for Birthday Input Page (/input)
// File: src/pages/生日時辰輸入組件.u1s33.js

import { local } from 'wix-storage';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';
import wixData from 'wix-data';

// --- 輔助函數 ---
function showStatus(messageText, isError = false) {
    const statusElement = $w("#statusMessage"); // 假設您有一個 ID 為 statusMessage 的文本元素來顯示狀態
    if (statusElement && statusElement.show) {
        statusElement.text = messageText;
        // 您可以根據 isError 改變文本顏色或樣式
        // if (isError) { statusElement.style.html = `<p style="color:red;">${messageText}</p>`; }
        // else { statusElement.style.html = `<p>${messageText}</p>`; }
        statusElement.show();
    } else {
        console.warn("Status message element #statusMessage not found. Message:", messageText);
        if (messageText) alert(messageText); // Fallback to alert
    }
}

function hideStatus() {
    const statusElement = $w("#statusMessage");
    if (statusElement && statusElement.hide) {
        statusElement.hide();
    }
}
// --- 輔助函數結束 ---

$w.onReady(function () {
    console.log("[Input Page] Velo onReady.");

    if (!wixUsers.currentUser.loggedIn) {
        console.warn("[Input Page] User not logged in. Redirecting to sign-in page.");
        // 假設您的登錄頁面路徑是 '/login' 或 Wix 默認的登錄流程
        // wixUsers.promptLogin({mode: "login"})
        //    .then(() => {
        //        console.log("User logged in after prompt.");
        //    })
        //    .catch(err => {
        //        console.error("User login prompt failed:", err);
        //        wixLocation.to("/"); // or a public page
        //    });
        // 為了簡單起見，如果嚴格要求登錄才能訪問，可以先跳轉
        wixLocation.to("/login"); // 請確認您的登錄頁面路徑
        return;
    }

    const language = wixWindow.multilingual.currentLanguage || 'zh'; // 預設為中文
    const messages = {
        zh: {
            required: "請完整填寫所有必填項。",
            buttonDefault: "開始分析", // 按鈕的默認文字
            buttonProcessing: "處理中...",
            error: "提交失敗，請稍後重試。",
            successRedirect: "正在準備您的報告..."
        },
        // 可以添加英文或其他語言
        en: {
            required: "Please fill all required fields.",
            buttonDefault: "Get Started",
            buttonProcessing: "Processing...",
            error: "Submission failed. Please try again later.",
            successRedirect: "Preparing your report..."
        }
    };
    const currentMessages = messages[language] || messages.zh; // 獲取當前語言的提示信息

    // --- 獲取頁面元素 ---
    const serviceDropdown = $w("#serviceSelect");
    const birthDatePicker = $w("#birthDate");
    const birthTimeDropdown = $w("#birthTime");
    const genderDropdown = $w("#gender");
    const submitButton = $w("submitButton"); // 假設您的提交按鈕 ID 是 getStartedButton

    // --- 初始化 ---
    hideStatus(); // 頁面加載時隱藏狀態信息
    if (submitButton && submitButton.label) {
        submitButton.label = currentMessages.buttonDefault;
    } else {
        console.error("[Input Page] Submit button #submitButton not found or label property is missing.");
        // 可以在此處 showStatus("頁面錯誤", true); 但可能還沒有 #statusMessage 元素
    }

    // --- 填充下拉選項 (根據您提供的信息) ---
    if (serviceDropdown && serviceDropdown.options) {
        serviceDropdown.options = [
            { "label": "服務選項*", "value": "" , "disabled": true}, // 提示選項
            { "label": "紫微斗數全面分析", "value": "ziwei" },
            { "label": "事業運勢全面分析", "value": "career" },
            { "label": "愛情運勢全面分析", "value": "love" }
        ];
        serviceDropdown.selectedIndex = 0; // 默認選中提示選項
    }

    if (birthTimeDropdown && birthTimeDropdown.options) {
        birthTimeDropdown.options = [
            { "label": "出生時間*", "value": "", "disabled": true },
            { "label": "23:00 - 00:59 (子時)", "value": "0" },
            { "label": "01:00 - 02:59 (丑時)", "value": "1" },
            { "label": "03:00 - 04:59 (寅時)", "value": "2" },
            { "label": "05:00 - 06:59 (卯時)", "value": "3" },
            { "label": "07:00 - 08:59 (辰時)", "value": "4" },
            { "label": "09:00 - 10:59 (巳時)", "value": "5" },
            { "label": "11:00 - 12:59 (午時)", "value": "6" },
            { "label": "13:00 - 14:59 (未時)", "value": "7" },
            { "label": "15:00 - 16:59 (申時)", "value": "8" },
            { "label": "17:00 - 18:59 (酉時)", "value": "9" },
            { "label": "19:00 - 20:59 (戌時)", "value": "10" },
            { "label": "21:00 - 22:59 (亥時)", "value": "11" }
        ];
        birthTimeDropdown.selectedIndex = 0;
    }

    if (genderDropdown && genderDropdown.options) {
        genderDropdown.options = [
            { "label": "性別*", "value": "", "disabled": true },
            { "label": "男", "value": "M" }, // 您的截圖顯示 value 是 M 和 F
            { "label": "女", "value": "F" }
        ];
        genderDropdown.selectedIndex = 0;
    }
    // --- 下拉選項填充完畢 ---

    let isSubmitting = false;
    submitButton.onClick(async () => {
        if (isSubmitting) {
            console.log("[Input Page] Submission already in progress.");
            return;
        }
        isSubmitting = true;
        if (submitButton.disable) submitButton.disable();
        if (submitButton.label) submitButton.label = currentMessages.buttonProcessing;
        hideStatus();

        // --- 獲取輸入值 ---
        const serviceValue = serviceDropdown.value;
        const birthDateValue = birthDatePicker.value; // 這是一個 Date 對象
        const birthTimeValue = birthTimeDropdown.value; // 這是字符串 "0" 到 "11"
        const genderValue = genderDropdown.value; // 這是字符串 "M" 或 "F"

        // --- 輸入驗證 ---
        if (!serviceValue || !birthDateValue || !birthTimeValue || !genderValue) {
            console.warn("[Input Page] Input validation failed. All fields are required.");
            showStatus(currentMessages.required, true);
            if (submitButton.enable) submitButton.enable();
            if (submitButton.label) submitButton.label = currentMessages.buttonDefault;
            isSubmitting = false;
            return;
        }

        // --- 處理日期和時間 ---
        let adjustedBirthDate = new Date(birthDateValue.getTime()); // 複製日期對象以避免修改原始選擇
        const selectedHourIndex = parseInt(birthTimeValue, 10); // 將 "0"-"11" 轉為數字

        // 紫微斗數子時換日邏輯 (晚上11點，即 birthTimeValue === "0"，視為下一天)
        if (birthTimeValue === "0") {
            adjustedBirthDate.setDate(adjustedBirthDate.getDate() + 1);
            console.log(`[Input Page] Zi Shi (23-01) selected. Adjusted date for calculation to: 
${adjustedBirthDate.toISOString().split('T')[0]}`);
        }
        const finalBirthDateString = adjustedBirthDate.toISOString().split('T')[0]; // YYYY-MM-DD 格式

        // --- 準備存儲到數據庫的數據 ---
        const reportData = {
            userId: wixUsers.currentUser.id,
            birthDate: finalBirthDateString,       // YYYY-MM-DD
            birthTime: selectedHourIndex,          // 數字 0-11
            gender: genderValue,                   // "M" 或 "F"
            service: serviceValue,                 // "ziwei", "career", "love"
            solar: true,                           // 固定為陽曆
            lang: language,                        // 'zh', 'en', etc.
            generatedAt: new Date(),               // 當前時間
            status: "pending",                     // 初始狀態
            isPaid: false                          // 默認未付費
            // 'Title' 欄位 Wix 會自動生成，或者您可以自己指定一個有意義的標題
        };

        console.log("[Input Page] Data to be saved to Reports collection:", reportData);
        showStatus(currentMessages.buttonProcessing); // 再次顯示處理中，因為下面有異步操作

        try {
            // 1. 插入數據到 Wix Data
            const insertedItem = await wixData.insert("Reports", reportData);
            const newReportId = insertedItem._id;
            console.log(`[Input Page] Report record saved. Report ID: ${newReportId}`);

            // 2. (可選) 將核心數據存到 local storage 供報告頁面快速加載初始圖表
            const dataForLocalStorage = {
                reportId: newReportId,
                birthDate: reportData.birthDate,
                birthTime: reportData.birthTime.toString(), // custom element 可能期望 string
                gender: reportData.gender,
                service: reportData.service,
                solar: reportData.solar,
                lang: reportData.lang
            };
            local.setItem("currentReportInput", JSON.stringify(dataForLocalStorage));
            console.log("[Input Page] Core input data saved to local storage.");

            // 3. 跳轉到報告頁面
            showStatus(currentMessages.successRedirect);
            wixLocation.to(`/chart?reportId=${newReportId}`);

        } catch (error) {
            console.error("[Input Page] Error saving report to Wix Data or during redirection:", error);
            showStatus(currentMessages.error + (error.message ? ` (${error.message})` : ""), true);
            if (submitButton.enable) submitButton.enable();
            if (submitButton.label) submitButton.label = currentMessages.buttonDefault;
            isSubmitting = false;
        }
    });
});
