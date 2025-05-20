// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro'; // 保持你的導入方式

// ... (你的所有 console.log 保持不變，它們有助於調試) ...
console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
// ...

// --- CSS Definitions ---
const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -ms-overflow-style: scrollbar; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;

// 這是 react-iztro 的核心 CSS，確保它包含了所有 .iztro-xxx 規則
const reactIztroDefaultCSS = `
.iztro-astrolabe-theme-default { /* 確保這個 class 與 iztro 庫匹配或你的 options.theme 設置 */
  --iztro-star-font-size-big: 13px;
  --iztro-star-font-size-small: 12px;
  --iztro-color-major: #531dab;
  --iztro-color-focus: #000;
  --iztro-color-quan: #2f54eb;
  --iztro-color-tough: #612500;
  --iztro-color-awesome: #d4380d;
  --iztro-color-active: #1890ff;
  --iztro-color-happy: #c41d7f;
  --iztro-color-nice: #237804;
  --iztro-color-decorator-1: #90983c;
  --iztro-color-decorator-2: #813359;
  --iztro-color-text: #8c8c8c;
  --iztro-color-border: #00152912; /* rgba(0, 21, 41, 0.07) */
  --iztro-color-decadal: var(--iztro-color-active);
  --iztro-color-yearly: var(--iztro-color-decorator-2);
  --iztro-color-monthly: var(--iztro-color-nice);
  --iztro-color-daily: var(--iztro-color-decorator-1);
  --iztro-color-hourly: var(--iztro-color-text);
}
.iztro-astrolabe {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  display: grid;
  position: relative;
  width: 100%; /* 關鍵 */
  height: 100%; /* 關鍵 */
  grid-gap: 3px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-template-areas:
    "g3 g4 g5 g6"
    "g2 ct ct g7"
    "g1 ct ct g8"
    "g0 g11 g10 g9";
  text-align: left;
}
.iztro-palace {
  padding: 3px;
  display: grid;
  text-transform: capitalize;
  grid-template-rows: auto auto 1fr auto; /* 讓星曜部分可以擴展 */
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "major minor adj"
    "horo  horo adj" /* 星曜的主要區域 */
    "fate  fate fate"
    "ft   ft  ft";
  transition: all 0.25s ease-in-out;
  grid-auto-flow: column;
  border: 1px solid var(--iztro-color-border);
  box-sizing: border-box;
  overflow: hidden; /* 宮位內部內容過多時隱藏 */
}
.iztro-palace.focused-palace { background-color: #aab8d32f; }
.iztro-palace.opposite-palace { background-color: #93f73d4f; }
.iztro-palace.surrounded-palace { background-color: #aff46f24; }
.iztro-palace-major { grid-area: major; }
.iztro-palace-minor { grid-area: minor; justify-self: center; }
.iztro-palace-adj { grid-area: adj; display: inline-flex; justify-self: flex-end; gap: 3px; white-space: nowrap; text-align: right; }
.iztro-palace-horo-star { grid-area: horo; align-self: stretch; /* 讓它填滿分配的空間 */ overflow-y: auto; /* 如果內容過多則滾動 */ }
.iztro-palace-horo-star .stars { display: flex; flex-wrap: wrap; /* 允許星曜換行 */ gap: 3px; }
.iztro-palace-scope { white-space: nowrap; text-align: center; grid-area: ft; /* 嘗試將其移到 ft 的一部分 */ }
.iztro-palace-scope-decadal { font-weight: 700; }
.iztro-palace-fate { grid-area: fate; align-self: flex-end; white-space: nowrap; justify-content: center; display: flex; gap: 3px; height: 17px; }
.iztro-palace-fate .iztro-palace-decadal-active { background-color: var(--iztro-color-decadal); }
.iztro-palace-fate .iztro-palace-yearly-active { background-color: var(--iztro-color-yearly); }
.iztro-palace-fate .iztro-palace-monthly-active { background-color: var(--iztro-color-monthly); }
.iztro-palace-fate .iztro-palace-daily-active { background-color: var(--iztro-color-daily); }
.iztro-palace-fate .iztro-palace-hourly-active { background-color: var(--iztro-color-hourly); }
.iztro-palace-footer { grid-area: ft; display: grid; grid-template-columns: auto 1fr auto; /* 調整 footer 使其更好地分配空間 */ align-self: flex-end; /* 確保在底部 */ padding-top: 3px; }
.iztro-palace-lft24 { text-align: left; }
.iztro-palace-rgt24 { text-align: right; }
.iztro-palace-name { cursor: pointer; text-wrap: nowrap; }
.iztro-palace-name .iztro-palace-name-wrapper { position: relative; }
.iztro-palace-name .iztro-palace-name-taichi { position: absolute; font-size: 12px; line-height: 14px; background-color: var(--iztro-color-major); padding: 0 2px; color: #fff; z-index: 2; border-radius: 0 4px 4px 0; font-weight: normal !important; bottom: 0; }
.iztro-palace-gz { text-align: right; cursor: pointer; }
.iztro-palace-gz span { display: inline-block; padding: 0 1px; text-wrap: nowrap; }
.iztro-palace-dynamic-name { text-align: center; display: flex; white-space: nowrap; gap: 3px; justify-content: center; }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-decadal { color: var(--iztro-color-decadal); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-yearly { color: var(--iztro-color-yearly); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-monthly { color: var(--iztro-color-monthly); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-daily { color: var(--iztro-color-daily); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-hourly { color: var(--iztro-color-hourly); }
.iztro-center-palace { grid-area: ct; position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 5px; box-sizing: border-box; }
.iztro-center-palace-centralize { text-align: center; }
.iztro-center-palace ul.basic-info { margin: 5px 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); column-gap: 10px; font-size: var(--iztro-star-font-size-small); }
.iztro-center-palace ul.basic-info li { list-style: none; }
.iztro-center-palace .center-title { padding: 5px 0; margin: 0; font-size: var(--iztro-star-font-size-big); font-weight: bold; text-align: center; border-bottom: 1px dashed var(--iztro-color-border); }
.horo-buttons { margin: 5px 0; font-size: var(--iztro-star-font-size-small); display: flex; justify-content: space-around; flex-wrap: wrap; gap: 5px; }
.horo-buttons .center-button { display: block; text-align: center; padding: 3px 5px; border: 1px solid var(--iztro-color-border); cursor: pointer; transition: all 0.25s ease-in-out; color: var(--iztro-color-text); user-select: none; }
.horo-buttons .center-button:not(.disabled):hover { color: var(--iztro-color-major); background-color: var(--iztro-color-border); }
.horo-buttons .center-button.disabled { opacity: 0.5; cursor: not-allowed; }
.horo-buttons .center-horo-hour { display: flex; align-items: center; }
.iztro-copyright { position: absolute; bottom: 3px; right: 3px; font-size: 10px; /* 減小一點 */ color: rgba(0, 0, 0, 0.2); text-decoration: none; text-shadow: 1px 1px rgba(255, 255, 255, 0.3); }
#palace-line { stroke: var(--iztro-color-awesome); opacity: 0.6; transition: all 0.25s ease-in-out; }
#palace-line.decadal { stroke: var(--iztro-color-decadal); }
.solar-horoscope { display: flex; align-items: center; gap: 10px; margin-top: 5px; }
.solar-horoscope-centralize { justify-content: center; }
.solar-horoscope .today { display: inline-block; font-size: var(--iztro-star-font-size-small); cursor: pointer; border: 1px solid var(--iztro-color-border); padding: 0 5px; transition: all 0.25s ease-in-out; }
.solar-horoscope .today:hover { color: var(--iztro-color-major); background-color: var(--iztro-color-border); }
.iztro-star-soft, .iztro-star-tough, .iztro-star-adjective, .iztro-star-flower, .iztro-star-helper, .iztro-palace-fate, .iztro-palace-horo-star .stars, .iztro-palace-scope, .iztro-palace-dynamic-name, .iztro-palace-lft24, .iztro-palace-rgt24 { font-size: var(--iztro-star-font-size-small); font-weight: normal; white-space: nowrap; }
.iztro-palace-scope-age { white-space: balance; /* 修正 */ }
.iztro-star-major, .iztro-star-tianma, .iztro-star-lucun, .iztro-palace-name, .iztro-palace-gz { font-size: var(--iztro-star-font-size-big); font-weight: bold; }
.iztro-star-brightness, .iztro-star-adjective { font-style: normal; font-weight: normal; color: var(--iztro-color-text); }
.iztro-star-major, .iztro-star-soft, .iztro-palace-name { color: var(--iztro-color-major); }
.iztro-star-tough { color: var(--iztro-color-tough); }
.iztro-star-flower { color: var(--iztro-color-happy); }
.iztro-star-helper, .iztro-palace-gz { color: var(--iztro-color-nice); }
.iztro-star-mutagen { font-weight: normal; font-size: var(--iztro-star-font-size-small); border-radius: 4px; color: #fff; display: inline-block; margin-left: 1px; padding: 0 2px; vertical-align: middle; } /* 添加 vertical-align */
.star-with-mutagen { position: relative; }
.star-with-mutagen::before { bottom: 0; content: " "; left: -4px; position: absolute; top: 0; width: 4px; transition: all 0.25s ease-in-out; }
.star-with-mutagen::after { content: " "; position: absolute; left: 0; bottom: -4px; right: 0; height: 4px; transition: all 0.25s ease-in-out; }
.iztro-palace-name-body { font-size: var(--iztro-star-font-size-small); font-weight: normal; position: absolute; margin-top: 2px; }
.iztro-palace-fate span { display: inline-block; /* 改為 inline-block */ padding: 1px 3px; /* 調整 padding */ border-radius: 4px; color: #fff; background-color: var(--iztro-color-major); cursor: pointer; margin-left: 2px; /* 添加間距 */ }
.iztro-palace-center-item label { margin-right: 5px; display: inline-block; min-width: auto; /* 移除固定寬度 */ }
`;

