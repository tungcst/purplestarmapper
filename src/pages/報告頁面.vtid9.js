// 在你的 /chart 頁面的 Velo 代碼中
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
// import { fetch } from 'wix-fetch'; // 你暫時還沒用到 fetch

$w.onReady(function () {
    console.log("報告頁面 Velo onReady 啟動");

    if (!wixUsers.currentUser.loggedIn) {
        console.warn("用戶未登錄，導向登錄頁面");
        wixLocation.to('/sign-in'); // 假設你的登錄頁面是 /sign-in
        return;
    }

    const userId = wixUsers.currentUser.id;
    const query = wixLocation.query;
    const reportId = query.reportId;

    if (!reportId) {
        console.error("缺少 reportId");
        showError("請從生辰輸入頁面重新提交");
        return;
    }

    wixData.get("Reports", reportId)
        .then(report => {
            if (!report || report.userId !== userId) {
                console.error("報告不存在或無權訪問");
                showError("無權訪問此報告");
                return;
            }

            const chartBirthDateFromDB = report.chartBirthDate; // Date object
            const chartBirthTimeIndexFromDB = report.chartBirthTimeIndex; // Number (0-11)
            const genderFromDB = report.gender; // "M" or "F"
            const langFromDB = report.lang || 'zh';

            const birthDateAttr = chartBirthDateFromDB.toISOString().split('T')[0]; // "YYYY-MM-DD"
            const birthTimeAttr = String(chartBirthTimeIndexFromDB); // "0"-"11"
            const genderAttr = (genderFromDB === "M") ? "男" : "女"; // "男" or "女"

            renderChartWithAttributes(birthDateAttr, birthTimeAttr, genderAttr, langFromDB);

            // 你的 LLM 邏輯 (mocked)
            if (report.status === "pending") {
                generateReport(reportId, { service: report.service, gender: genderFromDB }) // 傳遞所需信息給 generateReport
                    .then(reportText => {
                        wixData.update("Reports", { _id: reportId, status: "completed", reportText: reportText })
                            .then(() => displayReport(reportText, !report.isPaid))
                            .catch(err => { console.error("更新報告失敗:", err); showError("無法儲存報告"); });
                    })
                    .catch(err => { console.error("生成報告失敗:", err); showError("無法生成報告"); });
            } else {
                displayReport(report.reportText, !report.isPaid);
            }
        })
        .catch(err => {
            console.error("載入報告失敗:", err);
            showError("無法載入報告");
        });
});

function renderChartWithAttributes(birthDate, birthTime, gender, lang) {
    const customElement = $w('#ziweiChart');
    if (customElement && customElement.type === '$w.CustomElement') {
        customElement.setAttribute('birth-date', birthDate);
        customElement.setAttribute('birth-time', birthTime);
        customElement.setAttribute('gender', gender);
        customElement.setAttribute('lang', lang || 'zh-CN'); // 確保有默認語言
        console.log("已設置 Custom Element attributes:", { birthDate, birthTime, gender, lang });
    } else {
        console.error("自訂元件 #ziweiChart 未找到或類型不對。");
        showError("無法載入命盤元件");
    }
}

async function generateReport(reportId, reportContext) { // 接收 reportContext
    // 模擬 LLM 生成報告
    console.log("模擬生成報告 for service:", reportContext.service);
    const mockReport = {
        ziwei: `這是您的紫微斗數全面分析報告 (性別: ${reportContext.gender})。`,
        career: `這是您的事業運勢分析報告 (性別: ${reportContext.gender})。`,
        love: `這是您的愛情運勢分析報告 (性別: ${reportContext.gender})。`
    };
    return new Promise(resolve => setTimeout(() => resolve(mockReport[reportContext.service] || "報告生成失敗"), 500));
}

function displayReport(reportText, isPreview) {
    const reportElement = $w("#reportTextElement"); // 確保你有這個元素
    if (reportElement && reportElement.type) {
        if (isPreview) {
            reportElement.text = reportText.substring(0, 100) + "...";
            if($w("#upgradeButton").type) $w("#upgradeButton").show(); // 確保按鈕存在
        } else {
            reportElement.text = reportText;
            if($w("#upgradeButton").type) $w("#upgradeButton").hide(); // 確保按鈕存在
        }
    } else {
        console.error("找不到報告文字元素 #reportTextElement");
    }
}

function showError(message) {
    const errorElement = $w("#errorMessageTextElement"); // 確保你有這個元素
    if (errorElement && errorElement.type) {
        errorElement.text = message;
        errorElement.show();
    } else {
        console.error("找不到錯誤訊息元素 #errorMessageTextElement:", message);
    }
}
