# 星途羅盤 v2.1.0 使用說明

## 🚨 重要更新：React Hook 衝突問題已解決

**問題描述**：v2.0 版本在 Wix 環境中出現了 "Invalid hook call" 錯誤，這是由於我們的 bundle 包含了完整的 React 和 ReactDOM，與 Wix 系統的 React 產生了衝突。

**解決方案**：v2.1.0 採用外部 React 模式：
- ✅ 將 React 和 ReactDOM 設為外部依賴
- ✅ 使用 Wix 系統提供的 React 實例
- ✅ Bundle 大小從 1.9MB 減少到 903KB
- ✅ 完全解決 Hook 調用錯誤
- ✅ 保持所有功能完整性

**使用變更**：無需改變使用方式，CDN 地址保持不變：
```
https://tungcst.github.io/purplestarmapper/ziwei-chart.bundle.js
```

---

## 🎯 概述

星途羅盤 v2.1.0 是一個專業的紫微圖表 Custom Element，完全解決了 IZTRO 命盤顯示結構錯誤和 React Hook 衝突問題。新版本具有更好的穩定性、響應式設計，並為報告功能預留了完整的接口。

## ✨ 主要改進

### 🔧 技術改進
- **解決顯示結構錯誤**：重新設計了 CSS 樣式系統，確保 IZTRO 命盤正確顯示
- **Shadow DOM 隔離**：使用 Shadow DOM 完全隔離樣式，避免與外部 CSS 衝突
- **更好的錯誤處理**：添加了重試機制和用戶友好的錯誤提示
- **響應式設計**：支持各種屏幕尺寸，從手機到桌面完美適配

### 🎨 設計改進
- **統一的設計風格**：符合您的紫色主題設計系統
- **優雅的載入動畫**：美觀的 Loading 效果
- **Hover 效果**：宮位懸停時的視覺反饋
- **預留報告功能**：為將來的報告生成功能預留了操作按鈕空間

## 📦 安裝與使用

### 在 Wix Studio 中使用

1. **添加 Custom Element**
   ```html
   <script src="https://tungcst.github.io/purplestarmapper/ziwei-chart.bundle.js"></script>
   ```

2. **在頁面中使用**
   ```html
   <ziwei-chart 
       id="ziweiChart"
       theme="purple"
       language="zh-TW"
       chart-size="auto">
   </ziwei-chart>
   ```

3. **通過 Velo 控制**
   ```javascript
   $w.onReady(function () {
       const chart = $w('#ziweiChart');
       
       // 設置生辰數據
       const birthData = {
           birthDate: '1990-01-15',
           birthTime: '3',  // 0-11 對應十二時辰
           gender: 'M',     // M/F
           solar: true      // true=公曆, false=農曆
       };
       
       chart.postMessage({
           target: 'ziwei-chart',
           action: 'updateBirthData',
           payload: birthData
       });
   });
   ```

### 屬性 (Attributes)

| 屬性名 | 類型 | 默認值 | 說明 |
|--------|------|--------|------|
| `birth-data` | JSON String | null | 生辰數據 |
| `theme` | String | 'purple' | 主題色彩 |
| `language` | String | 'zh-TW' | 語言設置 |
| `chart-size` | String | 'auto' | 圖表尺寸控制 |

### 生辰數據格式

```javascript
{
    "birthDate": "1990-01-15",    // 出生日期 (YYYY-MM-DD)
    "birthTime": "3",             // 時辰索引 (0-11)
    "gender": "M",                // 性別 (M/F)
    "solar": true,                // 曆法 (true=公曆, false=農曆)
    "birthLocation": {            // 可選：出生地
        "name": "台北",
        "latitude": 25.0330,
        "longitude": 121.5654
    }
}
```

### 時辰對照表

| 索引 | 時辰 | 時間範圍 |
|------|------|----------|
| 0 | 子時 | 23:00-01:00 |
| 1 | 丑時 | 01:00-03:00 |
| 2 | 寅時 | 03:00-05:00 |
| 3 | 卯時 | 05:00-07:00 |
| 4 | 辰時 | 07:00-09:00 |
| 5 | 巳時 | 09:00-11:00 |
| 6 | 午時 | 11:00-13:00 |
| 7 | 未時 | 13:00-15:00 |
| 8 | 申時 | 15:00-17:00 |
| 9 | 酉時 | 17:00-19:00 |
| 10 | 戌時 | 19:00-21:00 |
| 11 | 亥時 | 21:00-23:00 |

## 🔗 與報告系統集成

### 監聽報告生成請求

```javascript
$w.onReady(function () {
    const chart = $w('#ziweiChart');
    
    // 監聽報告生成請求
    chart.on('reportRequest', (event) => {
        const { birthData, reportType } = event.detail;
        
        // 調用後端生成報告
        generateReport(birthData, reportType)
            .then(result => {
                // 處理報告結果
                console.log('報告生成成功:', result);
            })
            .catch(error => {
                console.error('報告生成失敗:', error);
            });
    });
});
```

### 顯示報告操作按鈕

```javascript
// 顯示報告相關按鈕
const actions = [
    { type: 'ziwei', label: '紫微斗數報告' },
    { type: 'career', label: '事業運勢報告' },
    { type: 'love', label: '愛情關係報告' }
];

chart.showReportActions(actions);
```