const customChartHostAndWrapperStyles = `
  :host {
    display: block; 
    width: 100%;   
    height: auto; /* 改為 auto，由內容或外部決定 */
    min-height: 500px; /* 設定一個合理的最小高度 */
    overflow: visible; /* 改為 visible，以防 SVG 內容被裁剪 */
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4;
    /* border: 1px dashed green; /* 臨時調試邊框 */ */
  }
  #chart-render-target {
    width: 100%;
    height: 100%; /* 讓它繼承 :host 的高度 */
    display: flex; 
    justify-content: center;
    align-items: center; 
    box-sizing: border-box;
    background-color: #f9f9f9; /* 淺灰色背景，用於測試 */
    padding: 10px; /* 給圖表一些邊距 */
  }
  /* 下面這條規則確保由 react-iztro 生成的 .iztro-astrolabe 元素 */
  /* 能夠正確地使用其父容器（#chart-render-target）的寬高 */
  #chart-render-target > .iztro-astrolabe {
      width: 100%;
      height: 100%;
      max-width: 800px; /* 限制最大寬度，避免在大屏幕上過寬 */
      max-height: 700px; /* 限制最大高度 */
      box-sizing: border-box;
  }
`;

class ZiweiChart extends HTMLElement {
    static get observedAttributes() {
        return ['data-config', 'theme-override'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style id="ziwei-dynamic-styles"></style>
            <div id="chart-render-target" class="chart-wrapper-inside-shadow-dom">
                <div class="message-display-in-shadow loading-message-in-shadow">命盤組件初始化中...</div>
            </div>
        `;
        this._mountPoint = this.shadowRoot.getElementById('chart-render-target');
        this._reactRoot = null;
        this._currentConfigString = null;
        this._currentThemeOverride = null;
        this._isRendering = false;
        this._isMounted = false;
        this._currentWidth = 0;
        this._currentHeight = 0;
        this._resizeObserver = null;
        this._data = {};
        this._forceNextRender = false;

        // 綁定方法
        this._injectStyles = this._injectStyles.bind(this);
        this.connectedCallback = this.connectedCallback.bind(this);
        this.disconnectedCallback = this.disconnectedCallback.bind(this);
        this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
        this._parseAndRender = this._parseAndRender.bind(this);
        this._renderAstrolabeWithReact = this._renderAstrolabeWithReact.bind(this);
        this.renderPlaceholder = this.renderPlaceholder.bind(this);
        this.renderError = this.renderError.bind(this);
        this._setupResizeObserver = this._setupResizeObserver.bind(this);
        this.renderChartFromAttributes = this.renderChartFromAttributes.bind(this);
         this.birthDataToIzTroParams = this.birthDataToIzTroParams.bind(this);
    }

    _injectStyles() {
        const styleElement = this.shadowRoot.getElementById('ziwei-dynamic-styles');
        if (!styleElement) return;
        let combinedCSS = `
            .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
            .loading-message-in-shadow { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
            .error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
        `;
        if (typeof antdResetCSS !== 'undefined') combinedCSS += antdResetCSS;
        combinedCSS += reactIztroDefaultCSS;
        combinedCSS += customChartHostAndWrapperStyles;
        if (this._currentThemeOverride) combinedCSS += this._currentThemeOverride;
        styleElement.textContent = combinedCSS;
    }
    
    connectedCallback() {
        console.log('[ZiweiChart] connectedCallback');
        if (!this._isMounted) {
            this._injectStyles();
            if (!this._mountPoint) { this.renderError("Mount point error.", true); return; }
            if (typeof ReactDOM !== 'undefined' && ReactDOM.createRoot) {
                this._reactRoot = ReactDOM.createRoot(this._mountPoint);
            } else { this.renderError('React env error.', true); this._isMounted = true; return; }
            
            this._isMounted = true;
            this._setupResizeObserver();
            
            const initialTheme = this.getAttribute('theme-override');
            if (initialTheme) {
                this._currentThemeOverride = initialTheme;
                this._injectStyles();
                this._forceNextRender = true;
            }
            this.renderChartFromAttributes(this._forceNextRender);
        } else {
            this._injectStyles();
            if (this._currentConfigString) this._parseAndRender(this._currentConfigString, true);
        }
    }

    // ✅ 確保 renderChartFromAttributes 方法存在
    renderChartFromAttributes(forceRender = false) {
        console.log(`[ZiweiChart] renderChartFromAttributes. Force: ${forceRender}`);
        if(!this._isMounted || !this._reactRoot) return;
        const configAttr = this.getAttribute('data-config');
        if (configAttr && (forceRender || configAttr !== this._currentConfigString)) {
            this._parseAndRender(configAttr, forceRender);
        } else if (!configAttr) {
            this.renderPlaceholder("等待配置...");
            this._currentConfigString = null;
        }
    }
    
    _setupResizeObserver() {
        if (this._resizeObserver) this._resizeObserver.disconnect();
        this._resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                // 只有在尺寸實際發生有意義的變化時才重新渲染
                if (width > 10 && height > 10 && (Math.abs(width - this._currentWidth) > 1 || Math.abs(height - this._currentHeight) > 1)) {
                    console.log(`[ZiweiChart] ResizeObserver: Size changed to ${width}x${height}`);
                    this._currentWidth = width;
                    this._currentHeight = height;
                    // 這裡不再直接調用 this._render()，而是通過 _parseAndRender
                    // 以確保始終基於最新的 data-config 渲染
                    if (this._currentConfigString) {
                        this._parseAndRender(this._currentConfigString, true); // 強制用新尺寸重新解析和渲染
                    }
                }
            }
        });
        if (this._mountPoint) {
            this._resizeObserver.observe(this._mountPoint);
            // 立刻獲取一次初始尺寸
            requestAnimationFrame(() => {
                if (this._mountPoint) { // 再次檢查 mountPoint 是否存在
                    const initialRect = this._mountPoint.getBoundingClientRect();
                    if (initialRect.width > 0 && initialRect.height > 0) {
                        this._currentWidth = initialRect.width;
                        this._currentHeight = initialRect.height;
                        console.log(`[ZiweiChart] Initial dimensions set: ${this._currentWidth}x${this._currentHeight}`);
                        // 如果此時已有配置，則觸發一次渲染
                         if (this.getAttribute('data-config')) {
                            this.renderChartFromAttributes(true);
                        }
                    }
                }
            });
        }
    }

    birthDataToIzTroParams(payload) {
        // ... (使用你最新的、包含暗合插件和語言處理的 birthDataToIzTroParams 邏輯)
        if (!payload || !payload.year || !payload.month || !payload.day || !payload.hour || payload.gender === undefined) {
            return null;
        }
        let { year, month, day, hour, minute = 0, gender, solarDate, lunarDate, timeZone, anH = false, lang = 'zh-CN', fixedLeap = false } = payload;

        let targetYear = parseInt(year, 10);
        let targetMonth = parseInt(month, 10);
        let targetDay = parseInt(day, 10);
        let targetHour = parseInt(hour, 10);
        let targetMinute = parseInt(minute, 10);
        const originalHourForIztro = targetHour;

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
            solarDate = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`;
        }
        
        let birthdayForIztro;
        let birthdayType = 'solar';

        if (solarDate && typeof solarDate === 'string' && solarDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            birthdayForIztro = `${solarDate} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`;
        } else if (lunarDate && typeof lunarDate === 'object') { 
            birthdayForIztro = { year: lunarDate.year, month: lunarDate.month, day: lunarDate.day, hour: originalHourForIztro, minute: targetMinute, isLeap: !!lunarDate.isLeapMonth };
            birthdayType = 'lunar';
        } else {
            birthdayForIztro = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`;
        }
        
        const plugins = [];
        if (anH) { 
            if (typeof window.reactIztroPlugins !== 'undefined' && typeof window.reactIztroPlugins.darkHidedHeavenlyStems === 'function') {
                 plugins.push(window.reactIztroPlugins.darkHidedHeavenlyStems());
                 console.log("[ZiweiChart ELEMENT] 暗合插件已加載。");
            } else {
                console.warn("[ZiweiChart ELEMENT] 暗合插件 (darkHidedHeavenlyStems) 在 window.reactIztroPlugins 中未找到。");
            }
        }
        return {
            birthday: birthdayForIztro,
            gender: gender === 'M' ? 'male' : (gender === 'F' ? 'female' : undefined), // 修改這裡，iztro 需要 'male'/'female'
            birthdayType: birthdayType, 
            timeZone: timeZone !== undefined ? parseInt(timeZone, 10) : undefined, 
            fixedLeap: fixedLeap,
            plugins: plugins,
            language: lang 
        };
    }

    _parseAndRender(configString, forceRender = false) {
        // ... (邏輯與我上一個回覆中的 _parseAndRender 類似，確保處理 _isRendering 和 _currentConfigString)
        if (!forceRender && this._isRendering && configString === this._currentConfigString) {
            console.warn('[ZiweiChart] _parseAndRender: Skipped due to ongoing/same config.');
            return;
        }
        if (!this._isMounted || !this._reactRoot) {
            console.warn('[ZiweiChart] _parseAndRender: Not ready (not mounted or no React root).');
            return;
        }
        this._isRendering = true;
        this._currentConfigString = configString;

        if (!configString) {
            this.renderError('Config string is empty.');
            this._isRendering = false; return;
        }
        try {
            const config = JSON.parse(configString);
            if (config?.type === 'RENDER_CHART' && config.payload) {
                this._renderAstrolabeWithReact(config.payload);
            } else {
                this.renderError('Invalid config structure.');
                this._isRendering = false;
            }
        } catch (error) {
            this.renderError(`Error parsing config: ${error.message}`);
            this._isRendering = false;
        }
    }
    
    _renderAstrolabeWithReact(payload) {
        // ... (與我上一個回覆中的 _renderAstrolabeWithReact 基本一致)
        // 確保 AstrolabeComponent, chartWidth, chartHeight, finalOptions, finalProps 的構建正確
        // 尤其注意 props 的結構是否符合 react-iztro 的 API

        if (!this._isMounted || !this._reactRoot) { this._isRendering = false; return; }
        const iztroParams = this.birthDataToIzTroParams(payload);
        if (!iztroParams) { this.renderError('Invalid birth data.'); this._isRendering = false; return; }

        const AstrolabeComponent = iztro.Iztrolabe;
        if (typeof AstrolabeComponent === 'undefined') { this.renderError('Iztrolabe component not found.'); this._isRendering = false; return; }

        const chartWidth = this._currentWidth > 10 ? this._currentWidth : 550;
        const chartHeight = this._currentHeight > 10 ? this._currentHeight : 650;
        const veloChartOptions = payload.chartOptions || this._data?.chartOptions || {};

        // ***** 再次確認：以下 options 結構是否符合 react-iztro 文檔 *****
        const finalOptions = {
            width: chartWidth,
            height: chartHeight,
            theme: veloChartOptions.theme || 'default',
            language: iztroParams.language || veloChartOptions.language || 'zh-CN',
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
            astrolabe: { 
                ...(veloChartOptions.astrolabe || {}), 
                showMutableSigns: veloChartOptions.astrolabe?.showMutableSigns !== undefined ? veloChartOptions.astrolabe.showMutableSigns : true 
            },
            plugins: [...(iztroParams.plugins || []), ...(veloChartOptions.plugins || [])],
             ...(veloChartOptions.directOptions || {})
        };
        
        const finalProps = {
            birthday: iztroParams.birthday,
            birthTime: parseInt(payload.birthTime, 10), 
            gender: iztroParams.gender,
            birthdayType: iztroParams.birthdayType,
            timeZone: iztroParams.timeZone,
            fixedLeap: payload.fixedLeap, 
            options: finalOptions, 
        };

        // 再次根據 iztro 文檔，檢查 language 和 plugins 是否是頂級 props
        // if (finalOptions.language) { finalProps.language = finalOptions.language; delete finalOptions.language; }
        // if (finalOptions.plugins) { finalProps.plugins = finalOptions.plugins; delete finalOptions.plugins; }


        console.log('[ZiweiChart] Rendering Astrolabe with props:', JSON.stringify(finalProps, null, 2));
        this.renderPlaceholder("Rendering chart...");

        setTimeout(() => {
            if (!this._reactRoot) { this.renderError("React Root is null in timeout.", true); this._isRendering = false; return; }
            try {
                this._reactRoot.render(React.createElement(AstrolabeComponent, finalProps));
            } catch (error) { this.renderError(`Render exception: ${error.message}`); }
            finally { this._isRendering = false; }
        }, 50);
    }
    
    // renderPlaceholder 和 renderError 方法保持不變
    renderPlaceholder(message) {
        if (!this._reactRoot || !this._mountPoint) return;
        try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message)); }
        catch (e) { this._mountPoint.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React Err)</div>`; }
    }
    renderError(message, isCritical = false) {
        if (!this._reactRoot || !this._mountPoint) {
            if(this.shadowRoot) this.shadowRoot.innerHTML = `<style>.error-message-in-shadow{...}</style><div class="message-display-in-shadow error-message-in-shadow">${message}</div>`;
            return;
        }
        try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message)); }
        catch (e) { this._mountPoint.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React Err)</div>`; }
    }

    // Setters and Getters for Velo
    set birthData(value) { /* ... */ 
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } catch (e) { this.renderError('birthData format error.'); return; }
        }
        this._data = { ...this._data, birthData: parsedValue };
        if (this._isMounted) { this.renderChartFromAttributes(true); }
    }
    get birthData() { return this._data?.birthData; }
    set chartOptions(value) { /* ... */ 
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } catch (e) { console.warn('chartOptions parse error'); }
        }
        this._data = { ...this._data, chartOptions: parsedValue };
        if (this._isMounted) { this.renderChartFromAttributes(true); }
    }
    get chartOptions() { return this._data?.chartOptions; }
}

if (customElements && typeof customElements.get === 'function' && !customElements.get('ziwei-chart')) {
    customElements.define('ziwei-chart', ZiweiChart);
} else {
    console.warn('[ZiweiChart] Already defined or API issue.');
}