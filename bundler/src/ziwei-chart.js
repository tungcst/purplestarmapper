// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro'; 
// 假設 react-iztro-plugins 已全局引入，例如 window.reactIztroPlugins

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
if (typeof iztro === 'object' && iztro !== null) {
    const initialIztroKeys = Object.getOwnPropertyNames(iztro);
    console.log('[ZiweiChart CE SCRIPT] ALL Initial iztro object property names (incl. non-enumerable):', initialIztroKeys);
    initialIztroKeys.forEach(key => {
        let valueType = typeof iztro[key];
        let valuePreview = String(iztro[key]).substring(0, 70);
        if (typeof iztro[key] === 'function') {
            valuePreview = `[Function: ${iztro[key].name || 'anonymous'}]`;
        } else if (typeof iztro[key] === 'object' && iztro[key] !== null) {
            try { valuePreview = `[Object with keys: ${Object.keys(iztro[key]).join(', ')}]`; }
            catch (e) { valuePreview = '[Object - cannot get keys]'; }
        }
        console.log(`[ZiweiChart CE SCRIPT]   Key: "${key}", Type: ${valueType}, Value Preview: ${valuePreview}`);
    });
    console.log('[ZiweiChart CE SCRIPT] typeof iztro.Iztrolabe:', typeof iztro.Iztrolabe);
    console.log('[ZiweiChart CE SCRIPT] typeof iztro.Astrolabe:', typeof iztro.Astrolabe); // 通常 Iztrolabe 是正確的
} else {
    console.warn('[ZiweiChart CE SCRIPT] "iztro" object is not an object or is null.');
}

// --- CSS Definitions ---
const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;

