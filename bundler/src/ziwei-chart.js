// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro';

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
console.log('[ZiweiChart CE SCRIPT] Type of iztro (imported via * as iztro):', typeof iztro);

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
    console.log('[ZiweiChart CE SCRIPT] Direct check - typeof iztro.default:', typeof iztro.default);
    if (iztro.default && typeof iztro.default === 'object') {
        console.log('[ZiweiChart CE SCRIPT] Direct check - typeof iztro.default.Iztrolabe (I大寫):', typeof iztro.default.Iztrolabe);
        console.log('[ZiweiChart CE SCRIPT] Direct check - typeof iztro.default.Astrolabe (A大寫):', typeof iztro.default.Astrolabe);
    }
} else {
    console.warn('[ZiweiChart CE SCRIPT] Initial "iztro" object is not an object or is null.');
}

const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -ms-overflow-style: scrollbar; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;
const reactIztroDefaultCSS = `.iztro-astrolabe-theme-default { --iztro-star-font-size-big: 13px; --iztro-star-font-size-small: 12px; --iztro-color-major: #531dab; --iztro-color-focus: #000; --iztro-color-quan: #2f54eb; --iztro-color-tough: #612500; --iztro-color-awesome: #d4380d; --iztro-color-active: #1890ff; --iztro-color-happy: #c41d7f; --iztro-color-nice: #237804; --iztro-color-decorator-1: #90983c; --iztro-color-decorator-2: #813359; --iztro-color-text: #8c8c8c; --iztro-color-border: #00152912; --iztro-color-decadal: var(--iztro-color-active); --iztro-color-yearly: var(--iztro-color-decorator-2); --iztro-color-monthly: var(--iztro-color-nice); --iztro-color-daily: var(--iztro-color-decorator-1); --iztro-color-hourly: var(--iztro-color-text); } .iztro-astrolabe { text-align: left; } .iztro-palace { border: 1px solid var(--iztro-color-border); } .iztro-star-soft, .iztro-star-tough, .iztro-star-adjective, .iztro-star-flower, .iztro-star-helper, .iztro-palace-fate, .iztro-palace-horo-star, .iztro-palace-scope, .iztro-palace-dynamic-name, .iztro-palace-lft24, .iztro-palace-rgt24 { font-size: var(--iztro-star-font-size-small); font-weight: normal; text-wrap: nowrap; } .iztro-palace-scope-age { text-wrap: balance; } .iztro-palace-scope-age, .iztro-palace-scope-decadal { color: var(--iztro-color-text); } .iztro-palace-lft24 { color: var(--iztro-color-decorator-1); } .iztro-palace-rgt24 { color: var(--iztro-color-decorator-2); text-wrap: nowrap; } .iztro-star-major, .iztro-star-tianma, .iztro-star-lucun, .iztro-palace-name, .iztro-palace-gz { font-size: var(--iztro-star-font-size-big); font-weight: bold; } .iztro-star-tianma { color: var(--iztro-color-active); } .iztro-star-lucun { color: var(--iztro-color-awesome); } .iztro-palace-horo-star .iztro-star { opacity: 0.75; } .iztro-palace-horo-star .iztro-star-tianma, .iztro-palace-horo-star .iztro-star-lucun { font-weight: normal; font-size: var(--iztro-star-font-size-small); } .iztro-star-brightness, .iztro-star-adjective { font-style: normal; font-weight: normal; color: var(--iztro-color-text); } .iztro-star-brightness { opacity: 0.5; } .iztro-star-major, .iztro-star-soft, .iztro-palace-name { color: var(--iztro-color-major); } .iztro-star-tough { color: var(--iztro-color-tough); } .iztro-star-flower { color: var(--iztro-color-happy); } .iztro-star-helper, .iztro-palace-gz { color: var(--iztro-color-nice); } .iztro-star-mutagen.mutagen-0 { background-color: var(--iztro-color-awesome); } .iztro-star-mutagen.mutagen-1 { background-color: var(--iztro-color-quan); } .iztro-star-mutagen.mutagen-2 { background-color: var(--iztro-color-nice); } .iztro-star-mutagen.mutagen-3 { background-color: var(--iztro-color-focus); } .iztro-star-mutagen.mutagen-decadal { background-color: var(--iztro-color-decadal); opacity: 0.6; } .iztro-star-mutagen.mutagen-yearly { background-color: var(--iztro-color-yearly); opacity: 0.6; } .iztro-star-mutagen.mutagen-monthly { background-color: var(--iztro-color-monthly); opacity: 0.6; } .iztro-star-mutagen.mutagen-daily { background-color: var(--iztro-color-daily); opacity: 0.6; } .iztro-star-mutagen.mutagen-hourly { background-color: var(--iztro-color-hourly); opacity: 0.6; } .iztro-palace-gz .iztro-palace-gz-active { background-color: var(--iztro-color-nice); color: #fff; font-weight: normal; } .iztro-star-mutagen-0 { background-color: var(--iztro-color-awesome); color: #fff; font-weight: normal; } .iztro-star-mutagen-1 { background-color: var(--iztro-color-quan); color: #fff; font-weight: normal; } .iztro-star-mutagen-2 { background-color: var(--iztro-color-nice); color: #fff; font-weight: normal; } .iztro-star-mutagen-3 { background-color: var(--iztro-color-focus); color: #fff; font-weight: normal; } .iztro-star-self-mutagen-0::before { background-color: var(--iztro-color-awesome); } .iztro-star-self-mutagen-1::before { background-color: var(--iztro-color-quan); } .iztro-star-self-mutagen-2::before { background-color: var(--iztro-color-nice); } .iztro-star-self-mutagen-3::before { background-color: var(--iztro-color-focus); } .iztro-star-hover-mutagen-0::after { background-color: var(--iztro-color-awesome); } .iztro-star-hover-mutagen-1::after { background-color: var(--iztro-color-quan); } .iztro-star-hover-mutagen-2::after { background-color: var(--iztro-color-nice); } .iztro-star-hover-mutagen-3::after { background-color: var(--iztro-color-focus); } .iztro-palace-name-body { font-size: var(--iztro-star-font-size-small); font-weight: normal; position: absolute; margin-top: 2px; } .iztro-palace-fate span { display: block; padding: 0 3px; border-radius: 4px; color: #fff; background-color: var(--iztro-color-major); cursor: pointer; } .iztro-palace-center-item { font-size: var(--iztro-star-font-size-small); line-height: 22px; } .iztro-palace-center-item label { color: var(--iztro-color-text); } .iztro-palace-center-item span { color: var(--iztro-color-decorator-1); } .gender { display: inline-block; margin-right: 5px; } .gender.gender-male { color: var(--iztro-color-quan); } .gender.gender-female { color: var(--iztro-color-happy); }`;

