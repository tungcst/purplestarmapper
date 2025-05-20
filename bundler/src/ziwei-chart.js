// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro';
// 假設 react-iztro-plugins 會掛載到全局 reactIztroPlugins (如果是通過 script 標籤引入)
// 或者如果你的打包工具能處理，你可以嘗試 import { darkHidedHeavenlyStems } from 'react-iztro-plugins';

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
// ... (你原有的 iztro 對象檢查日誌，這些非常好，保留它們) ...
if (typeof iztro === 'object' && iztro !== null) {
    const initialIztroKeys = Object.getOwnPropertyNames(iztro);
    console.log('[ZiweiChart CE SCRIPT] ALL Initial iztro object property names (incl. non-enumerable):', initialIztroKeys);
    initialIztroKeys.forEach(key => {
        let valueType = typeof iztro[key];
        let valuePreview = String(iztro[key]).substring(0, 70);
        if (typeof iztro[key] === 'function') {
            valuePreview = `[Function: ${iztro[key].name || 'anonymous'}]`;
        } else if (typeof iztro[key] === 'object' && iztro[key] !== null) {
            try {
                valuePreview = `[Object with keys: ${Object.keys(iztro[key]).join(', ')}]`;
            } catch (e) { valuePreview = '[Object - cannot get keys]'; }
        }
        console.log(`[ZiweiChart CE SCRIPT]   Key: "${key}", Type: ${valueType}, Value Preview: ${valuePreview}`);
    });
    console.log('[ZiweiChart CE SCRIPT] Direct check - typeof iztro.Iztrolabe (I大寫):', typeof iztro.Iztrolabe);
    console.log('[ZiweiChart CE SCRIPT] Direct check - typeof iztro.Astrolabe (A大寫):', typeof iztro.Astrolabe);
} else {
    console.warn('[ZiweiChart CE SCRIPT] Initial "iztro" object is not an object or is null.');
}


// --- CSS Definitions ---
const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -ms-overflow-style: scrollbar; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;

// 這是 react-iztro 的核心 CSS，包含了命盤網格佈局，你已提供，保持原樣
const reactIztroDefaultCSS = `
.iztro-astrolabe-theme-default {
  --iztro-star-font-size-big: 13px;
  --iztro-star-font-size-small: 12px;
  --iztro-color-major: #531dab;
  --iztro-color-focus: #000;
  --iztro-color-quan: #2f54eb;
  /* ... (省略了你提供的完整 reactIztroDefaultCSS，假設這裡內容是完整的) ... */
  color: var(--iztro-color-happy);
}

/* 👇👇👇 這是 react-iztro 內部定義的命盤主容器樣式，確保它被包含 👇👇👇 */
.iztro-astrolabe {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  display: grid;
  position: relative;
  width: 100%; /* 確保它能填充父容器 */
  height: 100%; /* 確保它能填充父容器 */
  grid-gap: 3px; /* 根據需要調整或通過 options.styleOverrides 修改 */
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr; /* 確保行高均分 */
  grid-template-areas:
    "g3 g4 g5 g6"
    "g2 ct ct g7"
    "g1 ct ct g8"
    "g0 g11 g10 g9";
  text-align: left; /* 從你提供的 CSS 中補上 */
}
/* 其他 react-iztro 的 CSS 規則，例如 .iztro-palace, .iztro-star-major 等，都應包含在 reactIztroDefaultCSS 中 */
/* (我將使用你之前提供的完整 CSS 內容作為 reactIztroDefaultCSS 的內容) */

/* ... (你提供的 .iztro-palace, .iztro-star-mutagen 等 CSS) ... */
.iztro-palace {
  padding: 3px;
  display: grid;
  text-transform: capitalize;
  grid-template-rows: auto auto auto 50px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "major minor adj"
    "horo  horo adj"
    "fate  fate fate"
    "ft   ft  ft";
  transition: all 0.25s ease-in-out;
  grid-auto-flow: column;
  border: 1px solid var(--iztro-color-border); /* 從 theme-default 移過來 */
}
/* ... (繼續包含所有你提供的 react-iztro 相關的 CSS) ... */
.iztro-palace-center-item span {
  color: var(--iztro-color-decorator-1);
}
.gender {
  display: inline-block;
  margin-right: 5px;
}
.gender.gender-male {
  color: var(--iztro-color-quan);
}
.gender.gender-female {
  color: var(--iztro-color-happy);
}
`;