const reactIztroDefaultCSS = `
.iztro-astrolabe-theme-default {
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
  --iztro-color-border: rgba(0, 21, 41, 0.07);
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
  width: 100%; 
  height: 100%; 
  grid-gap: 1px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-template-areas:
    "g3 g4 g5 g6"
    "g2 ct ct g7"
    "g1 ct ct g8"
    "g0 g11 g10 g9";
  text-align: left;
  border: 1px solid var(--iztro-color-border);
  box-sizing: border-box;
}
.iztro-palace {
  padding: 3px 5px;
  display: grid;
  text-transform: capitalize;
  grid-template-rows: auto auto 1fr auto; 
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "major minor adj"
    "horo  horo adj"
    "fate  fate fate"
    "ft   ft  ft";
  transition: all 0.25s ease-in-out;
  grid-auto-flow: column;
  border: 1px solid var(--iztro-color-border);
  box-sizing: border-box;
  overflow: hidden; 
  position: relative;
  margin: -1px 0 0 -1px;
}
.iztro-astrolabe > .iztro-palace:nth-child(4n+1) { margin-left: 0; }
.iztro-astrolabe > .iztro-palace:nth-child(-n+4) { margin-top: 0; }
.iztro-astrolabe > .iztro-palace-center { margin: -1px 0 0 -1px; }
.iztro-palace.focused-palace { background-color: rgba(170, 184, 211, 0.18); }
.iztro-palace.opposite-palace { background-color: rgba(147, 247, 61, 0.31); }
.iztro-palace.surrounded-palace { background-color: rgba(175, 244, 111, 0.14); }
.iztro-palace-major { grid-area: major; display: flex; flex-wrap: wrap; gap: 2px 4px; align-items: flex-start; }
.iztro-palace-minor { grid-area: minor; justify-self: center; display: flex; flex-wrap: wrap; gap: 2px 4px; align-items: flex-start; }
.iztro-palace-adj { grid-area: adj; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; white-space: nowrap; text-align: right; }
.iztro-palace-horo-star { grid-area: horo; align-self: stretch; overflow-y: auto; scrollbar-width: thin; padding-top: 2px;}
.iztro-palace-horo-star .stars { display: flex; flex-wrap: wrap; gap: 2px 4px; }
.iztro-palace-scope { white-space: nowrap; text-align: center; /* Will be part of footer */ }
.iztro-palace-scope-decadal { font-weight: 700; }
.iztro-palace-fate { grid-area: fate; align-self: center; white-space: nowrap; justify-content: center; display: flex; flex-wrap: wrap; gap: 2px 3px; height: auto; min-height: 17px; margin-top: 2px; }
.iztro-palace-fate .iztro-palace-decadal-active { background-color: var(--iztro-color-decadal); }
.iztro-palace-fate .iztro-palace-yearly-active { background-color: var(--iztro-color-yearly); }
.iztro-palace-fate .iztro-palace-monthly-active { background-color: var(--iztro-color-monthly); }
.iztro-palace-fate .iztro-palace-daily-active { background-color: var(--iztro-color-daily); }
.iztro-palace-fate .iztro-palace-hourly-active { background-color: var(--iztro-color-hourly); }
.iztro-palace-footer { grid-area: ft; display: grid; grid-template-columns: auto 1fr auto; align-items: flex-end; padding-top: 2px; font-size: calc(var(--iztro-star-font-size-small) - 2px); }
.iztro-palace-lft24 { text-align: left; }
.iztro-palace-rgt24 { text-align: right; }
.iztro-palace-name { cursor: pointer; text-wrap: nowrap; align-self: flex-start; }
.iztro-palace-name .iztro-palace-name-wrapper { position: relative; }
.iztro-palace-name .iztro-palace-name-taichi { position: absolute; font-size: 10px; line-height: 1; background-color: var(--iztro-color-major); padding: 1px 3px; color: #fff; z-index: 2; border-radius: 0 4px 4px 0; font-weight: normal !important; bottom: 1px; left: 100%; margin-left: 2px;}
.iztro-palace-gz { text-align: right; cursor: pointer; position: absolute; top: 3px; right: 3px; font-size: calc(var(--iztro-star-font-size-small) - 2px); color: var(--iztro-color-text); }
.iztro-palace-gz span { display: inline-block; padding: 0 1px; text-wrap: nowrap; }
.iztro-palace-dynamic-name { text-align: center; display: flex; white-space: nowrap; gap: 3px; justify-content: center; font-size: calc(var(--iztro-star-font-size-small) - 1px); position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%); width: 100%; }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-decadal { color: var(--iztro-color-decadal); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-yearly { color: var(--iztro-color-yearly); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-monthly { color: var(--iztro-color-monthly); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-daily { color: var(--iztro-color-daily); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-hourly { color: var(--iztro-color-hourly); }
.iztro-center-palace { grid-area: ct; position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-around; /* Distribute space */ padding: 8px; box-sizing: border-box; border: 1px solid var(--iztro-color-border); background-color: #fdfdfd; }
.iztro-center-palace-centralize { text-align: center; }
.iztro-center-palace ul.basic-info { margin: 5px 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); column-gap: 10px; font-size: calc(var(--iztro-star-font-size-small) - 1px); }
.iztro-center-palace ul.basic-info li { list-style: none; line-height: 1.6; }
.iztro-center-palace .center-title { padding-bottom: 5px; margin-bottom: 8px; font-size: calc(var(--iztro-star-font-size-big) + 1px); font-weight: bold; text-align: center; border-bottom: 1px dashed var(--iztro-color-border); }
.horo-buttons { margin: 8px 0; font-size: var(--iztro-star-font-size-small); display: flex; justify-content: center; flex-wrap: wrap; gap: 5px; }
.horo-buttons .center-button { display: block; text-align: center; padding: 4px 8px; border: 1px solid var(--iztro-color-border); cursor: pointer; transition: all 0.25s ease-in-out; color: var(--iztro-color-text); user-select: none; border-radius: 4px; }
.horo-buttons .center-button:not(.disabled):hover { color: var(--iztro-color-major); background-color: var(--iztro-color-border); }
.horo-buttons .center-button.disabled { opacity: 0.5; cursor: not-allowed; }
.horo-buttons .center-horo-hour { display: flex; align-items: center; }
.iztro-copyright { /* position: absolute; */ display: block; text-align:center; margin-top: auto; /* Push to bottom */ bottom: 5px; /* right: 5px; */ font-size: 10px; color: rgba(0, 0, 0, 0.2); text-decoration: none; text-shadow: 1px 1px rgba(255, 255, 255, 0.3); padding-top: 5px; }
#palace-line { stroke: var(--iztro-color-awesome); opacity: 0.6; transition: all 0.25s ease-in-out; }
#palace-line.decadal { stroke: var(--iztro-color-decadal); }
.solar-horoscope { display: flex; align-items: center; gap: 10px; margin-top: 8px; justify-content: center;}
.solar-horoscope .today { display: inline-block; font-size: var(--iztro-star-font-size-small); cursor: pointer; border: 1px solid var(--iztro-color-border); padding: 2px 6px; transition: all 0.25s ease-in-out; border-radius: 4px; }
.solar-horoscope .today:hover { color: var(--iztro-color-major); background-color: var(--iztro-color-border); }
.iztro-star-soft, .iztro-star-tough, .iztro-star-adjective, .iztro-star-flower, .iztro-star-helper, .iztro-palace-horo-star .stars, .iztro-palace-scope, .iztro-palace-dynamic-name, .iztro-palace-lft24, .iztro-palace-rgt24 { font-size: var(--iztro-star-font-size-small); font-weight: normal; white-space: nowrap; }
.iztro-palace-scope-age { white-space: normal; }
.iztro-star-major, .iztro-star-tianma, .iztro-star-lucun, .iztro-palace-name, .iztro-palace-gz { font-size: var(--iztro-star-font-size-big); font-weight: bold; }
.iztro-star-brightness, .iztro-star-adjective { font-style: normal; font-weight: normal; color: var(--iztro-color-text); }
.iztro-star-major, .iztro-star-soft, .iztro-palace-name { color: var(--iztro-color-major); }
.iztro-star-tough { color: var(--iztro-color-tough); }
.iztro-star-flower { color: var(--iztro-color-happy); }
.iztro-star-helper { color: var(--iztro-color-nice); }
.iztro-star-mutagen { font-weight: normal; font-size: calc(var(--iztro-star-font-size-small) - 1px); border-radius: 3px; color: #fff !important; display: inline-block; margin-left: 2px; padding: 1px 3px; vertical-align: text-bottom; line-height: 1; }
.star-with-mutagen { position: relative; padding-right: 1px; }
.star-with-mutagen::before, .star-with-mutagen::after { display: none; }
.iztro-palace-name-body { font-size: calc(var(--iztro-star-font-size-small) - 1px); font-weight: normal; position: absolute; margin-top: 1px; }
.iztro-palace-fate span { display: inline-block; padding: 1px 3px; border-radius: 3px; color: #fff; background-color: var(--iztro-color-major); cursor: pointer; margin-left: 2px; font-size: calc(var(--iztro-star-font-size-small) - 2px); line-height: 1.2;}
.iztro-palace-center-item label { margin-right: 5px; display: inline-block; min-width: auto; font-weight: 500; }
.iztro-palace-center-item span { font-weight: normal; }
`;