const customChartStyles = `
  :host {
    font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Heiti TC", "LiHei Pro", "微軟正黑體", "蘋果儷中黑", sans-serif;
    font-size: 12px; 
    line-height: 1.3; 
    color: #333;
    display: block;
    width: 100%;
  }

  .iztro-astrolabe-theme-default {
    --iztro-star-font-size-big: 13px;
    --iztro-star-font-size-small: 10px;
    --iztro-color-major: #673AB7;
    --iztro-color-focus: #000000;
    --iztro-color-quan: #0D47A1;
    --iztro-color-tough: #5D4037;
    --iztro-color-awesome: #C62828;
    --iztro-color-active: #EF6C00;
    --iztro-color-happy: #D81B60;
    --iztro-color-nice: #2E7D32;
    --iztro-color-decorator-1: #616161;
    --iztro-color-decorator-2: #BDBDBD;
    --iztro-color-text: #424242;
    --iztro-color-border: #E0E0E0;
    --iztro-color-decadal: #673AB7;
    --iztro-color-yearly: #0277BD;
    --iztro-color-monthly: #2E7D32;
    --iztro-color-daily: #EF6C00;
    --iztro-color-hourly: var(--iztro-color-text);
  }

  .iztro-astrolabe {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto 1fr auto auto; /* 假設中央區域在第3行且可擴展 */
    width: 100%;
    max-width: 900px; 
    margin: 0 auto;
    border: 1px solid var(--iztro-color-decorator-2);
    background-color: #fff; 
  }

  .iztro-palace {
    border: 1px solid var(--iztro-color-border);
    padding: 3px 5px; 
    box-sizing: border-box;
    min-height: 110px; 
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden; 
  }

  /* 宮位定位 - 請根據 react-iztro 實際輸出的 class 或 data 屬性調整 */
  /* 優先使用 react-iztro 可能提供的 data-palace-idx 或 data-palace-name */
  .iztro-palace[data-palace-idx="0"], .iztro-palace[data-palace-name="命宮"] { grid-area: 4 / 4 / 5 / 5; }
  .iztro-palace[data-palace-idx="1"], .iztro-palace[data-palace-name="兄弟"] { grid-area: 4 / 3 / 5 / 4; }
  .iztro-palace[data-palace-idx="2"], .iztro-palace[data-palace-name="夫妻"] { grid-area: 4 / 2 / 5 / 3; }
  .iztro-palace[data-palace-idx="3"], .iztro-palace[data-palace-name="子女"] { grid-area: 4 / 1 / 5 / 2; }
  .iztro-palace[data-palace-idx="4"], .iztro-palace[data-palace-name="財帛"] { grid-area: 3 / 1 / 4 / 2; }
  .iztro-palace[data-palace-idx="5"], .iztro-palace[data-palace-name="疾厄"] { grid-area: 2 / 1 / 3 / 2; }
  .iztro-palace[data-palace-idx="6"], .iztro-palace[data-palace-name="遷移"] { grid-area: 1 / 1 / 2 / 2; }
  .iztro-palace[data-palace-idx="7"], .iztro-palace[data-palace-name="僕役"], .iztro-palace[data-palace-name="交友"] { grid-area: 1 / 2 / 2 / 3; }
  .iztro-palace[data-palace-idx="8"], .iztro-palace[data-palace-name="官祿"], .iztro-palace[data-palace-name="事業"] { grid-area: 1 / 3 / 2 / 4; }
  .iztro-palace[data-palace-idx="9"], .iztro-palace[data-palace-name="田宅"] { grid-area: 1 / 4 / 2 / 5; }
  .iztro-palace[data-palace-idx="10"],.iztro-palace[data-palace-name="福德"] { grid-area: 2 / 4 / 3 / 5; }
  .iztro-palace[data-palace-idx="11"],.iztro-palace[data-palace-name="父母"] { grid-area: 3 / 4 / 4 / 5; }
  
  /* 中央區域 */
  .iztro-palace-center, 
  .iztro-astrolabe > div.iztro-palace-center-container /* 假設 react-iztro 為中央區域生成一個特定容器 */ {
    grid-area: 2 / 2 / 4 / 4; 
    border: 1px solid var(--iztro-color-border);
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    text-align: center;
    background-color: #f9f9f9; 
  }

  .iztro-palace-name {
    font-size: 14px; 
    font-weight: bold;
    color: var(--iztro-color-major);
    text-align: right; 
    width: 100%;
    margin-bottom: 2px;
  }
  
  .iztro-palace-gz { 
    font-size: 10px;
    color: var(--iztro-color-decorator-1);
    text-align: right; 
    width: 100%;
    margin-top: auto; 
  }
  
  .iztro-palace-stars-container { 
    flex-grow: 1;
    text-align: left; 
    overflow-y: auto;
    max-height: 60px; 
    padding-top: 2px;
  }

  .iztro-star {
    display: inline; 
    margin-right: 3px;
    white-space: nowrap;
    line-height: 1.4; 
  }

  .iztro-star-major { color: var(--iztro-color-major); font-weight: bold; font-size:var(--iztro-star-font-size-big); }
  .iztro-star-soft { color: var(--iztro-color-nice); font-size:var(--iztro-star-font-size-small); }
  .iztro-star-tough { color: var(--iztro-color-tough); font-size:var(--iztro-star-font-size-small); }
  .iztro-star-flower { color: var(--iztro-color-happy); font-size:var(--iztro-star-font-size-small); }
  .iztro-star-helper { color: var(--iztro-color-nice); font-size:var(--iztro-star-font-size-small); }
  .iztro-star-tianma { color: var(--iztro-color-active); font-weight:bold; font-size:var(--iztro-star-font-size-small); }
  .iztro-star-lucun { color: var(--iztro-color-awesome); font-weight:bold; font-size:var(--iztro-star-font-size-small); }
  .iztro-star-doctor, .iztro-star-academic, .iztro-star-authority { 
    font-size: 9px;
    color: #757575; 
  }

  .iztro-star-brightness {
    font-size: 9px;
    color: var(--iztro-color-text);
    margin-left: 1px;
    font-style: normal;
    opacity: 0.7;
  }

  .iztro-star-mutagen { 
    display: inline-block;
    color: #fff !important;
    font-size: 9px;
    font-weight: normal;
    padding: 0px 3px; 
    border-radius: 3px;
    margin-left: 2px;
    line-height: 1.1; 
    vertical-align: text-top; 
    position: relative; 
    top: -1px; 
  }
  .iztro-star-mutagen.mutagen-0 { background-color: var(--iztro-color-awesome); } 
  .iztro-star-mutagen.mutagen-1 { background-color: var(--iztro-color-quan); }    
  .iztro-star-mutagen.mutagen-2 { background-color: var(--iztro-color-nice); }    
  .iztro-star-mutagen.mutagen-3 { background-color: var(--iztro-color-focus); }   

  .iztro-palace-scope {
    font-size: 10px;
    text-align: left;
    margin-top: 3px;
    line-height: 1.2;
  }
  .iztro-palace-scope span {
    display: block; 
    margin-bottom: 1px;
    white-space: nowrap;
  }
  .iztro-palace-scope .scope-decadal, .iztro-palace-scope [class*="decadal"] { color: var(--iztro-color-decadal) !important; font-weight: bold; }
  .iztro-palace-scope .scope-yearly, .iztro-palace-scope [class*="yearly"] { color: var(--iztro-color-yearly) !important; }
  .iztro-palace-scope .scope-monthly, .iztro-palace-scope [class*="monthly"] { color: var(--iztro-color-monthly) !important; }
  .iztro-palace-scope .scope-daily, .iztro-palace-scope [class*="daily"] { color: var(--iztro-color-daily) !important; }
  .iztro-palace-scope .scope-hourly, .iztro-palace-scope [class*="hourly"] { color: var(--iztro-color-hourly) !important; }
  .iztro-palace-scope-age { color: var(--iztro-color-text) !important; }


  .iztro-palace-fate { 
    position: absolute;
    top: 3px;
    left: 3px;
    font-size: 9px;
    z-index: 1;
  }
  .iztro-palace-fate span {
    display: inline-block;
    padding: 1px 3px;
    border-radius: 3px;
    color: #fff;
    background-color: var(--iztro-color-major);
    margin-right: 2px;
  }

  .iztro-palace-center-item {
    font-size: 11px;
    line-height: 1.6;
    margin-bottom: 3px;
    text-align: left;
  }
  .iztro-palace-center-item label {
    color: var(--iztro-color-text);
    margin-right: 5px;
    display: inline-block;
    width: 70px; 
  }
  .iztro-palace-center-item span {
    color: var(--iztro-color-major);
  }

  @media (max-width: 768px) {
    .iztro-astrolabe {
      display: flex; 
      flex-direction: column; 
      grid-template-columns: 1fr; 
      grid-template-rows: auto;    
      max-width: 100%; 
    }
    .iztro-palace {
      min-height: auto; 
      margin-bottom: 8px; 
      width: 100% !important; 
    }
    .iztro-palace-stars-container {
      max-height: none; 
    }
    .iztro-palace-name, .iztro-palace-gz {
      text-align: left; 
    }
    .iztro-palace-center,
    .iztro-astrolabe > div.iztro-palace-center-container {
      order: -1; 
      margin-bottom: 10px;
      grid-area: auto; 
    }
    :host { font-size: 11px; }
    .iztro-astrolabe-theme-default {
        --iztro-star-font-size-big: 12px;
        --iztro-star-font-size-small: 9px;
    }
    .iztro-palace-name { font-size: 13px; }
  }
`;

