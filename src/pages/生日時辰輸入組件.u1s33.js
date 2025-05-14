// Velo Code for Birthday Input Page (/input)
// File: src/pages/生日時辰輸入組件.u1s33.js

import { local } from 'wix-storage';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';
import wixData from 'wix-data';

// --- 輔助函數 ---
function showStatus(messageText, isError = false) {
    const statusElement = $w("#statusMessage");
    if (statusElement && statusElement.show) {
        statusElement.text = messageText;
        // console.log(`[Status Display] ${isError ? 'Error: ' : ''}${messageText}`);
        statusElement.show();
    } else {
        console.error("[Input Page] Status message element #statusMessage NOT FOUND. Message was:", messageText);
        if (messageText) alert(messageText);
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
    console.log("[Input Page] Velo onReady started.");

    // --- 獲取頁面核心元素並檢查 ---
    const serviceDropdown = $w("#serviceSelect");
    const birthDatePicker = $w("#birthDate");
    const birthTimeDropdown = $w("#birthTime");
    const genderDropdown = $w("#gender");
    const submitButton = $w("#submitButton"); // 直接使用您確認的 ID
    const statusMessageElement = $w("#statusMessage"); // 用於顯示消息的文本元素

    // 日誌記錄元素獲取情況
    console.log("[Input Page] Element check: serviceSelect found?", !!serviceDropdown);
    console.log("[Input Page] Element check: birthDate found?", !!birthDatePicker);
    console.log("[Input Page] Element check: birthTime found?", !!birthTimeDropdown);
    console.log("[Input Page] Element check: gender found?", !!genderDropdown);
    console.log("[Input Page] Element check: submitButton found?", !!submitButton);
    console.log("[Input Page] Element check: statusMessage found?", !!statusMessageElement);

    // --- 檢查核心元素是否存在 ---
    if (!serviceDropdown || !birthDatePicker || !birthTimeDropdown || !genderDropdown || !submitButton || !statusMessageElement) 
{
        const missingElements = [
            !serviceDropdown ? "#serviceSelect" : null,
            !birthDatePicker ? "#birthDate" : null,
            !birthTimeDropdown ? "#birthTime" : null,
            !genderDropdown ? "#gender" : null,
            !submitButton ? "#submitButton" : null,
            !statusMessageElement ? "#statusMessage" : null,
        ].filter(Boolean).join(', '); // 過濾掉 null 並用逗號連接

        console.error(`[Input Page] Critical page elements missing: ${missingElements}. Cannot proceed.`);
        if (statusMessageElement && statusMessageElement.show) { // 即使 statusMessageElement 找不到，也嘗試 alert
             showStatus(`頁面初始化錯誤：缺少關鍵組件 (${missingElements})。請聯繫管理員。`, true);
        } else {
            alert(`頁面初始化錯誤：缺少關鍵組件 (${missingElements})。請聯繫管理員。`);
        }
        if (submitButton && submitButton.disable) submitButton.disable(); // 如果能找到按鈕，則禁用它
        return; // 阻止後續代碼執行
    }
    // --- 核心元素檢查完畢 ---


    if (!wixUsers.currentUser.loggedIn) {
        console.warn("[Input Page] User not logged in. Redirecting to sign-in page.");
        wixLocation.to("/login"); // 請確認您的登錄頁面路徑
        return;
    }

    const language = wixWindow.multilingual.currentLanguage || 'zh';
    const messages = {
        zh: {
            required: "請完整填寫所有必填項。",
            buttonDefault: "開始分析",
            buttonProcessing: "處理中...",
            error: "提交失敗，請稍後重試。",
            successRedirect: "正在準備您的報告..."
        },
        en: {
            required: "Please fill all required fields.",
            buttonDefault: "Get Started",
            buttonProcessing: "Processing...",
            error: "Submission failed. Please try again later.",
            successRedirect: "Preparing your report..."
        }
    };
    const currentMessages = messages[language] || messages.zh;

    hideStatus();
    submitButton.label = currentMessages.buttonDefault; // 此時 submitButton 應該是有效的

    // --- 填充下拉選項 ---
    serviceDropdown.options = [
        { "label": "服務選項*", "value": "" , "disabled": true},
        { "label": "紫微斗數全面分析", "value": "ziwei" },
        { "label": "事業運勢全面分析", "value": "career" },
        { "label": "愛情運勢全面分析", "value": "love" }
    ];
    serviceDropdown.selectedIndex = 0;

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

    genderDropdown.options = [
        { "label": "性別*", "value": "", "disabled": true },
        { "label": "男", "value": "M" },
        { "label": "女", "value": "F" }
    ];
    genderDropdown.selectedIndex = 0;
    // --- 下拉選項填充完畢 ---

    let isSubmitting = false;
    // 再次確認 submitButton.onClick 是否是函數
    if (typeof submitButton.onClick !== 'function') {
        console.error("[Input Page] CRITICAL ERROR: submitButton.onClick is not a function! Button ID might be incorrect or" + 
"element is not a button.", submitButton);
        showStatus("頁面提交功能錯誤，請聯繫管理員。", true);
        if (submitButton.disable) submitButton.disable();
        return;
    }

    submitButton.onClick(async () => {
        if (isSubmitting) {
            console.log("[Input Page] Submission already in progress.");
            return;
        }
        isSubmitting = true;
        submitButton.disable();
        submitButton.label = currentMessages.buttonProcessing;
        hideStatus();

        const serviceValue = serviceDropdown.value;
        const birthDateValue = birthDatePicker.value;
        const birthTimeValue = birthTimeDropdown.value;
        const genderValue = genderDropdown.value;

        if (!serviceValue || !birthDateValue || !birthTimeValue || !genderValue) {
            console.warn("[Input Page] Input validation failed. All fields are required.");
            showStatus(currentMessages.required, true);
            submitButton.enable();
            submitButton.label = currentMessages.buttonDefault;
            isSubmitting = false;
            return;
        }

        let adjustedBirthDate = new Date(birthDateValue.getTime());
        const selectedHourIndex = parseInt(birthTimeValue, 10);

        if (birthTimeValue === "0") {
            adjustedBirthDate.setDate(adjustedBirthDate.getDate() + 1);
            console.log(`[Input Page] Zi Shi (23-01) selected. Adjusted date for calculation to: 
${adjustedBirthDate.toISOString().split('T')[0]}`);
        }
        const finalBirthDateString = adjustedBirthDate.toISOString().split('T')[0];

        const reportData = {
            userId: wixUsers.currentUser.id,
            birthDate: finalBirthDateString,
            birthTime: selectedHourIndex,
            gender: genderValue,
            service: serviceValue,
            solar: true,
            lang: language,
            generatedAt: new Date(),
            status: "pending",
            isPaid: false
        };

        console.log("[Input Page] Data to be saved to Reports collection:", reportData);
        showStatus(currentMessages.buttonProcessing);

        try {
            const insertedItem = await wixData.insert("Reports", reportData);
            const newReportId = insertedItem._id;
            console.log(`[Input Page] Report record saved. Report ID: ${newReportId}`);

            const dataForLocalStorage = {
                reportId: newReportId,
                birthDate: reportData.birthDate,
                birthTime: reportData.birthTime.toString(),
                gender: reportData.gender,
                service: reportData.service,
                solar: reportData.solar,
                lang: reportData.lang
            };
            local.setItem("currentReportInput", JSON.stringify(dataForLocalStorage));
            console.log("[Input Page] Core input data saved to local storage.");

            showStatus(currentMessages.successRedirect);
            wixLocation.to(`/chart?reportId=${newReportId}`);

        } catch (error) {
            console.error("[Input Page] Error saving report to Wix Data or during redirection:", error);
            showStatus(currentMessages.error + (error.message ? ` (${error.message})` : ""), true);
            submitButton.enable();
            submitButton.label = currentMessages.buttonDefault;
            isSubmitting = false;
        }
    });
    console.log("[Input Page] Velo onReady finished successfully.");
});
