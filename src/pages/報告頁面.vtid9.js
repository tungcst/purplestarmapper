import { local } from 'wix-storage';
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { fetch } from 'wix-fetch';

export function onReady() {
    console.log("報告頁面 Velo onReady 啟動");

    // 檢查會員登錄
    if (!wixUsers.currentUser.loggedIn) {
        console.warn("用戶未登錄，導向登錄頁面");
        wixLocation.to('/sign-in');
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

    // 載入報告數據
    wixData.get("Reports", reportId)
        .then(report => {
            if (!report || report.userId !== userId) {
                console.error("報告不存在或無權訪問");
                showError("無權訪問此報告");
                return;
            }

            const birthData = {
                birthDate: report.birthDate,
                birthTime: report.birthTime,
                gender: report.gender,
                service: report.service,
                solar: report.solar,
                lang: report.lang || 'zh',
                userId: report.userId
            };

            console.log("載入的報告數據:", birthData);

            // 渲染命盤（始終完整顯示）
            renderChart(birthData);

            // 生成報告（若尚未生成）
            if (report.status === "pending") {
                generateReport(reportId, birthData)
                    .then(reportText => {
                        // 更新報告狀態和內容
                        wixData.update("Reports", {
                            _id: reportId,
                            status: "completed",
                            reportText: reportText,
                            chartData: {} // 待 ziwei-chart.js 返回命盤數據
                        })
                            .then(() => {
                                console.log("報告已更新");
                                displayReport(reportText, !report.isPaid);
                            })
                            .catch(err => {
                                console.error("更新報告失敗:", err);
                                showError("無法儲存報告");
                            });
                    })
                    .catch(err => {
                        console.error("生成報告失敗:", err);
                        showError("無法生成報告");
                    });
            } else {
                // 顯示已有報告
                displayReport(report.reportText, !report.isPaid);
            }
        })
        .catch(err => {
            console.error("載入報告失敗:", err);
            showError("無法載入報告");
        });
}

function renderChart(birthData) {
    const customElement = document.querySelector('#ziweiChart');
    if (customElement) {
        console.log("找到自訂元素:", customElement.id);
        const message = {
            type: 'RENDER_CHART',
            payload: {
                birthDate: birthData.birthDate,
                birthTime: birthData.birthTime,
                gender: birthData.gender,
                service: birthData.service,
                solar: birthData.solar,
                lang: birthData.lang
            }
        };
        console.log("發送消息給自訂元件:", message);
        customElement.postMessage(message, '*');
    } else {
        console.error("自訂元件未找到");
        showError("無法載入命盤元件");
    }
}

async function generateReport(reportId, birthData) {
    // 模擬報告生成（待替換為自設 LLM API）
    const mockReport = {
        ziwei: "這是您的紫微斗數全面分析報告，根據您的生辰數據，命宮為紫微星，事業發展穩定，財運順遂，適合從事領導性工作。",
        career: "這是您的事業運勢分析報告，事業宮顯示您適合從事創意行業，2025年將有升職機會，需注意人際關係。",
        love: "這是您的愛情運勢分析報告，夫妻宮顯示您將遇到穩定且浪漫的伴侶，建議積極參加社交活動。"
    };
    return mockReport[birthData.service] || "報告生成失敗";

    // 自設 LLM API 模板（請提供 API 詳情後取消註釋）
    /*
    const apiKey = "YOUR_LLM_API_KEY"; // 替換為實際 API 密鑰
    const endpoint = "https://your-llm-api.com/generate"; // 替換為實際端點
    const prompt = `Generate a detailed ${birthData.service} astrology report based on:
    - Birth Date: ${birthData.birthDate}
    - Birth Time: ${birthData.birthTime} (Ziwei time index)
    - Gender: ${birthData.gender}
    - Language: ${birthData.lang}
    - Service: ${birthData.service}`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.text || "報告生成失敗";
    } catch (err) {
        console.error("LLM API 調用失敗:", err);
        throw err;
    }
    */
}

function displayReport(reportText, isPreview) {
    const reportElement = $w("#reportTextElement");
    if (reportElement.type) {
        if (isPreview) {
            // 試閱模式：顯示前 100 字
            reportElement.text = reportText.substring(0, 100) + "...";
            $w("#upgradeButton").show();
        } else {
            // 完整報告
            reportElement.text = reportText;
            $w("#upgradeButton").hide();
        }
    } else {
        console.error("找不到報告文字元素");
        showError("無法顯示報告");
    }
}

function showError(message) {
    const errorElement = $w("#errorMessageTextElement");
    if (errorElement.type) {
        errorElement.text = message;
        errorElement.show();
    }
}
