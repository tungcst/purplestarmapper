// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro';
// 假設 react-iztro-plugins 已全局引入或打包時處理了
// import { darkHidedHeavenlyStems } from 'react-iztro-plugins';

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started.');
// ... (保留你所有的 iztro 對象檢查日誌) ...
if (typeof iztro === 'object' && iztro !== null) {
    const initialIztroKeys = Object.getOwnPropertyNames(iztro);
    console.log('[ZiweiChart CE SCRIPT] ALL Initial iztro object property names:', initialIztroKeys);
    console.log('[ZiweiChart CE SCRIPT] iztro.Iztrolabe type:', typeof iztro.Iztrolabe);
    console.log('[ZiweiChart CE SCRIPT] iztro.Astrolabe type:', typeof iztro.Astrolabe);
    // ... 更多詳細日誌 ...
}


// --- CSS Definitions ---
const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;

// 你的 reactIztroDefaultCSS，確保它包含 .iztro-astrolabe 的 grid 佈局
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
  --iztro-color-border: rgba(0, 21, 41, 0.07); /* #00152912 的 RGBA 等效 */
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
  grid-gap: 1px; /* 稍微減小gap，或者完全移除讓border合併 */
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-template-areas:
    "g3 g4 g5 g6"
    "g2 ct ct g7"
    "g1 ct ct g8"
    "g0 g11 g10 g9";
  text-align: left;
  border: 1px solid var(--iztro-color-border); /* 將外邊框加到這裡 */
  box-sizing: border-box;
}
.iztro-palace {
  padding: 3px 5px; /* 調整內邊距 */
  display: grid;
  text-transform: capitalize;
  grid-template-rows: auto auto 1fr auto; 
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "major minor adj"
    "horo  horo adj"
    "fate  fate fate"
    "ft   ft  ft";
  border: 1px solid var(--iztro-color-border);
  box-sizing: border-box;
  overflow: hidden; 
  position: relative; /* 為了宮幹的絕對定位 */
}
/* 使宮位邊框疊加而不是雙倍 */
.iztro-palace { margin: -1px 0 0 -1px; }
.iztro-astrolabe > .iztro-palace:nth-child(4n+1) { margin-left: 0; } /* 每行第一個左邊無負margin */
.iztro-astrolabe > .iztro-palace:nth-child(-n+4) { margin-top: 0; } /* 第一行頂部無負margin */
.iztro-astrolabe > .iztro-palace-center { margin: -1px 0 0 -1px; }