// 你的自定義樣式，用於調整 :host、掛載點，以及微調 react-iztro 外觀（如果需要）
const customChartHostAndWrapperStyles = `
  :host {
    /* 基本樣式，確保 Custom Element 表現如預期 */
    display: block; /* 必須，使其可以被賦予尺寸 */
    width: 100%;   /* 默認寬度，可在 Wix 編輯器調整 */
    height: 600px; /* 初始高度，可在 Wix 編輯器調整，或由內容決定 */
    min-height: 300px; /* 最小高度，防止太小 */
    overflow: hidden; /* 防止命盤溢出 */
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; /* 基礎字體 */
    line-height: 1.4; /* 基礎行高 */
    border: 1px solid #ccc; /* 臨時邊框，方便調試 Custom Element 的邊界 */
  }

  #chart-render-target {
    width: 100%;
    height: 100%;
    display: flex; /* 讓 .iztro-astrolabe 容器可以被居中 (如果其尺寸小於掛載點) */
    justify-content: center;
    align-items: center; /* 或 flex-start */
    box-sizing: border-box;
    background-color: var(--color-html-bg, #f0f2f5); /* 你定義的背景色 */
  }

  /*
   * 不需要再手動指定宮位的 grid-area，reactIztroDefaultCSS 中的
   * .iztro-astrolabe 及其 grid-template-areas 應該會負責整體佈局。
   * react-iztro 的 JS 代碼會將各個宮位組件正確地放置到這些命名區域。
   */
  
  /* 示例：如果你想覆蓋 react-iztro 的某個顏色 */
  /*
  .iztro-astrolabe-theme-default {
    --iztro-color-major: purple !important; 
  }
  */
`;

// --- ZiweiChart Custom Element Class ---
class ZiweiChart extends HTMLElement {
    static get observedAttributes() {
        console.log('[ZiweiChart CLASS] static get observedAttributes CALLED');
        return ['data-config', 'theme-override'];
    }

    constructor() {
        super();
        console.log('[ZiweiChart INSTANCE] constructor CALLED');
        this.attachShadow({ mode: 'open' });
        console.log('[ZiweiChart INSTANCE] constructor: Shadow DOM attached.');

        // 初始化 Shadow DOM 基本結構
        this.shadowRoot.innerHTML = `
            <style id="ziwei-dynamic-styles"></style>
            <div id="chart-render-target" class="chart-wrapper-inside-shadow-dom">
                <div class="message-display-in-shadow loading-message-in-shadow">命盤組件初始化中...</div>
            </div>
        `;
        console.log('[ZiweiChart INSTANCE] constructor: Initial Shadow DOM HTML set.');
        
        this._mountPoint = this.shadowRoot.getElementById('chart-render-target'); // 獲取掛載點
        this._reactRoot = null;
        this._currentConfigString = null;
        this._currentThemeOverride = null;
        this._isRendering = false;
        this._isMounted = false;
        this._currentWidth = 0;
        this._currentHeight = 0;
        this._resizeObserver = null;
        this._data = {}; // 初始化 _data
        this._forceNextRender = false; // 新增標記，用於 theme-override 更新後強制渲染
    }

