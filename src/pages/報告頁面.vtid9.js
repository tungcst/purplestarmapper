// Velo Code for Report Page (/chart)
// File: src/pages/報告頁面.vtid9.js

import { local } from 'wix-storage'; // 可選，用於快速獲取少量數據
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
// import { fetch } from 'wix-fetch'; // 如果您將來使用後端 HTTP 函數

// --- 輔助函數 ---
function showUserError(messageText) {
    const errorElement = $w("#errorMessageTextElement"); // 您的錯誤報告文本元素 ID
    if (errorElement && errorElement.show) {
        errorElement.text = messageText;
        errorElement.show();
    } else {
        console.warn("Error message element #errorMessageTextElement not found. Message:", messageText);
        if (messageText) alert(messageText); // Fallback
    }
    // 同時隱藏可能的通用狀態消息
    const statusElement = $w("#statusMessage"); // 假設您有一個通用狀態消息元素
    if (statusElement && statusElement.hide) {
        statusElement.hide();
    }
}

function showStatus(messageText) {
    const statusElement = $w("#statusMessage"); // 您的通用狀態消息元素 ID
    if (statusElement && statusElement.show) {
        statusElement.text = messageText;
        statusElement.show();
    } else {
        console.warn("Status message element #statusMessage not found. Message:", messageText);
    }
     // 同時隱藏可能的錯誤消息
    const errorElement = $w("#errorMessageTextElement");
    if (errorElement && errorElement.hide) {
        errorElement.hide();
    }
}

function hideAllMessages() {
    const statusElement = $w("#statusMessage");
    if (statusElement && statusElement.hide) {
        statusElement.hide();
    }
    const errorElement = $w("#errorMessageTextElement");
    if (errorElement && errorElement.hide) {
        errorElement.hide();
    }
}
// --- 輔助函數結束 ---


$w.onReady(function () {
    console.log("[Chart Page] Velo onReady.");

    // --- 確保用戶已登錄 ---
    if (!wixUsers.currentUser.loggedIn) {
        console.warn("[Chart Page] User not logged in. Redirecting to sign-in page.");
        wixLocation.to("/login"); // 請確認您的登錄頁面路徑
        return;
    }

    const currentUserId = wixUsers.currentUser.id;
    const queryParams = wixLocation.query;
    const reportId = queryParams.reportId;

    // --- 獲取頁面元素 ---
    const reportTextElement = $w("#reportTextElement");    // 您的報告文本元素 ID
    const upgradeButton = $w("#upgradeButton");          // 您的升級按鈕 ID
    const customElement = $w("#ziweiChart");             // 您的自定義組件 ID
    // const chartContainer = $w("#chartContainer"); // 容器元素，通常不需要直接操作

    // --- 初始化 ---
    hideAllMessages(); // 隱藏所有狀態和錯誤消息
    if (reportTextElement && reportTextElement.collapse) reportTextElement.collapse(); // 初始隱藏報告文本
    if (upgradeButton && upgradeButton.hide) upgradeButton.hide(); // 初始隱藏升級按鈕

    if (!reportId) {
        console.error("[Chart Page] No reportId found in URL query parameters.");
        showUserError("錯誤：無效的報告鏈接。請返回並重新生成。");
        return;
    }

    console.log(`[Chart Page] Report ID from URL: ${reportId}`);
    showStatus("正在加載您的專屬報告...");
    loadAndDisplayReport(reportId, currentUserId);
});

async function loadAndDisplayReport(reportId, currentUserId) {
    try {
        console.log(`[Chart Page] Fetching report (ID: ${reportId}) for user (ID: ${currentUserId}) from Wix Data.`);
        const reportDocument = await wixData.get("Reports", reportId);

        if (!reportDocument) {
            console.error(`[Chart Page] Report with ID ${reportId} not found in Wix Data.`);
            showUserError("您要查看的報告不存在或已被刪除。");
            return;
        }

        // 驗證報告是否屬於當前用戶
        if (reportDocument.userId !== currentUserId) {
            console.warn(`[Chart Page] Access denied. User ${currentUserId} does not own report ${reportId} (Owner: 
${reportDocument.userId}).`);
            showUserError("您沒有權限查看此報告。");
            return;
        }
        
        hideAllMessages(); // 成功獲取數據後清除加載信息
        console.log("[Chart Page] Report data fetched successfully:", JSON.stringify(reportDocument).substring(0,300) + "...");

        // --- 準備給 Custom Element 的數據 ---
        const chartConfigPayload = {
            birthDate: reportDocument.birthDate,         // 應為 YYYY-MM-DD 字符串
            birthTime: reportDocument.birthTime.toString(), // react-iztro 需要數字，但在 CE 內部會 parseInt
            gender: reportDocument.gender,               // "M" 或 "F"
            service: reportDocument.service,
            solar: reportDocument.solar,                 // true 或 false
            lang: reportDocument.lang || 'zh'            // 語言代碼
        };
        
        // --- 設置 Custom Element 的 data-config attribute ---
        setChartDataConfig(chartConfigPayload);

        // --- 處理報告文本 ---
        if (reportDocument.status === "pending" || !reportDocument.reportText) {
            showStatus("您的報告正在最後生成中，請稍候...");
            console.log(`[Chart Page] Report ${reportId} status is '${reportDocument.status}' or reportText is missing. 
Generating content...`);
            
            const generatedText = await generateReportContentLLM(reportId, chartConfigPayload); // 使用 LLM 生成
            
            const updatedReportData = { // 只更新需要的字段
                _id: reportId,
                status: "completed",
                reportText: generatedText
                // chartData: {} // 可選：如果 Custom Element 返回數據，可以在這裡一併更新
            };
            await wixData.update("Reports", updatedReportData);
            console.log(`[Chart Page] Report ${reportId} content generated and status updated in Wix Data.`);
            displayReportOnPage(generatedText, !reportDocument.isPaid); // 根據 isPaid 狀態顯示
        } else {
            console.log(`[Chart Page] Report ${reportId} already has content. Displaying existing text.`);
            displayReportOnPage(reportDocument.reportText, !reportDocument.isPaid); // 根據 isPaid 狀態顯示
        }

    } catch (error) {
        console.error(`[Chart Page] Error loading or processing report ${reportId}:`, error);
        showUserError(`加載報告時發生錯誤: ${error.message || "未知錯誤，請檢查網絡或聯繫支持。"}`);
    }
}