.iztro-palace.focused-palace { background-color: rgba(170, 184, 211, 0.18); } /* #aab8d32f */
.iztro-palace.opposite-palace { background-color: rgba(147, 247, 61, 0.31); } /* #93f73d4f */
.iztro-palace.surrounded-palace { background-color: rgba(175, 244, 111, 0.14); } /* #aff46f24 */
.iztro-palace-major { grid-area: major; display: flex; flex-wrap: wrap; gap: 2px 4px; align-items: flex-start; }
.iztro-palace-minor { grid-area: minor; justify-self: center; display: flex; flex-wrap: wrap; gap: 2px 4px; align-items: flex-start; }
.iztro-palace-adj { grid-area: adj; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; white-space: nowrap; text-align: right; }
.iztro-palace-horo-star { grid-area: horo; align-self: stretch; overflow-y: auto; scrollbar-width: thin; padding-top: 2px;}
.iztro-palace-horo-star .stars { display: flex; flex-wrap: wrap; gap: 2px 4px; }
.iztro-palace-scope { white-space: nowrap; text-align: center; } /* 將放到 footer 中 */
.iztro-palace-scope-decadal { font-weight: 700; }
.iztro-palace-fate { grid-area: fate; align-self: center; /* 居中對齊 */ white-space: nowrap; justify-content: center; display: flex; flex-wrap: wrap; gap: 2px 3px; height: auto; min-height: 17px; margin-top: 2px; }
.iztro-palace-fate .iztro-palace-decadal-active { background-color: var(--iztro-color-decadal); }
.iztro-palace-fate .iztro-palace-yearly-active { background-color: var(--iztro-color-yearly); }
.iztro-palace-fate .iztro-palace-monthly-active { background-color: var(--iztro-color-monthly); }
.iztro-palace-fate .iztro-palace-daily-active { background-color: var(--iztro-color-daily); }
.iztro-palace-fate .iztro-palace-hourly-active { background-color: var(--iztro-color-hourly); }
.iztro-palace-footer { grid-area: ft; display: grid; grid-template-columns: auto 1fr auto; align-items: flex-end; padding-top: 2px; font-size: calc(var(--iztro-star-font-size-small) - 2px); }
.iztro-palace-lft24 { text-align: left; }
.iztro-palace-rgt24 { text-align: right; }
.iztro-palace-name { cursor: pointer; text-wrap: nowrap; align-self: flex-start; /* 宮名置頂 */ }
.iztro-palace-name .iztro-palace-name-wrapper { position: relative; }
.iztro-palace-name .iztro-palace-name-taichi { position: absolute; font-size: 10px; line-height: 1; background-color: var(--iztro-color-major); padding: 1px 3px; color: #fff; z-index: 2; border-radius: 0 4px 4px 0; font-weight: normal !important; bottom: 1px; left: 100%; margin-left: 2px;}
.iztro-palace-gz { text-align: right; cursor: pointer; position: absolute; top: 3px; right: 3px; font-size: calc(var(--iztro-star-font-size-small) - 2px); color: var(--iztro-color-text) }
.iztro-palace-gz span { display: inline-block; padding: 0 1px; text-wrap: nowrap; }
.iztro-palace-dynamic-name { text-align: center; display: flex; white-space: nowrap; gap: 3px; justify-content: center; font-size: calc(var(--iztro-star-font-size-small) - 1px); position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%); width: 100%; }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-decadal { color: var(--iztro-color-decadal); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-yearly { color: var(--iztro-color-yearly); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-monthly { color: var(--iztro-color-monthly); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-daily { color: var(--iztro-color-daily); }
.iztro-palace-dynamic-name .iztro-palace-dynamic-name-hourly { color: var(--iztro-color-hourly); }
.iztro-center-palace { grid-area: ct; position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 8px; box-sizing: border-box; border: 1px solid var(--iztro-color-border); background-color: #fdfdfd; }
.iztro-center-palace-centralize { text-align: center; }
.iztro-center-palace ul.basic-info { margin: 5px 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); column-gap: 15px; font-size: calc(var(--iztro-star-font-size-small) - 1px); }
.iztro-center-palace ul.basic-info li { list-style: none; line-height: 1.6; }
.iztro-center-palace .center-title { padding-bottom: 5px; margin-bottom: 8px; font-size: calc(var(--iztro-star-font-size-big) + 1px); font-weight: bold; text-align: center; border-bottom: 1px dashed var(--iztro-color-border); }
.horo-buttons { margin: 8px 0; font-size: var(--iztro-star-font-size-small); display: flex; justify-content: center; flex-wrap: wrap; gap: 5px; }
.horo-buttons .center-button { display: block; text-align: center; padding: 4px 8px; border: 1px solid var(--iztro-color-border); cursor: pointer; transition: all 0.25s ease-in-out; color: var(--iztro-color-text); user-select: none; border-radius: 4px; }
.horo-buttons .center-button:not(.disabled):hover { color: var(--iztro-color-major); background-color: var(--iztro-color-border); }
.horo-buttons .center-button.disabled { opacity: 0.5; cursor: not-allowed; }
.horo-buttons .center-horo-hour { display: flex; align-items: center; }
.iztro-copyright { position: absolute; bottom: 5px; right: 5px; font-size: 10px; color: rgba(0, 0, 0, 0.2); text-decoration: none; text-shadow: 1px 1px rgba(255, 255, 255, 0.3); }
#palace-line { stroke: var(--iztro-color-awesome); opacity: 0.6; transition: all 0.25s ease-in-out; }
#palace-line.decadal { stroke: var(--iztro-color-decadal); }
.solar-horoscope { display: flex; align-items: center; gap: 10px; margin-top: 8px; justify-content: center;}
.solar-horoscope .today { display: inline-block; font-size: var(--iztro-star-font-size-small); cursor: pointer; border: 1px solid var(--iztro-color-border); padding: 2px 6px; transition: all 0.25s ease-in-out; border-radius: 4px; }
.solar-horoscope .today:hover { color: var(--iztro-color-major); background-color: var(--iztro-color-border); }
.iztro-star-soft, .iztro-star-tough, .iztro-star-adjective, .iztro-star-flower, .iztro-star-helper, .iztro-palace-horo-star .stars, .iztro-palace-scope, .iztro-palace-dynamic-name, .iztro-palace-lft24, .iztro-palace-rgt24 { font-size: var(--iztro-star-font-size-small); font-weight: normal; white-space: nowrap; }
.iztro-palace-scope-age { white-space: normal; /* Allow age to wrap if needed */ }
.iztro-star-major, .iztro-star-tianma, .iztro-star-lucun, .iztro-palace-name, .iztro-palace-gz { font-size: var(--iztro-star-font-size-big); font-weight: bold; }
.iztro-star-brightness, .iztro-star-adjective { font-style: normal; font-weight: normal; color: var(--iztro-color-text); }
.iztro-star-major, .iztro-star-soft, .iztro-palace-name { color: var(--iztro-color-major); }
.iztro-star-tough { color: var(--iztro-color-tough); }
.iztro-star-flower { color: var(--iztro-color-happy); }
.iztro-star-helper { color: var(--iztro-color-nice); } /* Removed .iztro-palace-gz from here */
.iztro-star-mutagen { font-weight: normal; font-size: calc(var(--iztro-star-font-size-small) - 1px); border-radius: 3px; color: #fff !important; display: inline-block; margin-left: 2px; padding: 1px 3px; vertical-align: text-bottom; line-height: 1; }
.star-with-mutagen { position: relative; padding-right: 1px; /* space for mutagen */}
.star-with-mutagen::before { display: none; /* Simplified, rely on .iztro-star-mutagen positioning */ }
.star-with-mutagen::after { display: none; /* Simplified */ }
.iztro-palace-name-body { font-size: calc(var(--iztro-star-font-size-small) - 1px); font-weight: normal; position: absolute; margin-top: 1px; }
.iztro-palace-fate span { display: inline-block; padding: 1px 3px; border-radius: 3px; color: #fff; background-color: var(--iztro-color-major); cursor: pointer; margin-left: 2px; font-size: calc(var(--iztro-star-font-size-small) - 2px); line-height: 1.2;}
.iztro-palace-center-item label { margin-right: 5px; display: inline-block; min-width: auto; font-weight: 500; }
.iztro-palace-center-item span { font-weight: normal; }
`;

// 自定義 :host 和 wrapper 樣式，移除了宮位 grid-area 的定義
const customChartHostAndWrapperStyles = `
  :host {
    display: block; 
    width: 100%;   
    height: auto; 
    min-height: 500px; 
    overflow: hidden; /* 改回 hidden，如果 react-iztro 能自適應 */
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4;
    border: 1px solid #ddd; /* 淡一點的調試邊框 */
  }
  #chart-render-target {
    width: 100%;
    height: 100%; 
    display: flex; 
    justify-content: center;
    align-items: center; /* 嘗試垂直居中 */
    box-sizing: border-box;
    background-color: #fdfdfd; 
    padding: 5px; 
  }
  /* 確保 .iztro-astrolabe 能獲得正確尺寸 */
  /* 這個選擇器可能不需要，如果 #chart-render-target 已經是 flex 並且居中了 */
  /* #chart-render-target > .iztro-astrolabe {
      max-width: 95%; 
      max-height: 95%;
      box-sizing: border-box;
  } */
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

        // 綁定方法 (確保在 constructor 末尾或在方法定義後)
        this._injectStyles = this._injectStyles.bind(this);
        this.connectedCallback = this.connectedCallback.bind(this);
        this.disconnectedCallback = this.disconnectedCallback.bind(this);
        this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
        this._parseAndRender = this._parseAndRender.bind(this);
        this._renderAstrolabeWithReact = this._renderAstrolabeWithReact.bind(this);
        this.renderPlaceholder = this.renderPlaceholder.bind(this);
        this.renderError = this.renderError.bind(this);
        this._setupResizeObserver = this._setupResizeObserver.bind(this);
        this.renderChartFromAttributes = this.renderChartFromAttributes.bind(this); // ✅ 確保綁定
        this.birthDataToIzTroParams = this.birthDataToIzTroParams.bind(this);
        console.log('[ZiweiChart INSTANCE] constructor: Methods bound.');
    }

    _injectStyles() {
        const styleElement = this.shadowRoot.getElementById('ziwei-dynamic-styles');
        if (!styleElement) {
            console.error("[ZiweiChart INSTANCE] _injectStyles: #ziwei-dynamic-styles not found!");
            return;
        }
        let combinedCSS = `
            .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
            .loading-message-in-shadow { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
            .error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
        `;
        if (typeof antdResetCSS !== 'undefined') combinedCSS += antdResetCSS;
        combinedCSS += reactIztroDefaultCSS; // 包含 iztro 核心 CSS
        combinedCSS += customChartHostAndWrapperStyles; // 包含 :host 和 wrapper
        if (this._currentThemeOverride) combinedCSS += this._currentThemeOverride;
        styleElement.textContent = combinedCSS;
        console.log("[ZiweiChart INSTANCE] _injectStyles: Styles injected.");
    }
    
    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED.');
        if (!this._isMounted) {
            this._injectStyles(); 

            if (!this._mountPoint) { 
                console.error('[ZiweiChart INSTANCE] connectedCallback: _mountPoint is NULL.');
                this.shadowRoot.innerHTML = `<style>.error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; }</style><div class="error-message-in-shadow">Mount point error. Cannot initialize.</div>`;
                return;
            }

            if (typeof ReactDOM !== 'undefined' && ReactDOM.createRoot) {
                this._reactRoot = ReactDOM.createRoot(this._mountPoint);
                console.log('[ZiweiChart INSTANCE] connectedCallback: React root CREATED.');
            } else {
                console.error('[ZiweiChart INSTANCE] connectedCallback: ReactDOM.createRoot is UNDEFINED.');
                this.renderError('React 環境錯誤 (createRoot)。', true);
                this._isMounted = true; // 即使出錯也標記，避免重複
                return;
            }
            
            this._isMounted = true;
            this._setupResizeObserver(); // 在 reactRoot 創建後設置
            
            const initialThemeOverride = this.getAttribute('theme-override');
            if (initialThemeOverride) {
                this._currentThemeOverride = initialThemeOverride;
                this._injectStyles(); // 確保主題樣式被應用
                this._forceNextRender = true;
            }
            // 調用 renderChartFromAttributes，它會處理初始的 data-config
            this.renderChartFromAttributes(this._forceNextRender);
            
        } else {
            console.log('[ZiweiChart INSTANCE] connectedCallback: Already mounted. Ensuring styles and re-rendering if config exists.');
            this._injectStyles(); 
            if (this._currentConfigString) {
                 // 確保ResizeObserver也重新觀察，因為元素可能被移動
                if (this._resizeObserver && this._mountPoint) {
                    this._resizeObserver.unobserve(this._mountPoint);
                    this._resizeObserver.observe(this._mountPoint);
                }
                this._parseAndRender(this._currentConfigString, true); 
            }
        }
        console.log('[ZiweiChart INSTANCE] connectedCallback FINISHED.');
    }
    
    renderChartFromAttributes(forceRender = false) {
        console.log(`[ZiweiChart INSTANCE] renderChartFromAttributes CALLED. Force: ${forceRender}`);
        if(!this._isMounted || !this._reactRoot) {
            console.warn("[ZiweiChart INSTANCE] renderChartFromAttributes: Not ready (not mounted or no React root).");
            return;
        }
        const configAttr = this.getAttribute('data-config');
        if (configAttr && (forceRender || configAttr !== this._currentConfigString || !this._currentWidth || !this._currentHeight )) { // 新增了尺寸檢查
            console.log(`[ZiweiChart INSTANCE] renderChartFromAttributes: Condition met. Calling _parseAndRender. Force: ${forceRender}, ConfigChanged: ${configAttr !== this._currentConfigString}, SizeInvalid: ${!this._currentWidth || !this._currentHeight}`);
            this._parseAndRender(configAttr, forceRender);
        } else if (!configAttr && this._currentConfigString !== null) {
            this.renderPlaceholder("等待命盤數據配置 (attribute removed from chart)...");
            this._currentConfigString = null;
        } else if (!configAttr) {
            this.renderPlaceholder("等待命盤數據配置 (initial state for chart)...");
        } else {
            console.log(`[ZiweiChart INSTANCE] renderChartFromAttributes: No render condition met. ConfigAttr: ${!!configAttr}, CurrentConfig: ${!!this._currentConfigString}, Force: ${forceRender}`);
        }
    }
    
    _setupResizeObserver() {
        if (this._resizeObserver) {
             console.log('[ZiweiChart INSTANCE] _setupResizeObserver: Disconnecting existing observer.');
             this._resizeObserver.disconnect();
        }
        this._resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 10 && height > 10 ) { // 確保尺寸有效
                    if (Math.abs(width - this._currentWidth) > 1 || Math.abs(height - this._currentHeight) > 1) {
                        console.log(`[ZiweiChart INSTANCE] ResizeObserver: Size changed to ${width}x${height}. Previous: ${this._currentWidth}x${this._currentHeight}`);
                        this._currentWidth = width;
                        this._currentHeight = height;
                        if (this._currentConfigString) { // 只有在有配置時才因尺寸變化重渲染
                             console.log('[ZiweiChart INSTANCE] ResizeObserver: Triggering _parseAndRender due to size change.');
                             this._parseAndRender(this._currentConfigString, true);
                        } else {
                             console.log('[ZiweiChart INSTANCE] ResizeObserver: Size changed, but no config to render.');
                        }
                    }
                } else {
                    // console.log(`[ZiweiChart INSTANCE] ResizeObserver: Insufficient size ${width}x${height}. Not re-rendering.`);
                }
            }
        });
        if (this._mountPoint) {
            this._resizeObserver.observe(this._mountPoint);
            // 立刻獲取一次初始尺寸 (使用 requestAnimationFrame 確保 DOM 已穩定)
            requestAnimationFrame(() => {
                if (this._mountPoint) { 
                    const initialRect = this._mountPoint.getBoundingClientRect();
                    if (initialRect.width > 0 && initialRect.height > 0) {
                        this._currentWidth = initialRect.width;
                        this._currentHeight = initialRect.height;
                        console.log(`[ZiweiChart INSTANCE] Initial dimensions after rAF: ${this._currentWidth}x${this._currentHeight}`);
                        // 如果此時已有配置，且尚未渲染，則觸發一次渲染
                         if (this.getAttribute('data-config') && !this._isRendering) { //避免重複渲染
                            this.renderChartFromAttributes(true);
                        }
                    } else {
                        console.warn('[ZiweiChart INSTANCE] Initial dimensions are zero after rAF.');
                    }
                }
            });
        } else {
            console.error('[ZiweiChart INSTANCE] _setupResizeObserver: _mountPoint is null.');
        }
    }

    birthDataToIzTroParams(payload) {
        // ... (你的 birthDataToIzTroParams 邏輯，確保處理 lang 和 fixedLeap)
        if (!payload || !payload.year || !payload.month || !payload.day || !payload.hour || payload.gender === undefined) {
            console.warn('[ZiweiChart BPars] Invalid payload:', payload);
            return null;
        }
        // ... (保留你之前提供的完整的、帶有子時換日和插件邏輯的 birthDataToIzTroParams)
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
        } else if (lunarDate && typeof lunarDate === 'object' && lunarDate.year && lunarDate.month && lunarDate.day) { 
            birthdayForIztro = { year: lunarDate.year, month: lunarDate.month, day: lunarDate.day, hour: originalHourForIztro, minute: targetMinute, isLeap: !!lunarDate.isLeapMonth };
            birthdayType = 'lunar';
        } else {
            birthdayForIztro = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`;
        }
        
        const plugins = [];
        if (anH) { 
            if (typeof window.reactIztroPlugins !== 'undefined' && typeof window.reactIztroPlugins.darkHidedHeavenlyStems === 'function') {
                 plugins.push(window.reactIztroPlugins.darkHidedHeavenlyStems());
            } else { console.warn("暗合插件 (darkHidedHeavenlyStems) 在 window.reactIztroPlugins 中未找到。"); }
        }
        return {
            birthday: birthdayForIztro,
            gender: gender === 'M' ? 'male' : (gender === 'F' ? 'female' : undefined),
            birthdayType: birthdayType, 
            timeZone: timeZone !== undefined ? parseInt(timeZone, 10) : undefined, 
            fixedLeap: fixedLeap, 
            plugins: plugins,
            language: lang 
        };
    }
    
    _parseAndRender(configString, forceRender = false) {
        console.log(`[ZiweiChart] _parseAndRender called. Force: ${forceRender}. Current config: ${this._currentConfigString === configString}`);
        if (!forceRender && this._isRendering && configString === this._currentConfigString) {
            console.warn('[ZiweiChart] _parseAndRender: Skipped render (already rendering or same config).');
            return;
        }
        if (!this._isMounted || !this._reactRoot) {
            console.warn('[ZiweiChart] _parseAndRender: Component not ready for render.');
            return;
        }

        this._isRendering = true;
        this._currentConfigString = configString;

        if (!configString) {
            this.renderError('命盤配置數據為空 (from _parseAndRender).');
            this._isRendering = false; return;
        }
        try {
            const config = JSON.parse(configString);
            if (config?.type === 'RENDER_CHART' && config.payload) {
                this._renderAstrolabeWithReact(config.payload);
            } else {
                this.renderError('命盤配置格式無效 (from _parseAndRender).');
                this._isRendering = false;
            }
        } catch (error) {
            this.renderError(`解析配置時發生錯誤: ${error.message} (from _parseAndRender)`);
            this._isRendering = false;
        }
    }
    
    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart] _renderAstrolabeWithReact with payload:', JSON.stringify(payload).substring(0, 200));
        if (!this._isMounted || !this._reactRoot) { this._isRendering = false; return; }

        const iztroParams = this.birthDataToIzTroParams(payload); // Payload is the birthData part
        if (!iztroParams) { this.renderError('生辰數據轉換失敗 (from _renderAstrolabeWithReact).'); this._isRendering = false; return; }

        // 你的日誌確認了 iztro.Iztrolabe 是存在的
        const AstrolabeComponent = iztro.Iztrolabe; 
        if (typeof AstrolabeComponent !== 'function' && typeof AstrolabeComponent !== 'object') { // React component can be class or function
            this.renderError('Iztrolabe 組件無效 (from _renderAstrolabeWithReact).'); this._isRendering = false; return;
        }

        // 使用由 ResizeObserver 更新的尺寸，或 Custom Element 的 CSS 尺寸作為後備
        const chartWidth = this._currentWidth > 10 ? this._currentWidth : (parseInt(this.style.width, 10) || 580); 
        const chartHeight = this._currentHeight > 10 ? this._currentHeight : 680; 
        
        console.log(`[ZiweiChart] Using dimensions for Astrolabe: Width=${chartWidth}, Height=${chartHeight}`);

        const veloChartOptions = payload.chartOptions || this._data?.chartOptions || {};

        // **核心：構建傳遞給 Iztrolabe 的 options prop**
        const finalChartOptions = {
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
            showMonthlyScope: veloChartOptions.showMonthlyScope !== undefined ? veloChartOptions.showMonthlyScope : true, // 保持為true，檢查是否顯示
            showDailyScope: veloChartOptions.showDailyScope !== undefined ? veloChartOptions.showDailyScope : false,
            showHourlyScope: veloChartOptions.showHourlyScope !== undefined ? veloChartOptions.showHourlyScope : false,
            showTransNatal: veloChartOptions.showTransNatal !== undefined ? veloChartOptions.showTransNatal : true,
            astrolabe: { // react-iztro 可能將更細緻的配置放在 astrolabe 子對象中
                ...(veloChartOptions.astrolabe || {}), 
                showMutableSigns: veloChartOptions.astrolabe?.showMutableSigns !== undefined ? veloChartOptions.astrolabe.showMutableSigns : true,
            },
            plugins: [...(iztroParams.plugins || []), ...(veloChartOptions.plugins || [])],
            ...(veloChartOptions.directOptions || {}) // 其他直接傳給 options 的 iztro 配置
        };
        
        // 最終傳遞給 Iztrolabe 組件的 props
        const finalProps = {
            birthday: iztroParams.birthday,
            birthTime: parseInt(payload.birthTime, 10), // 確保是數字
            gender: iztroParams.gender,
            birthdayType: iztroParams.birthdayType,
            timeZone: iztroParams.timeZone,
            fixedLeap: payload.fixedLeap, // 確認 iztrolabe 是否直接接受此 prop
            options: finalChartOptions, // 將所有顯示/行為配置放入 options
            // 如果 language 或 plugins 是 Iztrolabe 的頂級 props，需要從 finalChartOptions 中移出
            // language: finalChartOptions.language, 
            // plugins: finalChartOptions.plugins,
        };
        // 如果 language 是頂級prop，從 options 中移除
        if (finalProps.options.hasOwnProperty('language')) {
            finalProps.language = finalProps.options.language;
            delete finalProps.options.language;
        }
        // 如果 plugins 是頂級prop，從 options 中移除
        if (finalProps.options.hasOwnProperty('plugins')) {
            finalProps.plugins = finalProps.options.plugins;
            delete finalProps.options.plugins;
        }

        console.log('[ZiweiChart] Final props for React.createElement:', JSON.stringify(finalProps, null, 2));
        this.renderPlaceholder("正在生成命盤圖表...");

        setTimeout(() => { // 使用 setTimeout 確保之前的 DOM 操作 (如樣式注入) 有機會完成
            if (!this._reactRoot) {this.renderError("React Root is null in timeout.", true); this._isRendering = false; return;}
            try {
                this._reactRoot.render(React.createElement(AstrolabeComponent, finalProps));
                console.log('[ZiweiChart] React render() successful for Astrolabe.');
            } catch (error) { 
                console.error('[ZiweiChart] EXCEPTION during Astrolabe rendering:', error);
                this.renderError(`渲染命盤時發生錯誤: ${error.message}`); 
            }
            finally { this._isRendering = false; }
        }, 50);
    }
    
    renderPlaceholder(message) { /* ... (與你備份代碼中的邏輯相同) ... */ }
    renderError(message, isCritical = false) { /* ... (與你備份代碼中的邏輯相同) ... */ }

    // Setters and Getters - 確保 Velo 可以通過這些屬性來更新數據
    set birthData(value) {
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } 
            catch (e) { console.error('[ZiweiChart] Error parsing birthData string in setter:', e); this.renderError('生日數據格式錯誤。'); return; }
        }
        this._data = { ...this._data, birthData: parsedValue };
        console.log('[ZiweiChart] birthData setter invoked:', this._data.birthData);
        if (this._isMounted) { this.renderChartFromAttributes(true); }
    }
    get birthData() { return this._data?.birthData; }

    set chartOptions(value) {
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } 
            catch (e) { console.warn('[ZiweiChart] Error parsing chartOptions string in setter:', e); /* 不一定是致命錯誤 */ }
        }
        this._data = { ...this._data, chartOptions: parsedValue };
        console.log('[ZiweiChart] chartOptions setter invoked:', this._data.chartOptions);
        if (this._isMounted) { this.renderChartFromAttributes(true); }
    }
    get chartOptions() { return this._data?.chartOptions; }
}

// --- Define Custom Element ---
console.log('[ZiweiChart CE SCRIPT] Class ZiweiChart defined. Attempting customElements.define...');
if (customElements && typeof customElements.get === 'function' && !customElements.get('ziwei-chart')) {
    try {
        customElements.define('ziwei-chart', ZiweiChart);
        console.log('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" DEFINED SUCCESSFULLY.');
    } catch (e) {
        console.error('[ZiweiChart CE SCRIPT] CRITICAL ERROR defining custom element "ziwei-chart":', e);
    }
} else {
    if(customElements && customElements.get('ziwei-chart')) {
        console.warn('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" was ALREADY DEFINED.');
    } else {
         console.error('[ZiweiChart CE SCRIPT] customElements API not fully available.');
    }
}
console.log('[ZiweiChart CE SCRIPT] Top-level script execution FINISHED.');