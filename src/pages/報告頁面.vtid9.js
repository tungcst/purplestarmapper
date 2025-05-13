// src/pages/報告頁面.vtid9.js
import { local } from 'wix-storage'; // 雖然優先用URL的reportId，local storage可作為備用或傳遞少量立即需要的數據
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
// import { fetch } from 'wix-fetch'; // 如果 generateReportContent 中使用 fetch

$w.onReady(function () {
    console.log("[Chart Page] Velo onReady.");

    if (!wixUsers.currentUser.loggedIn) {
        console.warn("[Chart Page] User not logged in. Redirecting to sign-in.");
        wixLocation.to('/sign-in');
        return;
    }

    const userId = wixUsers.currentUser.id;
    const queryParams = wixLocation.query;
    const reportId = queryParams.reportId;

    const statusMessage = $w("#statusMessage"); // 假設你有一個文本元素用於顯示狀態/錯誤
    const reportTextElement = $w("#reportTextElement");
    const upgradeButton = $w("#upgradeButton");
    const customElement = $w("#ziweiChart");

    if (statusMessage && statusMessage.hide) statusMessage.hide();
    if (reportTextElement && reportTextElement.collapse) reportTextElement.collapse();
    if (upgradeButton && upgradeButton.hide) upgradeButton.hide();


    if (!reportId) {
        console.error("[Chart Page] Report ID not found in URL query.");
        showUserError("錯誤：無效的報告鏈接。請返回重新生成。");
        return;
    }
    console.log(`[Chart Page] Report ID from URL: ${reportId}`);

    if (statusMessage) { statusMessage.text = "正在加載報告數據..."; statusMessage.show(); }
    loadAndDisplayReport(reportId, userId);
});

async function loadAndDisplayReport(reportId, currentUserId) {
    const statusMessage = $w("#statusMessage");
    try {
        console.log(`[Chart Page] Fetching report (ID: ${reportId}) from Wix Data for user ${currentUserId}.`);
        const reportDocument = await wixData.get("Reports", reportId);

        if (!reportDocument) {
            console.error(`[Chart Page] Report with ID ${reportId} not found in Wix Data.`);
            showUserError("您要查看的報告不存在。");
            return;
        }

        if (reportDocument.userId !== currentUserId) {
            console.warn(`[Chart Page] User ${currentUserId} does not have permission to view report ${reportId} (Owner: 
${reportDocument.userId}).`);
            showUserError("您沒有權限查看此報告。");
            return;
        }
        
        if (statusMessage && statusMessage.hide) statusMessage.hide();
        console.log("[Chart Page] Report data fetched successfully:", reportDocument);

        // 準備給 Custom Element 的數據
        const chartConfigPayload = {
            birthDate: reportDocument.birthDate,
            birthTime: reportDocument.birthTime.toString(), // Custom Element 可能期望字符串
            gender: reportDocument.gender,
            service: reportDocument.service,
            solar: reportDocument.solar,
            lang: reportDocument.lang || 'zh'
        };
        
        // 設置 Custom Element 的 data-config attribute
        setChartDataConfig(chartConfigPayload);

        // 處理報告文本
        if (reportDocument.status === "pending" || !reportDocument.reportText) {
            if (statusMessage) { statusMessage.text = "正在生成詳細報告內容，請稍候..."; statusMessage.show(); }
            console.log(`[Chart Page] Report ${reportId} status is '${reportDocument.status}' or text is missing. Generating 
content...`);
            
            const generatedText = await generateReportContentLLM(reportId, chartConfigPayload); // 使用 LLM 生成
            
            const updatedReportData = {
                _id: reportId,
                status: "completed",
                reportText: generatedText
                // chartData: {} // 可選：如果 Custom Element 返回數據，可以在這裡一併更新
            };
            await wixData.update("Reports", updatedReportData);
            console.log(`[Chart Page] Report ${reportId} content generated and updated in Wix Data.`);
            displayReportOnPage(generatedText, !reportDocument.isPaid);
        } else {
            console.log(`[Chart Page] Report ${reportId} already has content. Displaying existing text.`);
            displayReportOnPage(reportDocument.reportText, !reportDocument.isPaid);
        }

    } catch (error) {
        console.error(`[Chart Page] Error loading or processing report ${reportId}:`, error);
        showUserError(`加載報告時發生錯誤: ${error.message || "未知錯誤，請聯繫支持。"}`);
    }
}

