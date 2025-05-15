// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro';

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
console.log('[ZiweiChart CE SCRIPT] Typeof iztro (imported via * as iztro):', typeof iztro);

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
  --iztro-color-border: #00152912;
  --iztro-color-decadal: var(--iztro-color-active);
  --iztro-color-yearly: var(--iztro-color-decorator-2);
  --iztro-color-monthly: var(--iztro-color-nice);
  --iztro-color-daily: var(--iztro-color-decorator-1);
  --iztro-color-hourly: var(--iztro-color-text);
}
.iztro-astrolabe { text-align: left; }
.iztro-palace { border: 1px solid var(--iztro-color-border); }
.iztro-star-soft, .iztro-star-tough, .iztro-star-adjective, .iztro-star-flower, .iztro-star-helper, .iztro-palace-fate, .iztro-palace-horo-star, .iztro-palace-scope, .iztro-palace-dynamic-name, .iztro-palace-lft24, .iztro-palace-rgt24 {
  font-size: var(--iztro-star-font-size-small);
  font-weight: normal;
  text-wrap: nowrap;
}
.iztro-palace-scope-age { text-wrap: balance; }
.iztro-palace-scope-age, .iztro-palace-scope-decadal { color: var(--iztro-color-text); }
.iztro-palace-lft24 { color: var(--iztro-color-decorator-1); }
.iztro-palace-rgt24 { color: var(--iztro-color-decorator-2); text-wrap: nowrap; }
.iztro-star-major, .iztro-star-tianma, .iztro-star-lucun, .iztro-palace-name, .iztro-palace-gz {
  font-size: var(--iztro-star-font-size-big);
  font-weight: bold;
}
.iztro-star-tianma { color: var(--iztro-color-active); }
.iztro-star-lucun { color: var(--iztro-color-awesome); }
.iztro-palace-horo-star .iztro-star { opacity: 0.75; }
.iztro-palace-horo-star .iztro-star-tianma, .iztro-palace-horo-star .iztro-star-lucun {
  font-weight: normal;
  font-size: var(--iztro-star-font-size-small);
}
.iztro-star-brightness, .iztro-star-adjective {
  font-style: normal;
  font-weight: normal;
  color: var(--iztro-color-text);
}
.iztro-star-brightness { opacity: 0.5; }
.iztro-star-major, .iztro-star-soft, .iztro-palace-name { color: var(--iztro-color-major); }
.iztro-star-tough { color: var(--iztro-color-tough); }
.iztro-star-flower { color: var(--iztro-color-happy); }
.iztro-star-helper, .iztro-palace-gz { color: var(--iztro-color-nice); }
.iztro-star-mutagen.mutagen-0 { background-color: var(--iztro-color-awesome); }
.iztro-star-mutagen.mutagen-1 { background-color: var(--iztro-color-quan); }
.iztro-star-mutagen.mutagen-2 { background-color: var(--iztro-color-nice); }
.iztro-star-mutagen.mutagen-3 { background-color: var(--iztro-color-focus); }
.iztro-star-mutagen.mutagen-decadal { background-color: var(--iztro-color-decadal); opacity: 0.6; }
.iztro-star-mutagen.mutagen-yearly { background-color: var(--iztro-color-yearly); opacity: 0.6; }
.iztro-star-mutagen.mutagen-monthly { background-color: var(--iztro-color-monthly); opacity: 0.6; }
.iztro-star-mutagen.mutagen-daily { background-color: var(--iztro-color-daily); opacity: 0.6; }
.iztro-star-mutagen.mutagen-hourly { background-color: var(--iztro-color-hourly); opacity: 0.6; }
.iztro-palace-gz .iztro-palace-gz-active {
  background-color: var(--iztro-color-nice);
  color: #fff;
  font-weight: normal;
}
.iztro-star-mutagen-0 { background-color: var(--iztro-color-awesome); color: #fff; font-weight: normal; }
.iztro-star-mutagen-1 { background-color: var(--iztro-color-quan); color: #fff; font-weight: normal; }
.iztro-star-mutagen-2 { background-color: var(--iztro-color-nice); color: #fff; font-weight: normal; }
.iztro-star-mutagen-3 { background-color: var(--iztro-color-focus); color: #fff; font-weight: normal; }
.iztro-star-self-mutagen-0::before { background-color: var(--iztro-color-awesome); }
.iztro-star-self-mutagen-1::before { background-color: var(--iztro-color-quan); }
.iztro-star-self-mutagen-2::before { background-color: var(--iztro-color-nice); }
.iztro-star-self-mutagen-3::before { background-color: var(--iztro-color-focus); }
.iztro-star-hover-mutagen-0::after { background-color: var(--iztro-color-awesome); }
.iztro-star-hover-mutagen-1::after { background-color: var(--iztro-color-quan); }
.iztro-star-hover-mutagen-2::after { background-color: var(--iztro-color-nice); }
.iztro-star-hover-mutagen-3::after { background-color: var(--iztro-color-focus); }
.iztro-palace-name-body {
  font-size: var(--iztro-star-font-size-small);
  font-weight: normal;
  position: absolute;
  margin-top: 2px;
}
.iztro-palace-fate span {
  display: block;
  padding: 0 3px;
  border-radius: 4px;
  color: #fff;
  background-color: var(--iztro-color-major);
  cursor: pointer;
}
.iztro-palace-center-item {
  font-size: var(--iztro-star-font-size-small);
  line-height: 22px;
}
.iztro-palace-center-item label { color: var(--iztro-color-text); }
.iztro-palace-center-item span { color: var(--iztro-color-decorator-1); }
.gender { display: inline-block; margin-right: 5px; }
.gender.gender-male { color: var(--iztro-color-quan); }
.gender.gender-female { color: var(--iztro-color-happy); }
`;

const customChartStyles = `
  :host {
    --ziwei-font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Heiti TC", "LiHei Pro", "微軟正黑體", "蘋果儷中黑", sans-serif;
    --ziwei-font-size-base: 12px;
    --ziwei-line-height-base: 1.3;
    --ziwei-color-text-main: #424242;
    --ziwei-color-text-secondary: #757575;
    --ziwei-color-brand: #673AB7;
    --ziwei-color-border-palace: #E0E0E0;
    --ziwei-color-border-chart: #BDBDBD;
    --ziwei-color-bg-chart: #ffffff;
    --ziwei-color-bg-palace: rgba(250, 250, 250, 0.5);
    --ziwei-color-bg-center: rgba(245, 245, 245, 0.8);
    --ziwei-chart-shadow: 0 3px 10px rgba(0,0,0,0.12);
    --ziwei-palace-min-height: 120px;
    --ziwei-palace-padding: 5px 8px;

    font-family: var(--ziwei-font-family);
    font-size: var(--ziwei-font-size-base);
    line-height: var(--ziwei-line-height-base);
    color: var(--ziwei-color-text-main);
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  .iztro-astrolabe-theme-default {
    --iztro-star-font-size-big: 13px;
    --iztro-star-font-size-small: 10px;
    --iztro-color-major: var(--ziwei-color-brand);
    --iztro-color-focus: #D32F2F;
    --iztro-color-quan: #1976D2;
    --iztro-color-tough: #6D4C41;
    --iztro-color-awesome: #FF8F00;
    --iztro-color-active: #FB8C00;
    --iztro-color-happy: #D81B60;
    --iztro-color-nice: #388E3C;
    --iztro-color-decorator-1: var(--ziwei-color-text-secondary);
    --iztro-color-decorator-2: #9E9E9E;
    --iztro-color-text: var(--ziwei-color-text-main);
    --iztro-color-border: var(--ziwei-color-border-palace);
    --iztro-color-decadal: var(--iztro-color-major); 
    --iztro-color-yearly: #0288D1;    
    --iztro-color-monthly: #4CAF50;   
    --iztro-color-daily: #FFC107;     
    --iztro-color-hourly: var(--ziwei-color-text-secondary);
  }

  .iztro-astrolabe {
    display: grid;
    grid-template-columns: repeat(4, minmax(90px, 1fr));
    grid-template-rows: repeat(4, minmax(var(--ziwei-palace-min-height), auto));
    width: 100%;
    max-width: 880px;
    margin: 10px auto;
    border: 1px solid var(--ziwei-color-border-chart);
    background-color: var(--ziwei-color-bg-chart);
    box-shadow: var(--ziwei-chart-shadow);
    border-radius: 6px;
    overflow: hidden;
  }

  .iztro-palace {
    border: 1px solid var(--iztro-color-border);
    margin: -1px 0 0 -1px; 
    padding: var(--ziwei-palace-padding);
    box-sizing: border-box;
    min-height: var(--ziwei-palace-min-height);
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(--ziwei-color-bg-palace);
    line-height: var(--ziwei-line-height-base);
  }

  /* 宮位定位 (grid-area) - 假設 react-iztro 使用 data-palace-idx 且順序如下 */
  /* 您必須使用開發者工具驗證實際的 idx 和順序，並相應調整 grid-area */
  .iztro-palace[data-palace-idx="6"]  { grid-area: 1 / 1 / 2 / 2; } /* 遷移 (Top-Left) */
  .iztro-palace[data-palace-idx="7"]  { grid-area: 1 / 2 / 2 / 3; } /* 僕役 */
  .iztro-palace[data-palace-idx="8"]  { grid-area: 1 / 3 / 2 / 4; } /* 官祿 */
  .iztro-palace[data-palace-idx="9"]  { grid-area: 1 / 4 / 2 / 5; } /* 田宅 (Top-Right) */

  .iztro-palace[data-palace-idx="5"]  { grid-area: 2 / 1 / 3 / 2; } /* 疾厄 (Mid-Left) */
  /* Center Area will be 2 / 2 / 4 / 4 */
  .iztro-palace[data-palace-idx="10"] { grid-area: 2 / 4 / 3 / 5; } /* 福德 (Mid-Right) */

  .iztro-palace[data-palace-idx="4"]  { grid-area: 3 / 1 / 4 / 2; } /* 財帛 (Lower-Left) */
  .iztro-palace[data-palace-idx="11"] { grid-area: 3 / 4 / 4 / 5; } /* 父母 (Lower-Right) */

  .iztro-palace[data-palace-idx="3"]  { grid-area: 4 / 1 / 5 / 2; } /* 子女 (Bottom-Left) */
  .iztro-palace[data-palace-idx="2"]  { grid-area: 4 / 2 / 5 / 3; } /* 夫妻 */
  .iztro-palace[data-palace-idx="1"]  { grid-area: 4 / 3 / 5 / 4; } /* 兄弟 */
  .iztro-palace[data-palace-idx="0"]  { grid-area: 4 / 4 / 5 / 5; } /* 命宮 (Bottom-Right) */

  /* 備選方案: 如果 react-iztro 使用 data-palace-name="命宮" 等 */
  /* .iztro-palace[data-palace-name="遷移宮"] { grid-area: 1 / 1 / 2 / 2; } ... etc. */

  .iztro-astrolabe > .iztro-palace-center {
    grid-area: 2 / 2 / 4 / 4;
    border: 1px solid var(--iztro-color-border);
    margin: -1px 0 0 -1px; 
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    background-color: var(--ziwei-color-bg-center); 
    box-sizing: border-box;
  }

  .iztro-palace-name {
    font-size: calc(var(--iztro-star-font-size-big) + 1px);
    font-weight: 500; 
    color: var(--iztro-color-major);
    text-align: left; 
    padding-bottom: 3px;
    border-bottom: 1px solid var(--ziwei-color-border-palace);
    margin-bottom: 4px;
    line-height: 1.2;
  }
  
  .iztro-palace-gz {
    font-size: calc(var(--iztro-star-font-size-small) - 1px);
    color: var(--iztro-color-decorator-1);
    text-align: right; 
    width: 100%;
    margin-top: auto;
    padding-top: 3px;
    line-height: 1.2;
  }
  
  .iztro-palace-stars-group,
  .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate) {
    flex-grow: 1;
    text-align: left;
    overflow-y: auto;
    max-height: 65px;
    padding: 2px 0;
    line-height: 1.4;
    scrollbar-width: thin;
    scrollbar-color: var(--ziwei-color-text-secondary) transparent;
  }
  .iztro-palace-stars-group::-webkit-scrollbar,
  .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate)::-webkit-scrollbar {
    width: 4px;
  }
  .iztro-palace-stars-group::-webkit-scrollbar-thumb,
  .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate)::-webkit-scrollbar-thumb {
    background-color: var(--ziwei-color-text-secondary);
    border-radius: 2px;
  }

  .iztro-star {
    display: inline;
    margin-right: 5px;
    white-space: nowrap;
  }

  .iztro-star-major { font-weight: 500; }

  .iztro-star-doctor, .iztro-star-博士, .iztro-star-力士, .iztro-star-青龍,
  .iztro-star-adjective { 
    font-size: calc(var(--iztro-star-font-size-small) - 2px);
    color: var(--iztro-color-decorator-1); 
    opacity: 0.9;
  }

  .iztro-star-brightness {
    font-size: calc(var(--iztro-star-font-size-small) - 2px);
    color: var(--iztro-color-text);
    margin-left: 2px;
    font-style: normal;
    opacity: 0.65;
    font-weight: 300;
  }

  .iztro-star-mutagen {
    display: inline-block;
    color: #fff !important;
    font-size: calc(var(--iztro-star-font-size-small) - 2px);
    font-weight: normal;
    padding: 1px 4px; 
    border-radius: 3px;
    margin-left: 2px;
    line-height: 1; 
    vertical-align: middle;
  }

  .iztro-palace-scope {
    font-size: calc(var(--iztro-star-font-size-small) - 1px);
    text-align: left;
    margin-top: 4px;
    padding-top: 3px;
    border-top: 1px dashed var(--ziwei-color-border-palace);
    line-height: 1.3;
  }
  .iztro-palace-scope span {
    display: block; 
    margin-bottom: 1px;
    white-space: nowrap;
  }
  .iztro-palace-scope-age { 
      color: var(--iztro-color-text) !important; 
      font-size: calc(var(--iztro-star-font-size-small) - 2px); 
      opacity: 0.8;
  }

  .iztro-palace-fate {
    position: absolute;
    top: var(--ziwei-palace-padding);
    right: var(--ziwei-palace-padding);
    font-size: calc(var(--iztro-star-font-size-small) - 1px);
    z-index: 1; 
  }
  .iztro-palace-fate span {
    display: inline-block;
    padding: 2px 5px;
    border-radius: 3px;
    color: #fff;
    background-color: var(--iztro-color-major);
    margin-left: 3px;
  }

  .iztro-palace-center-item {
    font-size: calc(var(--ziwei-font-size-base) - 1px);
    line-height: 1.8;
    margin-bottom: 6px;
    text-align: left;
    width: 100%;
    max-width: 350px;
  }
  .iztro-palace-center-item label {
    color: var(--ziwei-color-text-secondary);
    margin-right: 8px;
    display: inline-block;
    min-width: 70px;
    font-weight: 500;
  }
  .iztro-palace-center-item span {
    color: var(--iztro-color-major); 
    font-weight: 400;
  }
  .iztro-palace-center-item .gender.gender-male { color: var(--iztro-color-quan); font-weight: bold; }
  .iztro-palace-center-item .gender.gender-female { color: var(--iztro-color-happy); font-weight: bold; }

  @media (max-width: 880px) {
    :host { 
        --ziwei-palace-min-height: 110px; 
        --ziwei-font-size-base: 11px;
    }
    .iztro-astrolabe {
      grid-template-columns: repeat(4, minmax(80px, 1fr));
      max-width: 100%;
      margin: 5px auto;
      border-radius: 0;
    }
    .iztro-palace-center-item { font-size: 10px; line-height: 1.7; }
    .iztro-palace-name { font-size: 12px;}
    .iztro-astrolabe-theme-default {
        --iztro-star-font-size-big: 12px;
        --iztro-star-font-size-small: 9px;
    }
    .iztro-palace-stars-group,
    .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate) { 
        max-height: 55px; 
    }
  }

  @media (max-width: 600px) {
    :host { 
        --ziwei-palace-min-height: auto;
        --ziwei-font-size-base: 10px; 
        --ziwei-palace-padding: 4px 6px;
    }
    .iztro-astrolabe {
      display: flex; 
      flex-direction: column;
      border: none;
      box-shadow: none;
      margin: 0;
    }
    .iztro-palace, 
    .iztro-astrolabe > .iztro-palace-center {
      width: 100%; 
      margin: 0 0 1px 0;
      min-height: var(--ziwei-palace-min-height);
      order: 0 !important;
      grid-area: auto !important;
      border-left: none;
      border-right: none;
      border-radius: 0;
      border-top: 1px solid var(--ziwei-color-border-chart); 
    }
    .iztro-astrolabe > *:first-child { border-top: none; }
    .iztro-astrolabe > *:last-child { border-bottom: none; }

    .iztro-palace-stars-group,
    .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate) {
      max-height: none;
      overflow-y: visible;
    }
    .iztro-palace-name, .iztro-palace-gz {
      text-align: left;
    }
    .iztro-astrolabe > .iztro-palace-center {
      order: -1;
      margin-bottom: 5px;
      padding: 10px;
    }
    
    .iztro-astrolabe-theme-default {
        --iztro-star-font-size-big: 11px;
        --iztro-star-font-size-small: 9px;
    }
    .iztro-palace-name { font-size: 11px; }
    .iztro-palace-center-item { font-size: 10px; }
    .iztro-palace-center-item label { min-width: 60px; }
  }
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

        this.shadowRoot.innerHTML = `
            <style id="ziwei-dynamic-styles">
                /* CSS will be injected here */
            </style>
            <div id="chart-render-target" class="chart-wrapper-inside-shadow-dom">
                <div class="message-display-in-shadow loading-message-in-shadow">命盤組件初始化中...</div>
            </div>
        `;
        console.log('[ZiweiChart INSTANCE] constructor: Initial Shadow DOM HTML set.');
        this._reactRoot = null;
        this._currentConfigString = null;
        this._currentThemeOverride = null;
        this._isRendering = false;
    }

    _injectStyles() {
        const styleElement = this.shadowRoot.getElementById('ziwei-dynamic-styles');
        if (!styleElement) {
            console.error("[ZiweiChart INSTANCE] _injectStyles: Critical - #ziwei-dynamic-styles element not found in Shadow DOM!");
            return;
        }

        let combinedCSS = `
            :host { 
                display: block; 
                width: 100%; 
                padding: 0; 
                box-sizing: border-box;
                --color-html-bg: #f0f2f5;
            }
            .chart-wrapper-inside-shadow-dom { 
                width: 100%; 
                display: flex; 
                justify-content: center;
                align-items: flex-start; 
                padding: 0; 
                box-sizing: border-box; 
                background-color: var(--color-html-bg, #f0f2f5);
            }
            .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; }
            .loading-message-in-shadow { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
            .error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
        `;
        
        combinedCSS += antdResetCSS;
        combinedCSS += reactIztroDefaultCSS;
        combinedCSS += customChartStyles;

        if (this._currentThemeOverride) {
            console.log("[ZiweiChart INSTANCE] _injectStyles: Applying theme-override CSS.");
            combinedCSS += this._currentThemeOverride;
        }
        
        styleElement.textContent = combinedCSS;
        console.log("[ZiweiChart INSTANCE] _injectStyles: All styles injected/updated in #ziwei-dynamic-styles.");
    }
    
    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED.');
        this._injectStyles();

        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        if (!renderTarget) {
            console.error('[ZiweiChart INSTANCE] connectedCallback: CRITICAL - #chart-render-target NOT FOUND in Shadow DOM.');
            this.shadowRoot.innerHTML = `<style>.error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; }</style><div class="error-message-in-shadow">內部渲染目標丟失！組件無法初始化。</div>`;
            return;
        }

        if (!this._reactRoot) { 
            if (ReactDOM && ReactDOM.createRoot) {
                this._reactRoot = ReactDOM.createRoot(renderTarget);
                console.log('[ZiweiChart INSTANCE] connectedCallback: React root CREATED.');
            } else {
                console.error('[ZiweiChart INSTANCE] connectedCallback: ReactDOM.createRoot is UNDEFINED. React might not be loaded correctly.');
                this.renderError('React 環境錯誤 (createRoot undefined)。', true);
                return;
            }
        } else {
            console.log('[ZiweiChart INSTANCE] connectedCallback: React root already exists.');
        }
        
        const initialConfig = this.getAttribute('data-config');
        const initialThemeOverride = this.getAttribute('theme-override');

        if (initialThemeOverride && initialThemeOverride !== this._currentThemeOverride) {
            console.log('[ZiweiChart INSTANCE] connectedCallback: Initial theme-override found, applying styles.');
            this._currentThemeOverride = initialThemeOverride;
            this._injectStyles();
        }

        if (initialConfig) {
            console.log('[ZiweiChart INSTANCE] connectedCallback: Initial data-config found, preparing to parse and render.');
            Promise.resolve().then(() => this._parseAndRender(initialConfig));
        } else {
            this.renderPlaceholder("等待命盤數據配置 (connected)...");
        }
        console.log('[ZiweiChart INSTANCE] connectedCallback FINISHED.');
    }

    disconnectedCallback() { 
        console.log('[ZiweiChart INSTANCE] disconnectedCallback CALLED.');
        if (this._reactRoot && typeof this._reactRoot.unmount === 'function') {
            try {
                this._reactRoot.unmount();
                console.log('[ZiweiChart INSTANCE] disconnectedCallback: React root unmounted successfully.');
            } catch (e) {
                console.error('[ZiweiChart INSTANCE] disconnectedCallback: Error during React root unmount:', e);
            }
        }
        this._reactRoot = null;
        this._currentConfigString = null;
        this._isRendering = false;
        console.log('[ZiweiChart INSTANCE] disconnectedCallback: _reactRoot and config state reset.');
    }

    attributeChangedCallback(name, oldValue, newValue) { 
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback: Attribute '${name}' changed.`);

        if (name === 'theme-override') {
            if (newValue !== this._currentThemeOverride) {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: theme-override changed. Updating styles.');
                this._currentThemeOverride = newValue;
                this._injectStyles();

                if (this._currentConfigString && this._reactRoot) {
                    console.log('[ZiweiChart INSTANCE] attributeChangedCallback: Forcing re-render due to theme change with existing config.');
                    const tempConfig = this._currentConfigString;
                    this._currentConfigString = null; 
                     Promise.resolve().then(() => this._parseAndRender(tempConfig));
                }
            }
            return; 
        }

        if (name === 'data-config') {
            if (newValue === this._currentConfigString) {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config value is the same as current. Skipping re-render.');
                return;
            }
            
            if (!this._reactRoot) { 
                console.warn('[ZiweiChart INSTANCE] attributeChangedCallback: React root not ready for data-config. Render will be handled by connectedCallback or later update.');
                return; 
            }

            if (newValue === null || newValue === undefined) {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config removed. Clearing chart.');
                this.renderPlaceholder("命盤配置已移除。");
                this._currentConfigString = null;
            } else {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config has new value. Preparing to parse and render.');
                 Promise.resolve().then(() => this._parseAndRender(newValue));
            }
        }
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback for '${name}' FINISHED.`);
    }

    _parseAndRender(configString) { 
        console.log('[ZiweiChart INSTANCE] _parseAndRender CALLED.');
        
        if (this._isRendering && configString === this._currentConfigString) {
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: Skipped. Already rendering this exact config or in progress.');
            return;
        }
        this._isRendering = true;
        this._currentConfigString = configString;

        if (!this._reactRoot) {
            console.error('[ZiweiChart INSTANCE] _parseAndRender: React root is unexpectedly null. Attempting to re-initialize (fallback).');
            const renderTarget = this.shadowRoot.getElementById('chart-render-target');
            if (renderTarget && ReactDOM && ReactDOM.createRoot) {
                this._reactRoot = ReactDOM.createRoot(renderTarget);
                console.log('[ZiweiChart INSTANCE] _parseAndRender: React root RE-CREATED (fallback).');
            } else {
                this.renderError('配置解析前，渲染引擎初始化失敗。', true);
                this._isRendering = false;
                return;
            }
        }

        if (!configString) {
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: configString is empty/null. Clearing display.');
            this.renderError('命盤配置數據為空。');
            this._isRendering = false; 
            return;
        }

        try {
            const config = JSON.parse(configString);
            console.log('[ZiweiChart INSTANCE] _parseAndRender: Parsed config:', config);

            if (config && typeof config === 'object' && config.type === 'RENDER_CHART' && config.payload && typeof config.payload === 'object') {
                console.log('[ZiweiChart INSTANCE] _parseAndRender: Valid config structure. Proceeding to render Astrolabe.');
                this._renderAstrolabeWithReact(config.payload);
            } else {
                console.warn('[ZiweiChart INSTANCE] _parseAndRender: Invalid config structure or missing/invalid payload.', config);
                this.renderError('命盤配置格式無效或缺少必須的 payload 數據。');
                 this._isRendering = false; // Set flag if error before async call
            }
        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _parseAndRender: ERROR parsing JSON config:', error);
            this.renderError(`解析命盤配置時發生錯誤: ${error.message}`);
            this._isRendering = false; // Set flag on error
        }
        // Note: _isRendering is set to false within _renderAstrolabeWithReact's final block or its error handlers
        console.log('[ZiweiChart INSTANCE] _parseAndRender FINISHED initial processing.');
    }
    
    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact CALLED with payload.');

        if (!this._reactRoot) {
            this.renderError('無法渲染命盤：React渲染核心丟失。', true);
            this._isRendering = false;
            return;
        }

        if (!payload || Object.keys(payload).length === 0) {
            console.warn('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Payload is empty or invalid.');
            this.renderError('命盤核心數據 (payload) 為空或無效。');
            this._isRendering = false;
            return;
        }

        // ***** CRITICAL FIX: Use Iztrolabe (I大寫) based on your logs *****
        const AstrolabeComponentToUse = iztro.Iztrolabe; 
        
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Using AstrolabeComponentToUse (expected: iztro.Iztrolabe). Type:', typeof AstrolabeComponentToUse);

        if (typeof AstrolabeComponentToUse === 'undefined') {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: CRITICAL - AstrolabeComponentToUse (iztro.Iztrolabe) is UNDEFINED!');
            this.renderError('命盤核心組件 (iztro.Iztrolabe) 未能正確載入。');
            this._isRendering = false;
            return;
        }
        
        const { 
            birthDate, 
            birthTime, 
            gender,    
            solar = true, 
            lang = 'zh-CN', 
            fixLeap = false, 
            options: payloadOptions = {} 
        } = payload;

        if (!birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
            this.renderError(`出生日期格式錯誤: "${birthDate}". 應為 YYYY-MM-DD。`);
            this._isRendering = false; return;
        }
        const iztroBirthTimeNum = parseInt(birthTime, 10);
        if (isNaN(iztroBirthTimeNum) || iztroBirthTimeNum < 0 || iztroBirthTimeNum > 23) {
            this.renderError(`時辰數據錯誤: "${birthTime}". 必須是 0 到 23 之間的數字。`);
            this._isRendering = false; return;
        }
        if (gender !== 'M' && gender !== 'F') {
            this.renderError(`性別數據錯誤: "${gender}". 必須是 "M" 或 "F"。`);
            this._isRendering = false; return;
        }

        const chartDataProps = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang, 
            fixedLeap: fixLeap,
        };
        
        const iztroComponentOptions = {
             theme: 'default',
             // Add other react-iztro options here if needed, based on its documentation
             // e.g., showDecadalScope: true, etc.
             ...payloadOptions,
        };

        // In react-iztro, options are often passed directly, not nested under an 'options' key
        // unless the component specifically expects that.
        // The backup code passed props directly. Let's stick to that structure.
        const finalProps = { ...chartDataProps, ...iztroComponentOptions }; // Spread options directly

        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final props for Iztrolabe:', JSON.stringify(finalProps));
        this.renderPlaceholder("正在生成命盤，請稍候...");

        setTimeout(() => {
            if (!this._reactRoot) {
                console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact (timeout): _reactRoot became null before rendering!');
                this.renderError('渲染命盤前 React Root 丟失 (timeout)。', true);
                this._isRendering = false;
                return;
            }
            try {
                const astrolabeElement = React.createElement(AstrolabeComponentToUse, finalProps);
                if (!astrolabeElement) {
                     console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact (timeout): React.createElement returned null/undefined.');
                     this.renderError('無法創建命盤圖表實例 (createElement failed)。');
                     this._isRendering = false;
                     return;
                }
                this._reactRoot.render(astrolabeElement);
                console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact (timeout): React render() call executed. Chart should be visible.');
            } catch (renderError) {
                console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact (timeout): >>> EXCEPTION during React rendering <<<');
                console.error('  Error Name:', renderError.name);
                console.error('  Error Message:', renderError.message);
                if (renderError.stack) console.error('  Error Stack:', renderError.stack);
                this.renderError(`渲染命盤時發生內部錯誤: ${renderError.message}.`);
            } finally {
                this._isRendering = false;
                console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact (timeout): Rendering process finished.');
            }
        }, 50);
    }
    
    renderPlaceholder(message) { 
        console.log(`[ZiweiChart INSTANCE] renderPlaceholder: "${message}"`);
        if (!this._reactRoot) {
            const renderTarget = this.shadowRoot.getElementById('chart-render-target');
            if (renderTarget) {
                renderTarget.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React root unavailable)</div>`;
            }
            console.warn('[ZiweiChart INSTANCE] renderPlaceholder: _reactRoot is null. Message displayed via innerHTML.');
            return;
        }
        try { 
            const key = `placeholder-${Date.now()}`;
            this._reactRoot.render(React.createElement('div', { key, className: 'message-display-in-shadow loading-message-in-shadow' }, message)); 
        } catch (e) { 
            console.error('[ZiweiChart INSTANCE] renderPlaceholder: Error rendering placeholder with React:', e);
            const renderTarget = this.shadowRoot.getElementById('chart-render-target');
            if(renderTarget) renderTarget.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React error: ${e.message})</div>`;
        }
    }

    renderError(message, isCritical = false) { 
        console.error(`[ZiweiChart INSTANCE] renderError: "${message}" (Critical: ${isCritical})`);
        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        
        if (!this._reactRoot && !isCritical) {
             if (renderTarget) {
                renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React root unavailable)</div>`;
            }
            console.warn('[ZiweiChart INSTANCE] renderError: _reactRoot is null (non-critical). Error displayed via innerHTML.');
            return;
        }
        
        if (!renderTarget && isCritical) {
            this.shadowRoot.innerHTML = `<style>.error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; }</style><div class="message-display-in-shadow error-message-in-shadow">FATAL: ${message} (No render target in Shadow DOM)</div>`;
            console.error("Critical error rendered directly to Shadow DOM root due to missing target.");
            return;
        }

        if (this._reactRoot && !isCritical) { 
            try { 
                const key = `error-${Date.now()}`;
                this._reactRoot.render(React.createElement('div', { key, className: 'message-display-in-shadow error-message-in-shadow' }, message)); 
            } catch (e) { 
                 console.error('[ZiweiChart INSTANCE] renderError: Error rendering error message with React:', e);
                 if(renderTarget) renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React error: ${e.message})</div>`;
            }
        } else if (renderTarget) {
            renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} ${isCritical ? '(Critical Error)' : '(React Root Issue)'}</div>`; 
            if (isCritical) console.error("Critical error rendered directly to HTML target due to React root issue or criticality.");
        }
    }
}

// --- Define Custom Element ---
console.log('[ZiweiChart CE SCRIPT] Class ZiweiChart defined. Attempting customElements.define...');
if (customElements && typeof customElements.get === 'function' && !customElements.get('ziwei-chart')) {
    try {
        customElements.define('ziwei-chart', ZiweiChart);
        console.log('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" DEFINED SUCCESSFULLY.');
    } catch (e) {
        console.error('[ZiweiChart CE SCRIPT] CRITICAL ERROR defining custom element "ziwei-chart":', e);
        const errorDiv = document.createElement('div');
        errorDiv.textContent = `Failed to define ziwei-chart: ${e.message}. Check console.`;
        errorDiv.style.color = 'red'; errorDiv.style.padding = '10px'; errorDiv.style.border = '1px solid red';
        document.body.prepend(errorDiv);
    }
} else {
    if(customElements && customElements.get('ziwei-chart')) {
        console.warn('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" was ALREADY DEFINED. This might happen with HMR or multiple script loads.');
    } else {
         console.error('[ZiweiChart CE SCRIPT] customElements API not fully available. Cannot define "ziwei-chart".');
    }
}
console.log('[ZiweiChart CE SCRIPT] Top-level script execution FINISHED.');