class ZiweiChart extends HTMLElement {
    static get observedAttributes() {
        console.log('[ZiweiChart CLASS] static get observedAttributes CALLED');
        return ['data-config'];
    }

    constructor() {
        super();
        console.log('[ZiweiChart INSTANCE] constructor CALLED');
        this.attachShadow({ mode: 'open' });
        console.log('[ZiweiChart INSTANCE] constructor: Shadow DOM attached.');

        this.shadowRoot.innerHTML = `
            <style>
                :host { 
                    display: block; 
                    width: 100%; 
                    padding: 0; 
                    box-sizing: border-box; 
                }
                ${antdResetCSS}
                ${reactIztroDefaultCSS}
                ${customChartStyles} 

                .chart-wrapper-inside-shadow-dom { 
                    width: 100%; 
                    min-height: 500px; 
                    display: flex; 
                    justify-content: center;
                    align-items: flex-start; 
                    padding: 10px; 
                    box-sizing: border-box; 
                    background-color: #f0f0f0; 
                }
                .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; }
                .loading-message-in-shadow { background-color: #e9e9e9; color: #333; }
                .error-message-in-shadow { background-color: #ffebee; color: #c62828; border: 1px solid #c62828; }
            </style>
            <div id="chart-render-target" class="chart-wrapper-inside-shadow-dom">
                <div class="message-display-in-shadow loading-message-in-shadow">命盤組件初始化 (Constructor)...</div>
            </div>
        `;
        console.log('[ZiweiChart INSTANCE] constructor: Initial Shadow DOM HTML set.');
        this._reactRoot = null;
        this._currentConfigString = null;
        this._isRendering = false;
    }
    
