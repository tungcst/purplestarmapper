// 在報告頁面 onReady
$w.onReady(function () {
    // ... (你其他的 onReady 代碼，如用戶檢查、讀取 reportId)

    const customElement = $w('#ziweiChart'); // 確保 ID 仍然是 ziweiChart
    console.log("Attempting to find #ziweiChart for SimpleTest:", customElement);
    if (customElement && customElement.type) {
        console.log("#ziweiChart (for SimpleTest) found. Type:", customElement.type);
        if (customElement.type === '$w.CustomElement') {
            try {
                customElement.setAttribute('message', 'Simple Test From Velo');
                console.log("Set 'message' attribute on #ziweiChart (SimpleTest)");
            } catch (e) {
                console.error("Error setting attribute on SimpleTest element:", e);
            }
        } else {
            console.error("#ziweiChart is not a CustomElement. Actual type:", customElement.type);
            showError("命盤元件類型錯誤 (SimpleTest)。"); // showError 是你已有的函數
        }
    } else {
        console.error("自訂元件 #ziweiChart (for SimpleTest) 未找到。");
        showError("無法載入命盤元件 (SimpleTest)。");
    }

    // ... (你其他的 onReady 邏輯，如模擬生成報告)
});