function setChartDataConfig(payload) {
    const customElement = $w("#ziweiChart");
    if (customElement && customElement.type === "$w.CustomElement") {
        const config = { type: 'RENDER_CHART', payload: payload };
        const configString = JSON.stringify(config);
        console.log(`[Chart Page] Setting data-config for #ziweiChart (first 150 chars): ${configString.substring(0,150)}...`);
        try {
            customElement.setAttribute('data-config', configString);
            console.log("[Chart Page] data-config attribute set successfully.");
        } catch (e) {
            console.error("[Chart Page] Failed to set data-config attribute:", e);
            showUserError("無法初始化命盤組件。");
        }
    } else {
        console.error("[Chart Page] Custom Element #ziweiChart not found or not a CustomElement. Check Wix Editor.");
        showUserError("命盤組件加載失敗，請檢查頁面配置。");
    }
}

// LLM 報告生成函數 (需替換為您的實際 LLM API 調用)
async function generateReportContentLLM(reportId, birthData) {
    console.log(`[Chart Page] Generating LLM report for ${reportId}, service: ${birthData.service}`);
    // 這裡應包含調用您的自設 LLM API 的邏輯
    // const apiKey = "YOUR_LLM_API_KEY"; // 您的 LLM API 密鑰
    // const endpoint = "YOUR_LLM_API_ENDPOINT"; // 您的 LLM API 端點
    // const prompt = `為以下生辰數據生成一份 ${birthData.service} 命理報告: 日期 ${birthData.birthDate}, 時辰索引 
${birthData.birthTime}, 性別 ${birthData.gender}, 語言 ${birthData.lang}。`;
    // try {
    //   const response = await fetch(endpoint, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    //     body: JSON.stringify({ prompt: prompt })
    //   });
    //   if (!response.ok) throw new Error(`LLM API Error: ${response.status}`);
    //   const result = await response.json();
    //   return result.reportText || "LLM 未能生成報告。";
    // } catch (error) {
    //   console.error("[Chart Page] LLM API call failed:", error);
    //   return `由於技術問題，暫時無法生成您的 ${birthData.service} 報告。請稍後再試。`;
    // }

    // 目前使用模擬數據
    await new Promise(resolve => setTimeout(resolve, 2000)); // 模擬網絡延遲
    const mockTexts = {
        ziwei: `紫微斗數模擬報告 for ${birthData.birthDate}: 命宮主星強勁，預示著不凡的人生旅程... 此處省略1000字... 
請解鎖查看完整分析。`,
        career: `事業運模擬報告 for ${birthData.birthDate}: 您的事業宮展現出卓越的領導潛能與創造力... 此處省略1000字... 
深入了解您的職場優勢。`,
        love: `愛情運模擬報告 for ${birthData.birthDate}: 感情世界豐富多彩，夫妻宮預示著一段深刻的緣分... 此處省略1000字... 
探索您的情感模式與未來伴侶。`
    };
    return mockTexts[birthData.service] || "此服務類型的報告正在開發中。";
}

function displayReportOnPage(text, isTrial) {
    const reportTextElement = $w("#reportTextElement");
    const upgradeButton = $w("#upgradeButton");
    const statusMessage = $w("#statusMessage");

    if (statusMessage && statusMessage.hide) statusMessage.hide(); // 隱藏加載信息

    if (reportTextElement && reportTextElement.type === "$w.Text") {
        if (reportTextElement.expand) reportTextElement.expand(); else reportTextElement.show();
        
        const displayText = isTrial ? (text ? text.substring(0, 100) + "... (試閱內容，升級查看完整版)" : 
"報告內容為空或生成失敗。") : (text || "報告內容為空或生成失敗。");
        reportTextElement.html = `<p>${displayText.replace(/\n/g, '<br>')}</p>`; // 使用 html 以支持換行
        console.log(`[Chart Page] Displaying report text. isTrial: ${isTrial}. Text (first 100): 
${displayText.substring(0,100)}`);

        if (upgradeButton && upgradeButton.type === "$w.Button") {
            isTrial ? upgradeButton.show() : upgradeButton.hide();
        }
    } else {
        console.error("[Chart Page] Report text element #reportTextElement not found or not a Text element.");
        showUserError("無法顯示報告文本內容。");
    }
}

function showUserError(message) {
    const errorElement = $w("#errorMessageTextElement");
    const statusMessage = $w("#statusMessage");
    if (statusMessage && statusMessage.hide) statusMessage.hide();

    if (errorElement && errorElement.type === "$w.Text") {
        if (errorElement.expand) errorElement.expand(); else errorElement.show();
        errorElement.text = message;
        console.error(`[Chart Page] User error displayed: ${message}`);
    } else {
        console.error(`[Chart Page] Error message element #errorMessageTextElement not found. Intended message: ${message}`);
    }
}