    _ensureReactRoot() {
        if (!this._reactRoot) {
            const renderTarget = this.shadowRoot.getElementById('chart-render-target');
            if (renderTarget && ReactDOM.createRoot && !this._reactRoot) { 
                console.log('[ZiweiChart INSTANCE] _ensureReactRoot: React Root is null. Primary creation should be in connectedCallback.');
                return false; 
            } else if (!this._reactRoot) {
                console.error('[ZiweiChart INSTANCE] _ensureReactRoot: Cannot ensure React Root (renderTarget or ReactDOM.createRoot missing, or already null).');
                return false;
            }
        }
        return true;
    }

    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED.');
        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        if (!renderTarget) {
            console.error('[ZiweiChart INSTANCE] connectedCallback: CRITICAL - #chart-render-target NOT FOUND.');
            this.shadowRoot.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">內部渲染目標丟失！</div>`;
            return;
        }

        if (!this._reactRoot) { 
            if (ReactDOM.createRoot) {
                this._reactRoot = ReactDOM.createRoot(renderTarget);
                console.log('[ZiweiChart INSTANCE] connectedCallback: React root CREATED.');
            } else {
                console.error('[ZiweiChart INSTANCE] connectedCallback: ReactDOM.createRoot is UNDEFINED.');
                if (renderTarget) renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">React 環境錯誤 (createRoot)。</div>`;
                return;
            }
        } else {
            console.log('[ZiweiChart INSTANCE] connectedCallback: React root already exists.');
        }
        