    _injectStyles() {
        const styleElement = this.shadowRoot.getElementById('ziwei-dynamic-styles');
        if (!styleElement) {
            console.error("[ZiweiChart INSTANCE] _injectStyles: Critical - #ziwei-dynamic-styles element not found!");
            return;
        }

        let combinedCSS = `
            /* 通用消息樣式 */
            .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; font-family: var(--ziwei-font-family, sans-serif); }
            .loading-message-in-shadow { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
            .error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
        `;
        
        // 順序很重要：Reset -> Library Defaults -> Your Overrides -> Theme Overrides
        if(typeof antdResetCSS !== 'undefined') combinedCSS += antdResetCSS;
        combinedCSS += reactIztroDefaultCSS; // react-iztro 核心樣式
        combinedCSS += customChartHostAndWrapperStyles; // :host 和 wrapper 樣式

        if (this._currentThemeOverride) {
            console.log("[ZiweiChart INSTANCE] _injectStyles: Applying theme-override CSS.");
            combinedCSS += this._currentThemeOverride;
        }
        
        styleElement.textContent = combinedCSS;
        console.log("[ZiweiChart INSTANCE] _injectStyles: All styles injected.");
    }
    
    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED.');
        if (!this._isMounted) {
            this._injectStyles(); // 先注入樣式

            if (!this._mountPoint) { // 再次確認掛載點
                 console.error('[ZiweiChart INSTANCE] connectedCallback: CRITICAL - _mountPoint is NULL.');
                 this.renderError("掛載點丟失，組件無法初始化。", true);
                 return;
            }

            if (typeof ReactDOM !== 'undefined' && typeof ReactDOM.createRoot === 'function') {
                this._reactRoot = ReactDOM.createRoot(this._mountPoint);
                console.log('[ZiweiChart INSTANCE] connectedCallback: React root CREATED.');
            } else {
                console.error('[ZiweiChart INSTANCE] connectedCallback: ReactDOM.createRoot is UNDEFINED.');
                this.renderError('React 環境錯誤 (createRoot)。', true);
                this._isMounted = true; // 即使出錯也標記為 mounted，防止重複初始化
                return;
            }
            
            this._isMounted = true;
            this._setupResizeObserver();
            
            // 處理在 connectedCallback 之前可能已設置的 attributes
            const initialConfig = this.getAttribute('data-config');
            const initialThemeOverride = this.getAttribute('theme-override');

            if (initialThemeOverride && initialThemeOverride !== this._currentThemeOverride) {
                this._currentThemeOverride = initialThemeOverride;
                this._injectStyles(); // 如果主題變化，重新注入樣式
                this._forceNextRender = true; // 主題變更後強制渲染
            }

            this.renderChartFromAttributes(this._forceNextRender);
            
        } else {
            console.log('[ZiweiChart INSTANCE] connectedCallback: Already mounted. Forcing a style injection and re-render if config exists.');
            this._injectStyles(); // 確保樣式是最新的
            if (this._currentConfigString) {
                this._parseAndRender(this._currentConfigString, true); // 強制重新渲染
            }
        }
        console.log('[ZiweiChart INSTANCE] connectedCallback FINISHED.');
    }

    // 處理生辰數據轉換 (與之前類似，包含子時換日和插件邏輯)
    birthDataToIzTroParams(birthData) {
        if (!birthData || !birthData.year || !birthData.month || !birthData.day || !birthData.hour || birthData.gender === undefined) {
            console.warn('[ZiweiChart ELEMENT] Missing or invalid birthData for iztro conversion:', birthData);
            return null;
        }

        let { year, month, day, hour, minute = 0, gender, solarDate, lunarDate, timeZone, anH, lang = 'zh' } = birthData;

        let targetYear = parseInt(year, 10);
        let targetMonth = parseInt(month, 10);
        let targetDay = parseInt(day, 10);
        let targetHour = parseInt(hour, 10);
        let targetMinute = parseInt(minute, 10);
        const originalHourForIztro = targetHour; // 保存原始小時給 iztro 判斷子時類型

        if (targetHour === 23) {
            let dateToIncrement;
            if (solarDate && typeof solarDate === 'string' && solarDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
                const [sY, sM, sD] = solarDate.split('-').map(Number);
                dateToIncrement = new Date(sY, sM - 1, sD);
            } else {
                dateToIncrement = new Date(targetYear, targetMonth - 1, targetDay);
            }
            dateToIncrement.setDate(dateToIncrement.getDate() + 1);
            targetYear = dateToIncrement.getFullYear();
            targetMonth = dateToIncrement.getMonth() + 1;
            targetDay = dateToIncrement.getDate();
             // solarDate 應該反映換日後的日期
            solarDate = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`;
        }
        
        let birthdayForIztro;
        let birthdayType = 'solar';

        if (payload.solarDate && typeof payload.solarDate === 'string' && payload.solarDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            // 如果 solarDate 來自 payload 且已經是換日後的，則使用它。
            // 注意：這裡的 originalHourForIztro 很重要，iztro 會用它來區分早子時/晚子時
            birthdayForIztro = `${payload.solarDate} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`;
        } else if (solarDate && typeof solarDate === 'string' && solarDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
             // 如果 solarDate 是基於原始年月日計算並進位的
            birthdayForIztro = `${solarDate} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`;
        }
        else if (lunarDate && typeof lunarDate === 'object' && lunarDate.year && lunarDate.month && lunarDate.day) {
            birthdayForIztro = {
                year: lunarDate.year, // 假設 Velo 提供的 lunarDate 已經是換日後的
                month: lunarDate.month,
                day: lunarDate.day,
                hour: originalHourForIztro,
                minute: targetMinute,
                isLeap: !!lunarDate.isLeapMonth
            };
            birthdayType = 'lunar';
        } else {
            // 都沒有，則基於原始輸入組裝公曆 (此時 targetYear, targetMonth, targetDay 可能是換日後的)
            birthdayForIztro = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`;
        }
        
        const plugins = [];
        if (anH) { 
            // 假設 reactIztroPlugins 是全局可用的 (例如通過 script 標籤引入)
            if (typeof window.reactIztroPlugins !== 'undefined' && typeof window.reactIztroPlugins.darkHidedHeavenlyStems === 'function') {
                 plugins.push(window.reactIztroPlugins.darkHidedHeavenlyStems());
                 console.log("[ZiweiChart ELEMENT] 暗合插件已加載。");
            } else {
                console.warn("[ZiweiChart ELEMENT] 暗合插件 (darkHidedHeavenlyStems) 在 window.reactIztroPlugins 中未找到。請確保 react-iztro-plugins UMD 已正確引入。");
            }
        }

        return {
            birthday: birthdayForIztro,
            gender: gender === 'male' ? '男' : (gender === 'female' ? '女' : undefined),
            birthdayType: birthdayType,
            timeZone: timeZone !== undefined ? parseInt(timeZone, 10) : undefined,
            fixedLeap: payload.fixedLeap, // 從 payload 中獲取 fixedLeap
            plugins: plugins,
            language: lang // 將語言也返回，方便後續使用
        };
    }

    _setupResizeObserver() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
        this._resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0 && (width !== this._currentWidth || height !== this._currentHeight)) {
                    console.log(`[ZiweiChart INSTANCE] ResizeObserver: Size changed to ${width}x${height}`);
                    this._currentWidth = width;
                    this._currentHeight = height;
                    this._render(); // 尺寸變化時重新渲染
                }
            }
        });
        this._resizeObserver.observe(this._mountPoint); // 監聽掛載點 div 的尺寸
        // 同時觸發一次初始尺寸獲取
        const initialRect = this._mountPoint.getBoundingClientRect();
        if (initialRect.width > 0 && initialRect.height > 0) {
            this._currentWidth = initialRect.width;
            this._currentHeight = initialRect.height;
        }
         console.log(`[ZiweiChart INSTANCE] ResizeObserver initialized. Initial mount point size: ${this._currentWidth}x${this._currentHeight}`);
    }
    
    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact CALLED. Payload:', JSON.stringify(payload));
        if (!this._isMounted || !this._reactRoot) {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Not mounted or React root missing.');
            this.renderError('React 渲染核心未就緒。');
            this._isRendering = false; return;
        }

        const iztroParams = this.birthDataToIzTroParams(payload);

        if (!iztroParams) {
            this.renderError('生辰八字數據無效或缺失 (來自 _renderAstrolabeWithReact)。');
            this._isRendering = false;
            return;
        }
        
        // *** 關鍵：確認 react-iztro 導出的組件名 ***
        // 你確認是 iztro.Iztrolabe，所以這裡保持不變
        const AstrolabeComponent = iztro.Iztrolabe; 

        if (typeof AstrolabeComponent === 'undefined') {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: AstrolabeComponent (iztro.Iztrolabe) is UNDEFINED!');
            this.renderError('命盤核心組件未能正確載入。');
            this._isRendering = false;
            return;
        }

        // 使用由 ResizeObserver 更新的尺寸，或 custom element 的 CSS 尺寸
        const chartWidth = this._currentWidth > 10 ? this._currentWidth : (parseInt(this.style.width, 10) || 550); 
        const chartHeight = this._currentHeight > 10 ? this._currentHeight : (parseInt(this.style.height, 10) || 650);
        
        console.log(`[ZiweiChart INSTANCE] Using dimensions for Astrolabe: Width=${chartWidth}, Height=${chartHeight}`);

        // --- Props for react-iztro's Iztrolabe component ---
        // **你需要根據 react-iztro 的文檔來最終確定這個 props 結構**
        // 以下是一個基於常見模式的猜測 + 你的代碼片段
        
        const veloChartOptions = payload.chartOptions || this._data?.chartOptions || {};

        const finalOptions = {
            // 顯示相關
            width: chartWidth,
            height: chartHeight,
            theme: veloChartOptions.theme || 'default', // 你可以通過 CSS variables 自定義 theme
            language: iztroParams.language || veloChartOptions.language || 'zh-CN', // 保持 Velo > 默認
            showPalaceName: veloChartOptions.showPalaceName !== undefined ? veloChartOptions.showPalaceName : true,
            showMutagens: veloChartOptions.showMutagens !== undefined ? veloChartOptions.showMutagens : true,
            showBrightness: veloChartOptions.showBrightness !== undefined ? veloChartOptions.showBrightness : true,
            showFiveElementsClass: veloChartOptions.showFiveElementsClass !== undefined ? veloChartOptions.showFiveElementsClass : true,
            showChineseDate: veloChartOptions.showChineseDate !== undefined ? veloChartOptions.showChineseDate : true,
            showDecadalScope: veloChartOptions.showDecadalScope !== undefined ? veloChartOptions.showDecadalScope : true,
            showYearlyScope: veloChartOptions.showYearlyScope !== undefined ? veloChartOptions.showYearlyScope : true,
            showMonthlyScope: veloChartOptions.showMonthlyScope !== undefined ? veloChartOptions.showMonthlyScope : true,
            showDailyScope: veloChartOptions.showDailyScope !== undefined ? veloChartOptions.showDailyScope : false,
            showHourlyScope: veloChartOptions.showHourlyScope !== undefined ? veloChartOptions.showHourlyScope : false,
            showTransNatal: veloChartOptions.showTransNatal !== undefined ? veloChartOptions.showTransNatal : true,

            // 'astrolabe' 子對象的配置 (來自 react-iztro)
            astrolabe: {
                showCenterContent: veloChartOptions.astrolabe?.showCenterContent !== undefined ? veloChartOptions.astrolabe.showCenterContent : true,
                showThemeButton: veloChartOptions.astrolabe?.showThemeButton !== undefined ? veloChartOptions.astrolabe.showThemeButton : false, // 通常不在嵌入式組件中顯示
                // ... 其他 react-iztro > astrolabe 內部的配置
                ...(veloChartOptions.astrolabe || {}) 
            },
            plugins: [...(iztroParams.plugins || []), ...(veloChartOptions.plugins || [])]
        };
        
        // 最終傳遞給 Iztrolabe 組件的 props
        const finalProps = {
            birthday: iztroParams.birthday,
            birthTime: payload.birthTime, // Iztrolabe 文檔可能需要數字類型的小時
            gender: iztroParams.gender,
            birthdayType: iztroParams.birthdayType,
            timeZone: iztroParams.timeZone, // 可選
            fixedLeap: payload.fixedLeap, // 假設這是頂級 prop, 根據 iztro 文檔調整
            options: finalOptions,
            // 如果 language 或 plugins 是頂級 props, 需要從 finalOptions 移到這裡
            // language: finalOptions.language, 
            // plugins: finalOptions.plugins,
        };

        // 清理 options, 如果某些頂級 props 已經提取出來
        // if (finalProps.language) delete finalOptions.language;
        // if (finalProps.plugins) delete finalOptions.plugins;

        console.log('[ZiweiChart INSTANCE] Final props for React.createElement(Iztrolabe):', JSON.stringify(finalProps, null, 2));
        this.renderPlaceholder("渲染命盤圖...");

        setTimeout(() => {
            if (!this._reactRoot) {
                 console.error('[ZiweiChart INSTANCE] (timeout) React root is null, cannot render astrolabe!');
                 this.renderError('渲染錯誤：React 核心異常 (timeout)。', true);
                 this._isRendering = false;
                 return;
            }
            try {
                this._reactRoot.render(
                    React.createElement(AstrolabeComponent, finalProps)
                );
                console.log('[ZiweiChart INSTANCE] (timeout) React render() for Astrolabe called.');
            } catch (error) {
                console.error('[ZiweiChart INSTANCE] (timeout) >>> EXCEPTION during Astrolabe rendering <<<', error);
                this.renderError(`渲染命盤圖時發生內部錯誤: ${error.message || '未知錯誤'}`);
            } finally {
                this._isRendering = false;
                console.log('[ZiweiChart INSTANCE] (timeout) Astrolabe rendering attempt finished.');
            }
        }, 50);
    }
    
    renderPlaceholder(message) { 
        console.log(`[ZiweiChart INSTANCE] renderPlaceholder: "${message}"`);
        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        if (!renderTarget) return;

        if (!this._reactRoot) {
            renderTarget.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React root unavailable)</div>`;
            return;
        }
        try { 
            this._reactRoot.render(React.createElement('div', { key: `placeholder-${Date.now()}`, className: 'message-display-in-shadow loading-message-in-shadow' }, message)); 
        } catch (e) { 
            renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React placeholder error: ${e.message})</div>`;
        }
    }

    renderError(message, isCritical = false) { 
        console.error(`[ZiweiChart INSTANCE] renderError: "${message}" (Critical: ${isCritical})`);
        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        if (!renderTarget) {
             if(isCritical) this.shadowRoot.innerHTML = `<style>.error-message-in-shadow { /* ... */ }</style><div class="message-display-in-shadow error-message-in-shadow">FATAL: ${message} (No render target)</div>`;
            return;
        }
        
        if (!this._reactRoot && !isCritical) {
            renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React root unavailable)</div>`;
            return;
        }

        if (this._reactRoot && !isCritical) { 
            try { 
                this._reactRoot.render(React.createElement('div', { key: `error-${Date.now()}`, className: 'message-display-in-shadow error-message-in-shadow' }, message)); 
            } catch (e) { 
                 renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React error rendering error: ${e.message})</div>`;
            }
        } else { // Critical error or React root truly gone
            renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} ${isCritical ? '(Critical Error)' : ''}</div>`;
        }
    }

    // --- Setters and Getters for Velo interaction ---
    set birthData(value) {
        let parsedValue = value;
        if (typeof value === 'string') {
            try {
                parsedValue = JSON.parse(value);
            } catch (e) {
                console.error('[ZiweiChart SETTER] Error parsing birthData string:', e, value);
                this.renderError('生辰八字數據格式錯誤。');
                return;
            }
        }
        this._data = { ...this._data, birthData: parsedValue };
        console.log('[ZiweiChart SETTER] birthData set:', this._data.birthData);
        if (this._isMounted) {
            this._parseAndRender(this.getAttribute('data-config') || JSON.stringify({type: "RENDER_CHART", payload: this._data.birthData }));
        }
    }

    get birthData() {
        return this._data?.birthData;
    }

    set chartOptions(value) {
         let parsedValue = value;
         if (typeof value === 'string') {
            try {
                parsedValue = JSON.parse(value);
            } catch (e) {
                console.error('[ZiweiChart SETTER] Error parsing chartOptions string:', e, value);
                // Don't necessarily error out, could be partial options
            }
        }
        this._data = { ...this._data, chartOptions: parsedValue };
        console.log('[ZiweiChart SETTER] chartOptions set:', this._data.chartOptions);
        if (this._isMounted) {
            this._forceNextRender = true; // Options changed, force re-evaluation even if config string is same
             this._parseAndRender(this.getAttribute('data-config') || JSON.stringify({type: "RENDER_CHART", payload: this._data.birthData }), true);
        }
    }

    get chartOptions() {
        return this._data?.chartOptions;
    }
}

// --- Define Custom Element ---
if (customElements && typeof customElements.get === 'function' && !customElements.get('ziwei-chart')) {
    try {
        customElements.define('ziwei-chart', ZiweiChart);
        console.log('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" DEFINED SUCCESSFULLY.');
    } catch (e) {
        console.error('[ZiweiChart CE SCRIPT] CRITICAL ERROR defining custom element "ziwei-chart":', e);
    }
} else {
     console.warn('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" was already defined or customElements API unavailable.');
}
console.log('[ZiweiChart CE SCRIPT] Top-level script execution FINISHED.');