function setChartDataConfig(payload) {
    const customElement = $w("#ziweiChart");
    if (customElement && typeof customElement.setAttribute === 'function') {
        const config = { type: 'RENDER_CHART', payload: payload };
        const configString = JSON.stringify(config);
        console.log(`[Chart Page] Setting data-config for #ziweiChart (first 150 chars of payload): 
${JSON.stringify(payload).substring(0,150)}...`);
        try {
            customElement.setAttribute('data-config', configString);
            console.log("[Chart Page] data-config attribute set successfully on #ziweiChart.");
        } catch (e) {
            console.error("[Chart Page] Failed to set data-config attribute on #ziweiChart:", e);
            showUserError("無法初始化命盤圖表組件。");
        }

    } else { // 這是新貼上的 else 塊
        console.error("[Chart Page] Custom Element #ziweiChart not found or setAttribute is not a function. Check Wix Editor ID" 
 + "and that it's a Custom Element.");
        showUserErrorOnPage("命盤圖表組件加載失敗，請檢查頁面配置。");
    }
// 這是 setChartDataConfig 函數的結束括號
}


// LLM 報告生成函數 (模擬)
async function generateReportContentLLM(reportId, birthData) {
    console.log(`[Chart Page] Simulating LLM report generation for report ID: ${reportId}, service: ${birthData.service}`);
    
    // 模擬 API 調用延遲
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000)); 

    // 根據服務類型提供不同的模擬文本
    const service = birthData.service;
    let mockText = "";
    if (service === "ziwei") {
        mockText = `這是為您 ${birthData.birthDate} (${birthData.gender === 'M' ? '男' : '女'}命) 
生成的紫微斗數全面分析模擬報告。您的命宮展現出獨特的星曜組合，預示著不凡的人生際遇... [此處省略詳細內容，解鎖查看完整報告]。`;
    } else if (service === "career") {
        mockText = `這是為您 ${birthData.birthDate} (${birthData.gender === 'M' ? '男' : '女'}命) 
生成的事業運勢全面分析模擬報告。從您的事業宮來看，未來職場發展潛力巨大，特別是在...方面具有優勢... 
[此處省略詳細內容，解鎖查看完整報告]。`;
    } else if (service === "love") {
        mockText = `這是為您 ${birthData.birthDate} (${birthData.gender === 'M' ? '男' : '女'}命) 
生成的愛情運勢全面分析模擬報告。您的夫妻宮星情顯示，情感世界豐富多彩，可能在...時期遇到重要緣分... 
[此處省略詳細內容，解鎖查看完整報告]。`;
    } else {
        mockText = `您選擇的服務類型 (${service}) 的模擬報告正在準備中。`;
    }
    return mockText;
}

function displayReportOnPage(text, isTrialView) {
    const reportTextElement = $w("#reportTextElement");
    const upgradeButton = $w("#upgradeButton");
    
    hideAllMessages(); // 清除可能存在的加載/錯誤消息

    if (reportTextElement && typeof reportTextElement.html === 'string' && typeof reportTextElement.expand === 'function') {
        if (reportTextElement.expand) reportTextElement.expand(); // 確保元素可見
        
        const fullText = text || "抱歉，報告內容暫時無法獲取。";
        let displayText = fullText;

        if (isTrialView) {
            // 試閱邏輯：例如顯示前100個字符
            displayText = fullText.substring(0, 150) + "... (此為試閱內容，請升級查看完整版)";
            if (upgradeButton && upgradeButton.show) upgradeButton.show();
        } else {
            if (upgradeButton && upgradeButton.hide) upgradeButton.hide();
        }
        
        reportTextElement.html = `<p>${displayText.replace(/\n/g, '<br>')}</p>`; // 使用 html 以支持換行
        console.log(`[Chart Page] Displaying report. isTrialView: ${isTrialView}. Text (first 100 chars): 
${displayText.substring(0,100)}`);

    } else {
        console.error("[Chart Page] Report text element #reportTextElement not found or essential properties/methods are" + 
"missing.");
        showUserError("無法在頁面上顯示報告文本內容。");
    }
}