        const initialConfig = this.getAttribute('data-config');
        if (initialConfig) {
            console.log('[ZiweiChart INSTANCE] connectedCallback: Initial data-config FOUND, processing...');
            if (this._reactRoot) {
                this._parseAndRender(initialConfig);
            } else {
                console.warn('[ZiweiChart INSTANCE] connectedCallback: _reactRoot not available for initialConfig. This should not happen if createRoot was successful.');
                this.renderPlaceholder("React Root 初始化異常...");
            }
        } else {
            this.renderPlaceholder("等待命盤數據 (connected)...");
        }
        console.log('[ZiweiChart INSTANCE] connectedCallback FINISHED.');
    }

    disconnectedCallback() { 
        console.log('[ZiweiChart INSTANCE] disconnectedCallback CALLED.');
        if (this._reactRoot && typeof this._reactRoot.unmount === 'function') {
            try {
                this._reactRoot.unmount();
                console.log('[ZiweiChart INSTANCE] disconnectedCallback: React root unmounted.');
            } catch (e) {
                console.error('[ZiweiChart INSTANCE] disconnectedCallback: Error during unmount:', e);
            }
        }
        this._reactRoot = null;
        console.log('[ZiweiChart INSTANCE] disconnectedCallback: _reactRoot set to null.');
    }

    attributeChangedCallback(name, oldValue, newValue) { 
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback CALLED for attribute: ${name}, oldValue: ${oldValue ? oldValue.substring(0,30) : oldValue}, newValue: ${newValue ? newValue.substring(0,30) : newValue}`);
        if (name === 'data-config') {
            if (!this._ensureReactRoot()) { 
                console.warn('[ZiweiChart INSTANCE] attributeChangedCallback: React root not ready. Deferring processing.');
                return; 
            }

            if (newValue === null || newValue === undefined) {
                if (this._reactRoot) { 
                    this.renderPlaceholder("命盤配置已移除 (attrChanged).");
                }
                this._currentConfigString = null;
            } else if (newValue !== this._currentConfigString) {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config has a NEW value. Processing...');
                this._parseAndRender(newValue);
            } else {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config value is the SAME. Skipping.');
            }
        }
        console.log('[ZiweiChart INSTANCE] attributeChangedCallback FINISHED.');
    }

    _parseAndRender(configString) { 
        console.log('[ZiweiChart INSTANCE] _parseAndRender CALLED. Config string (first 100):', configString ? configString.substring(0, 100) + '...' : 'null/undefined');
        if (this._isRendering && this._currentConfigString === configString) { 
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: Already rendering or same config, skipping.');
            return;
        }
        this._isRendering = true;
        this._currentConfigString = configString; 

        if (!this._ensureReactRoot()) { 
            this.renderError('配置解析前，渲染引擎初始化失敗。');
            this._isRendering = false;
            return;
        }

        if (!configString) {
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: configString is empty/null.');
            if (this._reactRoot) this.renderError('配置為空。');
            this._isRendering = false; return;
        }
        try {
            const config = JSON.parse(configString);
            console.log('[ZiweiChart INSTANCE] _parseAndRender: Parsed config:', config);
            if (config && config.type === 'RENDER_CHART' && config.payload) {
                console.log('[ZiweiChart INSTANCE] _parseAndRender: Valid config. Calling _renderAstrolabeWithReact.');
                this._renderAstrolabeWithReact(config.payload);
            } else {
                console.warn('[ZiweiChart INSTANCE] _parseAndRender: Invalid config structure.', config);
                if (this._reactRoot) this.renderError('配置格式無效。');
            }
        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _parseAndRender: ERROR parsing JSON:', error);
            if (this._reactRoot) this.renderError(`解析配置錯誤: ${error.message}`);
        }
        this._isRendering = false;
        console.log('[ZiweiChart INSTANCE] _parseAndRender FINISHED.');
    }
    
    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact CALLED. Payload:', JSON.stringify(payload));
        
        if (!this._ensureReactRoot()) {
            this.renderError('渲染命盤前，渲染引擎初始化失敗。', true);
            return;
        }

        if (!payload) {
            console.warn('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Payload is empty.');
            if (this._reactRoot) this.renderError('命盤核心數據 (payload) 為空。');
            return;
        }

        const AstrolabeComponentToUse = iztro.Iztrolabe; 
        if (typeof AstrolabeComponentToUse === 'undefined') {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: CRITICAL - AstrolabeComponentToUse (iztro.Iztrolabe) is UNDEFINED!');
            if (this._reactRoot) this.renderError('命盤核心組件未能正確獲取 (iztro.Iztrolabe undefined)。');
            return;
        }
        
        const { birthDate, birthTime, gender, solar, lang, fixLeap, palaces, options: payloadOptions } = payload;
        const iztroBirthTimeNum = parseInt(birthTime, 10);
        if (isNaN(iztroBirthTimeNum)) {
            console.error(`[ZiweiChart INSTANCE] _renderAstrolabeWithReact: birthTime "${birthTime}" is NaN.`);
            if (this._reactRoot) this.renderError(`時辰數據錯誤: "${birthTime}".`);
            return;
        }

        const chartDataProps = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-CN'),
            fixLeap: fixLeap === true,
            // palaces: palaces, 
        };
        
        const iztroComponentOptions = {
             theme: 'default', 
             showFullAstrolabe: true,    
             showPalaceName: true,       
             showPalaceGrid: true,       
             showStars: true,            
             showMutagens: true,         
             showBrightness: true,       
             showFiveElementsClass: true,
             showChineseDate: true,      
             showDecadalScope: true,     
             showYearlyScope: true,      
             showMonthlyScope: true,     
             showDailyScope: true,       
             showHourlyScope: false,     
             ...(payloadOptions || {}),
        };

        const finalProps = { ...chartDataProps, options: iztroComponentOptions };

        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final props for Astrolabe:', JSON.stringify(finalProps));

        try {
            if (!this._reactRoot) {
                 console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: _reactRoot became null before rendering!');
                 this.renderError('渲染前 React Root 丟失。', true);
                 return;
            }
            const astrolabeElement = React.createElement(AstrolabeComponentToUse, finalProps);
            if (!astrolabeElement) {
                 console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React.createElement returned null/undefined.');
                 if (this._reactRoot) this.renderError('無法創建命盤圖表實例。');
                 return;
            }
            this._reactRoot.render(astrolabeElement);
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React render() call executed. THE CHART SHOULD NOW BE VISIBLE!');
        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: >>> EXCEPTION during React rendering <<<');
            console.error('  Error Name:', error.name);
            console.error('  Error Message:', error.message);
            if (error.stack) console.error('  Error Stack:', error.stack);
            if (this._reactRoot) this.renderError(`渲染命盤時發生內部錯誤: ${error.message}.`);
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact FINISHED.');
    }
    
    renderPlaceholder(message) { 
        console.log(`[ZiweiChart INSTANCE] renderPlaceholder CALLED. Message: "${message}"`);
        if (!this._reactRoot) {
            const renderTarget = this.shadowRoot.getElementById('chart-render-target');
            if (renderTarget) {
                renderTarget.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React root not ready for placeholder)</div>`;
            }
            console.warn('[ZiweiChart INSTANCE] renderPlaceholder: _reactRoot is null.');
            return;
        }
        try { 
            this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message)); 
        } catch (e) { 
            const renderTarget = this.shadowRoot.getElementById('chart-render-target');
            if(renderTarget) renderTarget.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React err for placeholder: ${e.message})</div>`;
            console.error('[ZiweiChart INSTANCE] renderPlaceholder: Error rendering with React:', e);
        }
    }

    renderError(message, isCritical = false) { 
        console.error(`[ZiweiChart INSTANCE] renderError CALLED. Message: "${message}", isCritical: ${isCritical}`);
        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        if (!this._reactRoot && !isCritical) {
             if (renderTarget) {
                renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React root not ready for error)</div>`;
            }
            console.warn('[ZiweiChart INSTANCE] renderError: _reactRoot is null (non-critical).');
            return;
        }
        if (!renderTarget && isCritical) {
            this.shadowRoot.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">FATAL: ${message} (No render target)</div>`;
            return;
        }

        if (this._reactRoot && !isCritical) { 
            try { 
                this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message)); 
            } catch (e) { 
                 if(renderTarget) renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React err for error msg: ${e.message})</div>`;
                 console.error('[ZiweiChart INSTANCE] renderError: Error rendering with React (non-critical):', e);
            }
        } else if (renderTarget) { 
            renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} ${isCritical ? '(Critical)' : '(No React root)'}</div>`; 
            if (isCritical) console.error("Critical error rendered directly to HTML.");
        }
    }
}

console.log('[ZiweiChart CE SCRIPT] Class ZiweiChart defined. Attempting customElements.define...');
if (!customElements.get('ziwei-chart')) {
    try {
        customElements.define('ziwei-chart', ZiweiChart);
        console.log('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" DEFINED SUCCESSFULLY.');
    } catch (e) {
        console.error('[ZiweiChart CE SCRIPT] CRITICAL ERROR defining custom element "ziwei-chart":', e);
    }
} else {
    console.warn('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" was ALREADY DEFINED.');
}
console.log('[ZiweiChart CE SCRIPT] Top-level script execution FINISHED.');