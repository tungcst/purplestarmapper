/ src/pages/vtid9.js (報告展示頁的 Velo 代碼)
import wixLocation from 'wix-location';
import wixUsers from 'wix-users';
// 假設你的後端服務文件名是 reportService.jsw
import { getReportDataForDisplay } from 'backend/reportService';

// 頁面元素ID (請確保與你在Wix編輯器中設置的ID一致)
const CUSTOM_ELEMENT_ID = "#ziweiChart"; // 你的 Custom Element ID
const REPORT_TITLE_ID = "#reportTextElementt";    // 顯示報告標題的文本元素
const LLM_CONTENT_ID = "#reportTextElement";      // 顯示LLM文字報告的文本元素
const STATUS_MESSAGE_ID = "#statusMessage";   // 顯示加載/錯誤消息的文本元素

// 輔助函數：顯示錯誤信息 (如果需要統一處理)
function showError(message) {
    const statusElement = $w(STATUS_MESSAGE_ID);
    if (statusElement) {
        statusElement.text = message;
        statusElement.show();
    }
    console.error("報告頁面錯誤:", message);
    // 可以考慮隱藏其他內容元素
    if ($w(CUSTOM_ELEMENT_ID).collapse) $w(CUSTOM_ELEMENT_ID).collapse();
    if ($w(REPORT_TITLE_ID).collapse) $w(REPORT_TITLE_ID).collapse();
    if ($w(LLM_CONTENT_ID).collapse) $w(LLM_CONTENT_ID).collapse();
}

// 輔助函數：顯示加載信息
function showLoading(message) {
    const statusElement = $w(STATUS_MESSAGE_ID);
    if (statusElement) {
        statusElement.text = message;
        statusElement.show();
    }
    // 隱藏內容元素
    if ($w(CUSTOM_ELEMENT_ID).collapse) $w(CUSTOM_ELEMENT_ID).collapse();
    if ($w(REPORT_TITLE_ID).collapse) $w(REPORT_TITLE_ID).collapse();
    if ($w(LLM_CONTENT_ID).collapse) $w(LLM_CONTENT_ID).collapse();
}

$w.onReady(async function () {
    console.log("報告頁面 Velo onReady 啟動 (恢復版)");

    const customElement = $w(CUSTOM_ELEMENT_ID);
    const reportTitleElement = $w(REPORT_TITLE_ID);
    const llmContentElement = $w(LLM_CONTENT_ID);
    const statusMessageElement = $w(STATUS_MESSAGE_ID); // 確保這個元素存在並正確ID

    showLoading("正在初始化報告頁面...");

    const queryParams = wixLocation.query;
    const reportId = queryParams.reportId;

    if (!reportId) {
        showError("錯誤：報告鏈接無效，缺少報告ID。");
        return;
    }
    console.log(`報告頁面: 獲取到 reportId: ${reportId}`);

    if (!wixUsers.currentUser.loggedIn) {
        showError("請先登錄以查看您的報告。");
        // 可以考慮引導用戶登錄
        // wixUsers.promptLogin({mode: "login"}).then(user => { if(user) loadReportContent(reportId); });
        return;
    }

    await loadReportContent(reportId);
});

async function loadReportContent(reportId) {
    const customElement = $w(CUSTOM_ELEMENT_ID);
    const reportTitleElement = $w(REPORT_TITLE_ID);
    const llmContentElement = $w(LLM_CONTENT_ID);
    const statusMessageElement = $w(STATUS_MESSAGE_ID);

    showLoading(`正在加載報告 (ID: ${reportId})...`);

    try {
        // 調用後端服務獲取報告數據
        console.log(`報告頁面: 調用後端 getReportDataForDisplay('${reportId}')`);
        const reportData = await getReportDataForDisplay(reportId);
        console.log("報告頁面: 成功從後端獲取報告數據:", reportData); // 打印完整數據看結構

        if (statusMessageElement.hide) statusMessageElement.hide(); // 隱藏加載信息

        // 顯示報告標題
        if (reportData.reportTitle) {
            reportTitleElement.text = reportData.reportTitle;
            if (reportTitleElement.expand) reportTitleElement.expand(); else reportTitleElement.show();
        } else {
            if (reportTitleElement.collapse) reportTitleElement.collapse(); else reportTitleElement.hide();
        }

        // 處理命盤數據並傳遞給 Custom Element
        if (reportData.iztroData && typeof reportData.iztroData === 'object') {
            console.log("報告頁面: 找到 iztroData，準備傳遞給 Custom Element:", 
JSON.stringify(reportData.iztroData).substring(0,100)+"...");
            const iztroDataString = JSON.stringify(reportData.iztroData);
            customElement.setAttribute("horoscope", iztroDataString);
            console.log("報告頁面: 'horoscope' attribute 已設置到 Custom Element。");
            if (customElement.expand) customElement.expand(); else customElement.show();
        } else {
            console.warn("報告頁面: 報告數據中未找到有效的 iztroData，或格式不對。");
            customElement.setAttribute("horoscope", ""); // 清空 attribute
            // 在 Custom Element 內部應該有處理空數據的邏輯 (例如顯示提示)
            if (customElement.expand) customElement.expand(); else customElement.show(); // 即使沒數據也顯示，讓CE自己處理
            // 你也可以在這裡直接顯示一個錯誤消息在命盤區域
            // $w("#someChartErrorPlaceholder").text = "無法加載命盤數據";
            // $w("#someChartErrorPlaceholder").show();
        }

        // 處理LLM內容
        if (reportData.llmReportContent) {
            llmContentElement.html = reportData.llmReportContent; // 假設是HTML
            if (llmContentElement.expand) llmContentElement.expand(); else llmContentElement.show();
        } else {
            if (llmContentElement.collapse) llmContentElement.collapse(); else llmContentElement.hide();
        }

    } catch (error) {
        console.error(`報告頁面: 加載報告ID '${reportId}' 時發生嚴重錯誤:`, error);
        // error.message 可能包含後端傳來的 "報告不存在或無權訪問"
        showError(`加載報告失敗：${error.message || "未知錯誤，請稍後再試。"}`);
    }
}