## 🗄️ 數據庫集成

### 後端數據庫配置

項目包含完整的數據庫管理模塊 (`backend/database.jsw`)，支持：

- **用戶報告管理**：保存和檢索用戶生成的報告
- **生辰數據管理**：去重存儲用戶的生辰信息
- **會話追蹤**：記錄用戶操作行為
- **統計分析**：提供使用情況統計

### 主要數據集

1. **UserReports** - 用戶報告記錄
2. **BirthData** - 生辰數據
3. **UserSessions** - 用戶會話記錄

### 使用示例

```javascript
import { saveUserReport, getUserReports } from 'backend/database';

// 保存報告
const reportData = {
    userId: 'user123',
    reportType: 'ziwei',
    birthDataId: 'birth456',
    trialContent: JSON.stringify(trialReport),
    fullContent: JSON.stringify(fullReport)
};

const savedReport = await saveUserReport(reportData);

// 獲取用戶報告
const userReports = await getUserReports('user123');
```

## 🤖 LLM API 集成

### 後端 LLM 集成

項目包含 LLM API 集成模塊 (`backend/llm-integration.jsw`)，支持：

- **報告生成**：調用自研 LLM API 生成命理報告
- **多種報告類型**：紫微斗數、事業、愛情、健康、財運
- **試閱機制**：自動分割為試閱版和完整版
- **錯誤重試**：自動重試和錯誤處理

### 配置 LLM API

在 Wix Secrets Manager 中設置：

```
LLM_API_BASE_URL=https://your-llm-api.com/api/v1
LLM_API_KEY=your-api-key-here
```

### 生成報告示例

```javascript
import { generateReport } from 'backend/llm-integration';

const birthData = {
    birthDate: '1990-01-15',
    birthTime: '3',
    gender: 'M',
    solar: true
};

const result = await generateReport(
    'user123',          // 用戶ID
    birthData,          // 生辰數據
    'ziwei',           // 報告類型
    { style: 'modern' } // 可選配置
);

// result 包含:
// - reportId: 報告唯一ID
// - trial: 試閱版內容
// - metadata: 生成元數據
```

## 🎨 樣式自定義

### CSS Variables

Custom Element 使用 CSS Variables，可以通過外部 CSS 自定義：

```css
ziwei-chart {
    --primary-color: #581C87;
    --secondary-color: #6B21A8;
    --background-color: #ffffff;
    --border-color: rgba(230, 230, 250, 0.8);
    --hover-color: rgba(230, 230, 250, 0.7);
}
```

### 響應式設計

組件自動適配不同屏幕尺寸：

- **桌面**：完整顯示，最大寬度
- **平板**：適中尺寸，優化佈局
- **手機**：緊湊模式，確保可讀性

## 🔧 調試與測試

### 測試頁面

使用 `test-v2.html` 進行測試：

```bash
# 在本地服務器中運行
http://localhost:8000/test-v2.html
```

### 調試工具

```javascript
// 全局調試對象
console.log(window.ZiweiChartDebug);

// 創建測試圖表
const testData = window.ZiweiChartDebug.createTestData();
const testChart = window.ZiweiChartDebug.testChart(testData);
```

### 常見問題排查

1. **命盤不顯示**
   - 檢查 bundle.js 是否正確載入
   - 確認生辰數據格式正確
   - 查看瀏覽器控制台錯誤信息

2. **樣式異常**
   - 確保 Shadow DOM 正常工作
   - 檢查外部 CSS 是否干擾

3. **數據傳遞問題**
   - 驗證 JSON 格式正確性
   - 檢查屬性設置方式

## 📚 API 參考

### 公共方法

```javascript
const chart = document.querySelector('ziwei-chart');

// 更新命盤數據
chart.updateChart(birthData);

// 顯示操作按鈕
chart.showReportActions(actions);

// 導出命盤（預留功能）
chart.exportChart();
```

### 事件

```javascript
// 報告生成請求
chart.addEventListener('reportRequest', (event) => {
    const { birthData, reportType } = event.detail;
});

// 圖表準備完成（內部事件）
chart.addEventListener('chartReady', (event) => {
    console.log('Chart is ready');
});

// 渲染錯誤（內部事件）
chart.addEventListener('chartError', (event) => {
    console.error('Chart error:', event.detail);
});
```

## 🚀 部署說明

### GitHub Pages 部署

1. 確保代碼推送到 GitHub
2. Bundle 文件自動發布到 GitHub Pages
3. Wix 中使用 CDN 地址：
   ```
   https://tungcst.github.io/purplestarmapper/ziwei-chart.bundle.js
   ```

### 版本管理

- 每次更新後重新打包：`cd bundler && node build.js`
- 推送到 GitHub 觸發自動部署
- 更新 Wix 中的 bundle 版本

## 📞 技術支持

如需技術支持或報告問題，請：

1. 檢查本文檔的常見問題部分
2. 查看 GitHub Issues
3. 聯繫開發團隊

---

**星途羅盤 v2.1.0** - 專業、穩定、現代的紫微圖表解決方案 