const customChartHostAndWrapperStyles = `
  :host {
    display: block; 
    width: 100%;   
    min-height: 580px; /* 給一個最小高度 */
    height: auto; /* 或者設置為具體值如 650px，根據你的設計 */
    overflow: hidden; 
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4;
    border: 1px solid #e0e0e0; /* 更淡的調試邊框 */
  }
  #chart-render-target {
    width: 100%;
    height: 100%; /* 讓它填充 :host 的高度 */
    display: flex; 
    justify-content: center;
    align-items: center; 
    box-sizing: border-box;
    background-color: #f9f9f9; 
    padding: 10px;
  }
  /* 確保 .iztro-astrolabe 本身尺寸受控，而不是無限擴大 */
  #chart-render-target > .iztro-astrolabe {
      width: 100%; 
      height: 100%;
      max-width: 780px; /* 調整適合的最大寬度 */
      max-height: 780px; /* 調整適合的最大高度 */
      min-width: 300px; /* 確保有最小寬度 */
      min-height: 450px; /* 確保有最小高度 */
      box-sizing: border-box;
      overflow: auto; /* 如果內容超出，允許滾動 */
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
    }

    _injectStyles = () => {
        const styleElement = this.shadowRoot.getElementById('ziwei-dynamic-styles');
        if (!styleElement) { console.error("Style element not found!"); return; }
        let combinedCSS = `
            .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px auto; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; max-width: 80%; }
            .loading-message-in-shadow { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
            .error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
        `;
        if (typeof antdResetCSS === 'string') combinedCSS += antdResetCSS;
        combinedCSS += reactIztroDefaultCSS;
        combinedCSS += customChartHostAndWrapperStyles;
        if (this._currentThemeOverride) combinedCSS += this._currentThemeOverride;
        styleElement.textContent = combinedCSS;
    }
    
    connectedCallback = () => {
        if (!this._isMounted) {
            this._injectStyles();
            if (!this._mountPoint) { this.renderError("Mount point error.", true); return; }
            if (typeof ReactDOM !== 'undefined' && ReactDOM.createRoot) {
                this._reactRoot = ReactDOM.createRoot(this._mountPoint);
            } else { this.renderError('React env error (createRoot).', true); this._isMounted = true; return; }
            
            this._isMounted = true;
            this._setupResizeObserver();
            
            const initialTheme = this.getAttribute('theme-override');
            if (initialTheme) {
                this._currentThemeOverride = initialTheme;
                this._injectStyles();
                this._forceNextRender = true;
            }
            // 確保在 observer 第一次觸發或有配置時渲染
             if (this._currentWidth === 0 && this._currentHeight === 0) {
                 this.renderPlaceholder("獲取容器尺寸...");
             } else {
                 this.renderChartFromAttributes(this._forceNextRender);
             }
        } else {
            this._injectStyles();
            if (this._resizeObserver && this._mountPoint && !this._resizeObserver.observationTargets?.includes(this._mountPoint)) {
                 this._resizeObserver.observe(this._mountPoint);
            }
            if (this._currentConfigString) this._parseAndRender(this._currentConfigString, true);
        }
    }

    disconnectedCallback = () => {
        if (this._isMounted && this._reactRoot) {
            try { this._reactRoot.unmount(); } catch (e) { /* ignore */ }
        }
        this._isMounted = false; this._reactRoot = null;
        if (this._resizeObserver) { this._resizeObserver.disconnect(); this._resizeObserver = null; }
        this._currentConfigString = null;
    }

    attributeChangedCallback = (name, oldValue, newValue) => {
        if (name === 'theme-override') {
            if (newValue !== this._currentThemeOverride) {
                this._currentThemeOverride = newValue; this._injectStyles();
                if (this._isMounted && this._currentConfigString) {
                    this._forceNextRender = true; this._parseAndRender(this._currentConfigString, true);
                }
            }
        } else if (name === 'data-config') {
            if (newValue === this._currentConfigString && !this._forceNextRender) return;
            if (!this._isMounted) return;
            if (newValue === null || newValue === undefined) {
                this.renderPlaceholder("配置已移除。"); this._currentConfigString = null;
            } else { this._parseAndRender(newValue); }
            this._forceNextRender = false;
        }
    }
    
    renderChartFromAttributes = (forceRender = false) => {
        if(!this._isMounted || !this._reactRoot) { this.renderPlaceholder("組件未就緒..."); return;}
        const configAttr = this.getAttribute('data-config');
        if (configAttr && (forceRender || configAttr !== this._currentConfigString || !this._currentWidth || !this._currentHeight )) {
            this._parseAndRender(configAttr, forceRender);
        } else if (!configAttr) {
            this.renderPlaceholder("等待命盤配置...");
            if(this._currentConfigString !== null) this._currentConfigString = null;
        }
    }
    
    _setupResizeObserver = () => {
        if (this._resizeObserver) this._resizeObserver.disconnect();
        this._resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 10 && height > 10 ) { 
                    if (Math.abs(width - this._currentWidth) > 1 || Math.abs(height - this._currentHeight) > 1) {
                        this._currentWidth = Math.round(width);
                        this._currentHeight = Math.round(height);
                        if (this._currentConfigString) {
                             this._parseAndRender(this._currentConfigString, true); 
                        } else { this.renderPlaceholder("尺寸更新，等待數據..."); }
                    }
                }
            }
        });
        if (this._mountPoint) {
            this._resizeObserver.observe(this._mountPoint);
            requestAnimationFrame(() => {
                if (this._mountPoint && this._isMounted) { 
                    const initialRect = this._mountPoint.getBoundingClientRect();
                    this._currentWidth = Math.round(initialRect.width);
                    this._currentHeight = Math.round(initialRect.height);
                    if (this._currentWidth > 0 && this._currentHeight > 0 && this.getAttribute('data-config')) {
                        if (!this._currentConfigString || this._forceNextRender) { // 避免重複
                           this.renderChartFromAttributes(true);
                        }
                    } else if (!this.getAttribute('data-config')) {
                        this.renderPlaceholder("獲取到尺寸，等待配置...");
                    }
                }
            });
        }
    }

    birthDataToIzTroParams = (payload) => {
        // ... (你最新的、包含暗合插件和語言處理的 birthDataToIzTroParams 邏輯)
        // 關鍵：確保 birthTime 被正確轉換為 0-12 的時辰索引
        if (!payload || !payload.year || !payload.month || !payload.day || typeof payload.hour === 'undefined' || typeof payload.gender === 'undefined') {
            console.warn('[ZiweiChart BPars] Invalid payload:', payload);
            return null;
        }
        let { year, month, day, hour, minute = 0, gender, solarDate, lunarDate, timeZone, anH = false, lang = 'zh-CN', fixedLeap = false, isLeapMonth = false } = payload;
        
        let targetYear = parseInt(year, 10);
        let targetMonth = parseInt(month, 10);
        let targetDay = parseInt(day, 10);
        let originalHour = parseInt(hour, 10); // Velo傳來的原始小時 (0-23)
        let targetMinute = parseInt(minute, 10);

        // 將 0-23 小時轉換為 react-iztro 的 0-12 時辰索引
        // 子時 (23:00-00:59) -> 0
        // 丑時 (01:00-02:59) -> 1
        // ...
        // 亥時 (21:00-22:59) -> 11
        let iztroBirthTimeIndex;
        if (originalHour >= 23 || originalHour < 1) iztroBirthTimeIndex = 0; // 子
        else if (originalHour >= 1 && originalHour < 3) iztroBirthTimeIndex = 1; // 丑
        else if (originalHour >= 3 && originalHour < 5) iztroBirthTimeIndex = 2; // 寅
        else if (originalHour >= 5 && originalHour < 7) iztroBirthTimeIndex = 3; // 卯
        else if (originalHour >= 7 && originalHour < 9) iztroBirthTimeIndex = 4; // 辰
        else if (originalHour >= 9 && originalHour < 11) iztroBirthTimeIndex = 5; // 巳
        else if (originalHour >= 11 && originalHour < 13) iztroBirthTimeIndex = 6; // 午
        else if (originalHour >= 13 && originalHour < 15) iztroBirthTimeIndex = 7; // 未
        else if (originalHour >= 15 && originalHour < 17) iztroBirthTimeIndex = 8; // 申
        else if (originalHour >= 17 && originalHour < 19) iztroBirthTimeIndex = 9; // 酉
        else if (originalHour >= 19 && originalHour < 21) iztroBirthTimeIndex = 10; // 戌
        else if (originalHour >= 21 && originalHour < 23) iztroBirthTimeIndex = 11; // 亥
        else iztroBirthTimeIndex = 0; // 預設或錯誤處理

        if (originalHour === 23) { // 晚子時，日期需要加一天
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
        
        let birthdayForIztro, birthdayType = payload.solar === false ? 'lunar' : 'solar';
        if (birthdayType === 'solar') {
            birthdayForIztro = solarDate || `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`;
        } else { 
            if (lunarDate && typeof lunarDate === 'object') { 
                birthdayForIztro = { year: lunarDate.year, month: lunarDate.month, day: lunarDate.day, isLeap: !!isLeapMonth };
            } else { // 需要從公曆轉農曆，或Velo直接提供農曆年月日
                 console.warn("Lunar date object not provided, attempting to use solar as base for lunar conversion (may be inaccurate).");
                 birthdayForIztro = { year: targetYear, month: targetMonth, day: targetDay, isLeap: !!isLeapMonth }; // 假設 Velo 會提供轉換後的農曆
            }
        }
        
        const plugins = [];
        if (anH && typeof window.reactIztroPlugins?.darkHidedHeavenlyStems === 'function') {
            plugins.push(window.reactIztroPlugins.darkHidedHeavenlyStems());
        }
        
        let iztroGender = undefined;
        if(gender === 'M' || gender === 'male') iztroGender = 'male';
        if(gender === 'F' || gender === 'female') iztroGender = 'female';

        return { 
            birthday: birthdayForIztro, 
            birthTime: iztroBirthTimeIndex, 
            gender: iztroGender, 
            birthdayType, 
            timeZone: typeof timeZone === 'number' ? timeZone : (payload.timeZone !== undefined ? parseInt(payload.timeZone,10) : undefined), 
            isLeapMonth: birthdayType === 'lunar' ? !!isLeapMonth : undefined,
            fixLeap, 
            plugins, 
            language: lang 
        };
    }
    
    _parseAndRender = (configString, forceRender = false) => {
        if (!forceRender && this._isRendering && configString === this._currentConfigString) return;
        if (!this._isMounted || !this._reactRoot) return;
        this._isRendering = true; this._currentConfigString = configString;
        if (!configString) { this.renderError('Config is empty.'); this._isRendering = false; return; }
        try {
            const config = JSON.parse(configString);
            if (config?.type === 'RENDER_CHART' && config.payload) {
                this._renderAstrolabeWithReact(config.payload);
            } else { this.renderError('Invalid config.'); this._isRendering = false; }
        } catch (error) { this.renderError(`Parse config error: ${error.message}`); this._isRendering = false; }
    }
    
    _renderAstrolabeWithReact = (payload) => {
        if (!this._isMounted || !this._reactRoot) { this._isRendering = false; return; }
        
        const iztroData = this.birthDataToIzTroParams(payload);
        if (!iztroData) { this.renderError('生辰數據處理失敗。'); this._isRendering = false; return; }

        const AstrolabeComponent = iztro.Iztrolabe;
        if (typeof AstrolabeComponent === 'undefined') { this.renderError('Iztrolabe 組件未加載。'); this._isRendering = false; return; }

        const chartWidth = this._currentWidth > 50 ? this._currentWidth : 580; // 確保最小寬度
        // height 不再直接傳遞給 Iztrolabe，它將由 CSS 和內容決定
        
        const veloChartOptions = payload.chartOptions || this._data?.chartOptions || {};

        // 根據 react-iztro (SylarLong) 的 README 和 Props 結構
        const finalProps = {
            birthday: iztroData.birthday,
            birthTime: iztroData.birthTime, // 0-12
            gender: iztroData.gender,     // 'male' or 'female'
            birthdayType: iztroData.birthdayType,
            isLeapMonth: iztroData.isLeapMonth,
            fixLeap: iztroData.fixLeap,
            lang: iztroData.language,
            plugins: iztroData.plugins, // plugins 是頂級 prop

            // Iztrolabe 組件自身的頂級 props (基於 README 示例)
            width: chartWidth.toString(), // 傳遞計算的寬度
            horoscopeDate: veloChartOptions.horoscopeDate ? new Date(veloChartOptions.horoscopeDate) : new Date(),
            horoscopeHour: veloChartOptions.horoscopeHour, 
            centerPalaceAlign: veloChartOptions.centerPalaceAlign || false,

            // options prop (傳遞給底層 iztro 核心庫的配置)
            options: {
                theme: veloChartOptions.theme || 'default', // 主題是 options 的一部分
                 // SylarLong/react-iztro 的 showXXX 選項由內部 state 控制
                ...(veloChartOptions.iztroCoreOptions || {}), // 例如：yearDivide: 'exact'
            },
            className: veloChartOptions.className || '',
        };
        
        // 清理，確保頂級 props 不會重複出現在 options 中
        if (finalProps.options?.lang) delete finalProps.options.lang;
        if (finalProps.options?.plugins) delete finalProps.options.plugins;
        if (finalProps.options?.width) delete finalProps.options.width;


        console.log('[ZiweiChart] Final props for Iztrolabe:', JSON.stringify(finalProps, (k,v) => typeof v === 'function' ? "Function" : v , 2 ));
        this.renderPlaceholder("渲染命盤中...");

        setTimeout(() => {
            if (!this._reactRoot) { this.renderError("React Root is null in timeout.", true); this._isRendering = false; return; }
            try {
                this._reactRoot.render(React.createElement(AstrolabeComponent, finalProps));
            } catch (error) { this.renderError(`渲染命盤時發生錯誤: ${error.message}`);}
            finally { this._isRendering = false; }
        }, 100);
    }
    
    renderPlaceholder = (message) => { 
        if (!this._reactRoot || !this._mountPoint) return;
        try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message)); }
        catch (e) { if(this._mountPoint) this._mountPoint.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React Placeholder Err)</div>`; }
    }
    renderError = (message, isCritical = false) => { 
        if (!this._reactRoot || !this._mountPoint) {
            if(this.shadowRoot) this.shadowRoot.innerHTML = `<style>.error-message-in-shadow{background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; }</style><div class="message-display-in-shadow error-message-in-shadow">${message}</div>`;
            return;
        }
        try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message)); }
        catch (e) { if(this._mountPoint) this._mountPoint.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React Error Err)</div>`; }
    }

    set birthData(value) {
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } 
            catch (e) { this.renderError('birthData 格式錯誤。'); return; }
        }
        this._data = { ...this._data, birthData: parsedValue };
        if (this._isMounted) { this.renderChartFromAttributes(true); }
    }
    get birthData() { return this._data?.birthData; }

    set chartOptions(value) {
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } 
            catch (e) { console.warn('chartOptions 解析失敗'); }
        }
        this._data = { ...this._data, chartOptions: parsedValue };
        if (this._isMounted) { this.renderChartFromAttributes(true); }
    }
    get chartOptions() { return this._data?.chartOptions; }
}

if (customElements && typeof customElements.get === 'function' && !customElements.get('ziwei-chart')) {
    try {
        customElements.define('ziwei-chart', ZiweiChart);
        console.log('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" DEFINED SUCCESSFULLY.');
    } catch (e) {
        console.error('[ZiweiChart CE SCRIPT] CRITICAL ERROR defining custom element "ziwei-chart":', e);
    }
} else {
    console.warn('[ZiweiChart CE SCRIPT] "ziwei-chart" already defined or customElements API issue.');
}
console.log('[ZiweiChart CE SCRIPT] Top-level script execution FINISHED.');