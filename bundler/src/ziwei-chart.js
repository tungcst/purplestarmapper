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
    font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Heiti TC", sans-serif; /* 中文字體優先 */
    font-size: 12px; /* 基礎字號 */
    line-height: 1.5;
    color: #333;
  }

  .iztro-astrolabe-theme-default {
    --iztro-star-font-size-big: 13px;
    --iztro-star-font-size-small: 11px;
    --iztro-color-major: #531dab; /* 主星 - 紫色 */
    --iztro-color-focus: #000000; /* 化忌 - 黑色 */
    --iztro-color-quan: #2f54eb;  /* 化權 - 藍色 */
    --iztro-color-tough: #754600; /* 煞星 - 深咖啡 */
    --iztro-color-awesome: #d4380d; /* 祿存/天馬等 - 橘紅 */
    --iztro-color-active: #1890ff; /* 天馬/特殊標記 - 亮藍 */
    --iztro-color-happy: #c41d7f; /* 桃花星 - 桃紅 */
    --iztro-color-nice: #237804;  /* 化科/吉星 - 綠色 */
    --iztro-color-decorator-1: #8c8c8c; /* 輔助文字/干支 */
    --iztro-color-decorator-2: #bfbfbf; /* 更淡的輔助文字 */
    --iztro-color-text: #595959; /* 一般內文 */
    --iztro-color-border: #d9d9d9; /* 邊框 */

    /* 流運顏色 */
    --iztro-color-decadal: var(--iztro-color-major); /* 大限 - 紫色 */
    --iztro-color-yearly: var(--iztro-color-nice);   /* 流年 - 綠色 */
    --iztro-color-monthly: var(--iztro-color-active); /* 流月 - 亮藍 */
    --iztro-color-daily: var(--iztro-color-awesome); /* 流日 - 橘紅 */
    --iztro-color-hourly: var(--iztro-color-text);  /* 流時 - 灰色 */
  }

  .iztro-astrolabe {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 調整 grid-template-rows 以適應內容，中央區域可能不需要特別大的固定空間 */
    grid-template-rows: auto auto auto; /* 簡化為三行，高度由內容決定 */
    border: 1px solid var(--iztro-color-border);
    width: 100%;
    max-width: 800px; /* 設定一個最大寬度，避免過寬 */
    margin: auto; /* 置中 */
    background-color: #fff;
  }

  .iztro-palace {
    border: 1px solid var(--iztro-color-border);
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 讓宮名和干支上下分布 */
    min-height: 130px; /* 基礎宮位高度，可依實際內容調整 */
    position: relative;
    overflow: hidden; /* 避免內容溢出宮格 */
  }

  /* 宮位在 Grid 中的位置，您需要根據 react-iztro 的實際輸出調整這些選擇器 */
  /* 假設 react-iztro 會為每個宮位加上 data-palace-name="宮位名" 或 data-palace-idx="數字索引" */
  /* 順時針，右下角為命宮 (idx 0, 假設) */
  .iztro-palace[data-palace-idx="0"], .iztro-palace[data-palace-name="命宮"] { grid-column: 4 / 5; grid-row: 3 / 4; }
  .iztro-palace[data-palace-idx="1"], .iztro-palace[data-palace-name="兄弟"] { grid-column: 3 / 4; grid-row: 3 / 4; }
  .iztro-palace[data-palace-idx="2"], .iztro-palace[data-palace-name="夫妻"] { grid-column: 2 / 3; grid-row: 3 / 4; }
  .iztro-palace[data-palace-idx="3"], .iztro-palace[data-palace-name="子女"] { grid-column: 1 / 2; grid-row: 3 / 4; }
  .iztro-palace[data-palace-idx="4"], .iztro-palace[data-palace-name="財帛"] { grid-column: 1 / 2; grid-row: 2 / 3; }
  .iztro-palace[data-palace-idx="5"], .iztro-palace[data-palace-name="疾厄"] { grid-column: 1 / 2; grid-row: 1 / 2; }
  .iztro-palace[data-palace-idx="6"], .iztro-palace[data-palace-name="遷移"] { grid-column: 2 / 3; grid-row: 1 / 2; }
  .iztro-palace[data-palace-idx="7"], .iztro-palace[data-palace-name="僕役"], .iztro-palace[data-palace-name="交友"] { grid-column: 3 / 4; grid-row: 1 / 2; }
  .iztro-palace[data-palace-idx="8"], .iztro-palace[data-palace-name="官祿"], .iztro-palace[data-palace-name="事業"] { grid-column: 4 / 5; grid-row: 1 / 2; }
  .iztro-palace[data-palace-idx="9"], .iztro-palace[data-palace-name="田宅"] { grid-column: 4 / 5; grid-row: 2 / 3; }
  .iztro-palace[data-palace-idx="10"],.iztro-palace[data-palace-name="福德"] { grid-column: 3 / 4; grid-row: 2 / 3; }
  .iztro-palace[data-palace-idx="11"],.iztro-palace[data-palace-name="父母"] { grid-column: 2 / 3; grid-row: 2 / 3; }
  
  /* 中央區域 - 如果 react-iztro 單獨生成此區域 */
  .iztro-palace-center { 
    grid-column: 2 / 4; /* 佔據中間兩列 */
    grid-row: 2 / 3;    /* 佔據中間一行 */
    /* 如果 iztro-palace-center 不是一個宮位，而是獨立的div，則需要調整 grid-template-rows */
    /* 例如：grid-template-rows: auto 1fr auto; 讓中間行可以擴展 */
    border: 1px solid var(--iztro-color-border);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f9f9f9;
    min-height: 130px; /* 與其他宮位高度一致或更高 */
  }

  .iztro-palace-name {
    font-size: 15px; /* 調整宮名大小 */
    font-weight: bold;
    color: var(--iztro-color-major);
    text-align: center;
    padding-bottom: 2px; /* 宮名下方留點空間 */
    /* margin-bottom: auto; */ /* 移除，讓flexbox自然分配 */
  }
  
  .iztro-palace-gz { /* 宮干支 */
    font-size: 10px; /* 調整干支大小 */
    color: var(--iztro-color-decorator-1);
    text-align: right;
    width: 100%; 
    padding-top: 2px; /* 干支上方留點空間 */
    /* margin-top: auto; */ /* 移除 */
  }
  
  .iztro-palace-stars-container { /* 宮內星曜的容器 */
    flex-grow: 1; 
    display: flex;
    flex-direction: column; /* 星曜垂直排列 */
    align-items: flex-start; /* 星曜靠左對齊 */
    padding: 2px 0;
    text-align: left;
    overflow-y: auto; 
    max-height: 70px; /* 限制星曜區域最大高度，超出則滾動 */
  }

  .iztro-star {
    display: flex; 
    align-items: baseline;
    margin-bottom: 0px; /* 減少星之間的垂直間距 */
    white-space: nowrap; 
    line-height: 1.3; /* 調整行高 */
  }

  .iztro-star-name {
    /* 星名本身，如果 react-iztro 的結構是 <div class="iztro-star"><span class="iztro-star-name">天機</span>...</div> */
  }

  .iztro-star-major .iztro-star-name,
  .iztro-star-major { 
    font-size: var(--iztro-star-font-size-big);
    font-weight: bold;
    color: var(--iztro-color-major);
    margin-right: 2px;
  }
  .iztro-star-tianma .iztro-star-name,
  .iztro-star-tianma {
    color: var(--iztro-color-active);
    font-weight: bold;
    margin-right: 2px;
  }
  .iztro-star-lucun .iztro-star-name,
  .iztro-star-lucun {
    color: var(--iztro-color-awesome);
    font-weight: bold;
    margin-right: 2px;
  }

  .iztro-star-soft .iztro-star-name, .iztro-star-soft,
  .iztro-star-helper .iztro-star-name, .iztro-star-helper,
  .iztro-star-adjective .iztro-star-name, .iztro-star-adjective {
    font-size: var(--iztro-star-font-size-small);
    color: var(--iztro-color-nice); 
    margin-right: 2px;
  }
  .iztro-star-tough .iztro-star-name, .iztro-star-tough {
    font-size: var(--iztro-star-font-size-small);
    color: var(--iztro-color-tough); 
    margin-right: 2px;
  }
  .iztro-star-flower .iztro-star-name, .iztro-star-flower {
    font-size: var(--iztro-star-font-size-small);
    color: var(--iztro-color-happy); 
    margin-right: 2px;
  }

  .iztro-star-brightness {
    font-size: 9px;
    color: var(--iztro-color-text);
    margin-left: 1px; /* 星名和亮度之間的間隔 */
    opacity: 0.8;
    font-style: normal;
    line-height: 1; /* 避免影響flex對齊 */
  }

  .iztro-star-mutagen {
    display: inline-block;
    color: #fff !important; 
    font-size: 9px;
    font-weight: normal;
    padding: 0px 3px;
    border-radius: 2px;
    margin-left: 2px;
    line-height: 1; /* 調整行高以更好地對齊 */
    vertical-align: baseline; /* 嘗試對齊 */
  }
  .iztro-star-mutagen.mutagen-0 { background-color: var(--iztro-color-awesome); } 
  .iztro-star-mutagen.mutagen-1 { background-color: var(--iztro-color-quan); }    
  .iztro-star-mutagen.mutagen-2 { background-color: var(--iztro-color-nice); }    
  .iztro-star-mutagen.mutagen-3 { background-color: var(--iztro-color-focus); }   

  .iztro-palace-scope {
    font-size: 10px;
    color: var(--iztro-color-decorator-1);
    text-align: left; 
    position: absolute; 
    bottom: 18px; /* 調整位置，給干支留出空間 */
    left: 3px;
    width: calc(100% - 6px); 
  }
  .iztro-palace-scope span { 
    display: block; 
    margin-bottom: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .iztro-palace-scope .scope-decadal, .iztro-palace-scope [class*="decadal"], /* 匹配包含 decadal 的 class */
  .iztro-palace-scope .scope-大限 {
    color: var(--iztro-color-decadal) !important; /* 使用 !important 增強優先級 */
    font-weight: bold;
  }
  .iztro-palace-scope .scope-yearly, .iztro-palace-scope [class*="yearly"],
  .iztro-palace-scope .scope-流年 {
    color: var(--iztro-color-yearly) !important;
  }
   .iztro-palace-scope .scope-monthly, .iztro-palace-scope [class*="monthly"] {
    color: var(--iztro-color-monthly) !important;
  }
  .iztro-palace-scope .scope-daily, .iztro-palace-scope [class*="daily"] {
    color: var(--iztro-color-daily) !important;
  }
  .iztro-palace-scope .scope-hourly, .iztro-palace-scope [class*="hourly"] {
    color: var(--iztro-color-hourly) !important;
  }
  .iztro-palace-scope-age { 
     color: var(--iztro-color-text) !important;
  }

  .iztro-palace-fate {
    position: absolute;
    top: 3px;
    left: 3px;
    font-size: 10px;
    z-index: 1; /* 確保在其他內容之上 */
  }
  .iztro-palace-fate span {
    display: inline-block; 
    padding: 1px 4px;
    border-radius: 3px;
    color: #fff;
    background-color: var(--iztro-color-major); 
    margin-right: 3px;
  }

  .iztro-palace-center-item {
    font-size: 11px;
    line-height: 1.6;
    margin-bottom: 3px;
    width: 100%;
    text-align: left; 
  }
  .iztro-palace-center-item label {
    color: var(--iztro-color-text);
    margin-right: 5px;
    display: inline-block;
    min-width: 60px; 
  }
  .iztro-palace-center-item span {
    color: var(--iztro-color-major);
    font-weight: normal;
  }
  .gender { display: inline-block; margin-right: 5px; }
  .gender.gender-male { color: var(--iztro-color-quan); }
  .gender.gender-female { color: var(--iztro-color-happy); }

  /* 針對圖片中右下角童限、流年等深色背景條塊的樣式 */
  /* 需要 react-iztro 生成類似 <div class="iztro-palace-bottom-scopes">...</div> 的結構 */
  .iztro-palace-bottom-scopes {
    position: absolute;
    bottom: 20px; /* 調整使其位於干支之上 */
    left: 3px;
    right: 3px;
    display: flex;
    flex-direction: column;
    gap: 2px; /* 條塊之間的間隙 */
  }
  .iztro-palace-bottom-scopes .scope-item {
    color: white;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 10px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .iztro-palace-bottom-scopes .scope-item.decadal,
  .iztro-palace-bottom-scopes .scope-item.童限 { background-color: var(--iztro-color-decadal); }
  .iztro-palace-bottom-scopes .scope-item.yearly,
  .iztro-palace-bottom-scopes .scope-item.流年 { background-color: var(--iztro-color-yearly); }
  .iztro-palace-bottom-scopes .scope-item.monthly,
  .iztro-palace-bottom-scopes .scope-item.流月 { background-color: var(--iztro-color-monthly); }
  .iztro-palace-bottom-scopes .scope-item.daily,
  .iztro-palace-bottom-scopes .scope-item.流日 { background-color: var(--iztro-color-daily); }
  .iztro-palace-bottom-scopes .scope-item.hourly,
  .iztro-palace-bottom-scopes .scope-item.流時 { background-color: var(--iztro-color-hourly); }
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
                    /* min-height is removed as content will define height */
                    /* border: 3px solid deeppink; */ /* Debug border */
                    padding: 0; 
                    box-sizing: border-box; 
                }
                ${antdResetCSS}
                ${reactIztroDefaultCSS}
                ${customChartStyles} /* Custom styles integrated here */

                .chart-wrapper-inside-shadow-dom { 
                    width: 100%; 
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
            if (renderTarget && ReactDOM.createRoot) {
                console.log('[ZiweiChart INSTANCE] React Root was null, attempting to (re)create it in _ensureReactRoot.');
                this._reactRoot = ReactDOM.createRoot(renderTarget);
                if (!this._reactRoot) {
                    console.error('[ZiweiChart INSTANCE] Failed to (re)create React Root in _ensureReactRoot.');
                    return false;
                }
                console.log('[ZiweiChart INSTANCE] React Root (re)created successfully in _ensureReactRoot.');
            } else {
                console.error('[ZiweiChart INSTANCE] Cannot (re)create React Root: no target or ReactDOM.createRoot in _ensureReactRoot.');
                return false;
            }
        }
        return true;
    }

    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED.');
        // Ensure React root is created here if not already (e.g. if attributeChangedCallback ran first)
        if (!this._ensureReactRoot()) {
             this.renderError('React 環境初始化失敗 (connectedCallback)。');
             return;
        }
        
        const initialConfig = this.getAttribute('data-config');
        if (initialConfig) {
            console.log('[ZiweiChart INSTANCE] connectedCallback: Initial data-config FOUND, processing...');
            this._parseAndRender(initialConfig);
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
        this._reactRoot = null; // Explicitly set to null
    }

    attributeChangedCallback(name, oldValue, newValue) { 
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback CALLED for attribute: ${name}`);
        if (name === 'data-config') {
            // Ensure React root is ready before parsing/rendering
            if (!this._ensureReactRoot()) {
                console.warn('[ZiweiChart INSTANCE] attributeChangedCallback: React root not ready, deferring processing of data-config.');
                // Optionally, store newValue and process it in connectedCallback or a later point
                return;
            }

            if (newValue === null || newValue === undefined) {
                this.renderPlaceholder("命盤配置已移除 (attrChanged).");
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
        if (this._isRendering) {
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: Already rendering, skipping.');
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
            this.renderError('配置為空。');
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
                this.renderError('配置格式無效。');
            }
        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _parseAndRender: ERROR parsing JSON:', error);
            this.renderError(`解析配置錯誤: ${error.message}`);
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

        // ... (檢查 iztro 物件的日誌可以保留或移除) ...

        if (!payload) { /* ... */ return; }

        const AstrolabeComponentToUse = iztro.Iztrolabe; 

        if (typeof AstrolabeComponentToUse === 'undefined') { /* ... */ return; }
        
        const { birthDate, birthTime, gender, solar, lang, fixLeap, minute, palaces } = payload; // 假設 palaces 可能也從 payload 傳入
        const iztroBirthTimeNum = parseInt(birthTime, 10);

        if (isNaN(iztroBirthTimeNum)) { /* ... */ return; }

        // 核心命盤數據 Props
        const chartDataProps = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-CN'),
            fixLeap: fixLeap === true, // 確保是布林值
            // minute: typeof minute === 'number' ? minute : undefined, // 如果有分鐘
            // palaces: palaces, // 如果 react-iztro 允許傳入預先計算好的宮位數據
        };
        
        // react-iztro 的顯示選項 Props (您需要查閱 react-iztro 文件來確定可用的選項)
        const chartDisplayOptions = {
             theme: 'default', // 使用 'default' 並透過 CSS 上書き
             // showFullAstrolabe: true, // 假設有這個選項
             // showPalaceName: true,
             // showStars: true,
             // showMutagens: true,
             // showBrightness: true,
             // showFiveElementsClass: true, // 顯示五行局
             // showChineseDate: true, // 顯示農曆日期
             // clickable: false, // 是否可點擊宮位
             // highlightCurrentScope: true, // 是否高亮當前大限/流年等
             // scopeDisplayStyle: 'bar', // 假設有選項可以控制流運顯示為條狀
        };

        // 最終傳給 Iztrolabe 組件的 props
        // react-iztro 可能期望所有 props 直接攤平，或者將顯示選項放在一個 options 物件內
        // const finalProps = { ...chartDataProps, ...chartDisplayOptions }; // 攤平
        const finalProps = { ...chartDataProps, options: chartDisplayOptions }; // 或者用 options 包裹

        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final props for Astrolabe:', JSON.stringify(finalProps));

        try {
            const astrolabeElement = React.createElement(AstrolabeComponentToUse, finalProps);
            if (!astrolabeElement) { /* ... */ return; }
            this._reactRoot.render(astrolabeElement);
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React render() call executed. THE CHART SHOULD NOW BE VISIBLE!');
        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: >>> EXCEPTION during React rendering <<<');
            console.error('  Error Name:', error.name);
            console.error('  Error Message:', error.message);
            if (error.stack) console.error('  Error Stack:', error.stack);
            this.renderError(`渲染命盤時發生內部錯誤: ${error.message}.`);
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact FINISHED.');
    }

    renderPlaceholder(message) { 
        console.log(`[ZiweiChart INSTANCE] renderPlaceholder CALLED. Message: "${message}"`);
        if (!this._ensureReactRoot() && !this.shadowRoot.getElementById('chart-render-target')) {
            // Fallback if root and target are gone (very unlikely now with _ensureReactRoot)
             this.shadowRoot.innerHTML = `<div id="chart-render-target" class="chart-wrapper-inside-shadow-dom"><div class="message-display-in-shadow loading-message-in-shadow">${message} (No target)</div></div>`;
            return;
        }
        const target = this.shadowRoot.getElementById('chart-render-target'); // Re-get target just in case

        if (this._reactRoot) { 
            try { 
                this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message)); 
            } catch (e) { 
                if(target) target.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React err for placeholder)</div>`;
            }
        } else if (target) { 
            target.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (No React root for placeholder)</div>`; 
        }
    }

    renderError(message, isCritical = false) { 
        console.error(`[ZiweiChart INSTANCE] renderError CALLED. Message: "${message}", isCritical: ${isCritical}`);
         if (!this._ensureReactRoot() && !this.shadowRoot.getElementById('chart-render-target') && isCritical) {
            this.shadowRoot.innerHTML = `<div id="chart-render-target" class="chart-wrapper-inside-shadow-dom"><div class="message-display-in-shadow error-message-in-shadow">FATAL: ${message}</div></div>`;
            return;
        }
        const target = this.shadowRoot.getElementById('chart-render-target');

        if (this._reactRoot && !isCritical) { 
            try { 
                this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message)); 
            } catch (e) { 
                 if(target) target.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React err for error msg)</div>`;
            }
        } else if (target) { 
            target.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (No React root or critical for error msg)</div>`; 
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