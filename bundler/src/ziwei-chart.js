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

// --- 針對圖一/圖二風格調整的 customChartStyles ---
const customChartStyles = `
  :host {
    font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Heiti TC", "LiHei Pro", "微軟正黑體", "蘋果儷中黑", sans-serif;
    font-size: 12px; 
    line-height: 1.3; 
    color: var(--color-text-main, #424242); /* 優先使用外部傳入的 --color-text-main，若無則用預設 */
    display: block;
    width: 100%;
  }

  .iztro-astrolabe-theme-default {
    /* 覆寫或定義 CSS 變數，參考圖一/圖二風格 */
    --iztro-star-font-size-big: 13px;
    --iztro-star-font-size-small: 10px;
    
    /* 主要色調參考圖二，但可微調 */
    --iztro-color-major: var(--color-brand, #673AB7); /* 宮名、主星等，嘗試繼承外部品牌色 */
    --iztro-color-focus: #D32F2F;       /* 化忌 (改為紅色，更醒目) */
    --iztro-color-quan: #1976D2;        /* 化權 (藍色) */
    --iztro-color-tough: #6D4C41;       /* 煞星 (咖啡色) */
    --iztro-color-awesome: #FF6F00;     /* 化祿、祿存 (橘黃色) */
    --iztro-color-active: #EF6C00;      /* 天馬 (橘色) */
    --iztro-color-happy: #C2185B;       /* 桃花星 (桃紅色) */
    --iztro-color-nice: #388E3C;        /* 化科、吉星 (綠色) */
    
    --iztro-color-decorator-1: var(--color-text-main, #616161); /* 干支、輔助文字 */
    --iztro-color-decorator-2: var(--color-divider, #BDBDBD);   /* 更淡的輔助文字、邊框 */
    --iztro-color-text: var(--color-text-main, #424242);        /* 一般內文 */
    --iztro-color-border: var(--color-divider, #E0E0E0);      /* 宮位邊框 */

    --iztro-color-decadal: var(--iztro-color-major); 
    --iztro-color-yearly: #0277BD;    
    --iztro-color-monthly: #388E3C;   
    --iztro-color-daily: #EF6C00;     
    --iztro-color-hourly: var(--iztro-color-text);
  }

  .iztro-astrolabe {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr)); /* 使用 minmax 確保彈性 */
    grid-template-rows: repeat(3, auto) 1fr repeat(3, auto); /* 讓中間行可以彈性擴展 */
    width: 100%;
    max-width: 800px; /* 可以根據您的頁面調整 */
    margin: 0 auto;
    border: 1px solid var(--iztro-color-border);
    background-color: var(--color-bg, #fff);
    box-shadow: var(--container-shadow, 0 2px 8px rgba(0,0,0,0.1)); /* 添加一點陰影 */
  }

  .iztro-palace {
    border: 1px solid var(--iztro-color-border);
    padding: 4px 6px; 
    box-sizing: border-box;
    min-height: 115px; /* 確保宮位有足夠高度 */
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden; 
    background-color: var(--color-bg-panel, rgba(255, 255, 255, 0.03)); /* 宮位背景，輕微透明感 */
  }

  /* 宮位定位 (此處假設 react-iztro 提供了 data-idx 或 data-palace-name) */
  /* 您需要根據實際情況調整這些選擇器 */
  .iztro-palace[data-palace-idx="0"], .iztro-palace[data-palace-name="命宮"] { grid-area: 4 / 4 / 5 / 5; }
  .iztro-palace[data-palace-idx="1"], .iztro-palace[data-palace-name="兄弟宮"] { grid-area: 4 / 3 / 5 / 4; }
  .iztro-palace[data-palace-idx="2"], .iztro-palace[data-palace-name="夫妻宮"] { grid-area: 4 / 2 / 5 / 3; }
  .iztro-palace[data-palace-idx="3"], .iztro-palace[data-palace-name="子女宮"] { grid-area: 4 / 1 / 5 / 2; }
  .iztro-palace[data-palace-idx="4"], .iztro-palace[data-palace-name="財帛宮"] { grid-area: 3 / 1 / 4 / 2; }
  .iztro-palace[data-palace-idx="5"], .iztro-palace[data-palace-name="疾厄宮"] { grid-area: 2 / 1 / 3 / 2; }
  .iztro-palace[data-palace-idx="6"], .iztro-palace[data-palace-name="遷移宮"] { grid-area: 1 / 1 / 2 / 2; }
  .iztro-palace[data-palace-idx="7"], .iztro-palace[data-palace-name="僕役宮"], .iztro-palace[data-palace-name="交友宮"] { grid-area: 1 / 2 / 2 / 3; }
  .iztro-palace[data-palace-idx="8"], .iztro-palace[data-palace-name="官祿宮"], .iztro-palace[data-palace-name="事業宮"] { grid-area: 1 / 3 / 2 / 4; }
  .iztro-palace[data-palace-idx="9"], .iztro-palace[data-palace-name="田宅宮"] { grid-area: 1 / 4 / 2 / 5; }
  .iztro-palace[data-palace-idx="10"],.iztro-palace[data-palace-name="福德宮"] { grid-area: 2 / 4 / 3 / 5; }
  .iztro-palace[data-palace-idx="11"],.iztro-palace[data-palace-name="父母宮"] { grid-area: 3 / 4 / 4 / 5; }
  
  .iztro-palace-center-container, /* 假設中央區域有此包裹 class */
  .iztro-astrolabe > .iztro-palace-center /* 或者直接是 .iztro-palace-center */ {
    grid-area: 2 / 2 / 4 / 4; 
    border: 1px solid var(--iztro-color-border);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around; 
    text-align: center;
    background-color: var(--color-bg-panel, rgba(245, 245, 245, 0.5)); 
  }

  .iztro-palace-name {
    font-size: 13px; 
    font-weight: 500; /* 圖二風格較細 */
    color: var(--iztro-color-major);
    text-align: left; /* 圖二宮名靠左 */
    width: 100%;
    padding-left: 3px;
    margin-bottom: 3px;
  }
  
  .iztro-palace-gz { 
    font-size: 10px;
    color: var(--iztro-color-decorator-1);
    text-align: right; 
    width: 100%;
    margin-top: auto; /* 將干支推到底部 */
    padding-right: 3px;
    padding-bottom: 1px;
  }
  
  .iztro-palace-stars-container { 
    flex-grow: 1;
    text-align: left; 
    overflow-y: auto;
    max-height: 55px; /* 略微減小，為流運留空間 */
    line-height: 1.35;
    padding: 2px 0;
  }

  .iztro-star {
    display: inline; 
    margin-right: 4px;
    white-space: nowrap;
  }

  .iztro-star-major { color: var(--iztro-color-major); font-weight: 500; font-size:var(--iztro-star-font-size-big); }
  .iztro-star-soft, .iztro-star-helper { color: var(--iztro-color-nice); font-size:var(--iztro-star-font-size-small); }
  .iztro-star-tough { color: var(--iztro-color-tough); font-size:var(--iztro-star-font-size-small); }
  .iztro-star-flower { color: var(--iztro-color-happy); font-size:var(--iztro-star-font-size-small); }
  .iztro-star-tianma { color: var(--iztro-color-active); font-weight:500; font-size:var(--iztro-star-font-size-small); }
  .iztro-star-lucun { color: var(--iztro-color-awesome); font-weight:500; font-size:var(--iztro-star-font-size-small); }
  .iztro-star-doctor, .iztro-star-academic, .iztro-star-authority, 
  .iztro-star-power, .iztro-star-general, .iztro-star-officer, /* 更多可能的雜曜 */
  .iztro-star-joyful, .iztro-star-auspicious { 
    font-size: 9px; 
    color: var(--iztro-color-decorator-1); 
  }

  .iztro-star-brightness {
    font-size: 9px;
    color: var(--iztro-color-text);
    margin-left: 1px;
    font-style: normal;
    opacity: 0.7;
    font-weight: 300;
  }

  .iztro-star-mutagen { 
    display: inline-block;
    color: #fff !important;
    font-size: 9px;
    font-weight: normal;
    padding: 0px 3px; 
    border-radius: 2px; /* 圓角減小一點 */
    margin-left: 2px;
    line-height: 1.1; 
    vertical-align: middle; 
  }
  .iztro-star-mutagen.mutagen-0 { background-color: var(--iztro-color-awesome); } 
  .iztro-star-mutagen.mutagen-1 { background-color: var(--iztro-color-quan); }    
  .iztro-star-mutagen.mutagen-2 { background-color: var(--iztro-color-nice); }    
  .iztro-star-mutagen.mutagen-3 { background-color: var(--iztro-color-focus); }   

  .iztro-palace-scope {
    font-size: 10px;
    text-align: left;
    margin-top: 2px; /* 星曜與流運的間隔 */
    line-height: 1.25;
  }
  .iztro-palace-scope span {
    display: block; 
    margin-bottom: 0px; /* 流運信息行間距更緊密 */
    white-space: nowrap;
  }
  .iztro-palace-scope .scope-decadal, .iztro-palace-scope [class*="decadal"] { color: var(--iztro-color-decadal) !important; font-weight: 500; }
  .iztro-palace-scope .scope-yearly, .iztro-palace-scope [class*="yearly"] { color: var(--iztro-color-yearly) !important; }
  .iztro-palace-scope .scope-monthly, .iztro-palace-scope [class*="monthly"] { color: var(--iztro-color-monthly) !important; }
  .iztro-palace-scope .scope-daily, .iztro-palace-scope [class*="daily"] { color: var(--iztro-color-daily) !important; }
  .iztro-palace-scope .scope-hourly, .iztro-palace-scope [class*="hourly"] { color: var(--iztro-color-hourly) !important; }
  .iztro-palace-scope-age { color: var(--iztro-color-text) !important; font-size: 9px; }


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
    border-radius: 2px;
    color: #fff;
    background-color: var(--iztro-color-major);
    margin-right: 2px;
  }

  /* 中央區域的詳細資訊 */
  .iztro-palace-center-item {
    font-size: 11px;
    line-height: 1.7; 
    margin-bottom: 4px;
    text-align: left;
    width: 100%;
    max-width: 320px; 
  }
  .iztro-palace-center-item label {
    color: var(--iztro-color-text);
    margin-right: 8px;
    display: inline-block;
    width: auto; 
    min-width: 70px; /* 標籤最小寬度 */
  }
  .iztro-palace-center-item span {
    color: var(--iztro-color-major);
    font-weight: 500;
  }
  .iztro-palace-center-item .gender { /* 讓性別更突出 */
      font-weight: bold;
  }

  .iztro-powered-by, .iztro-date-controller { 
    font-size: 10px;
    color: var(--iztro-color-decorator-1);
    margin-top: 10px;
  }
  .iztro-date-controller button {
    background: transparent;
    border: 1px solid var(--iztro-color-border);
    color: var(--iztro-color-text-main);
    padding: 4px 8px;
    margin: 0 3px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 10px;
  }
  .iztro-date-controller button:hover {
    border-color: var(--iztro-color-major);
    color: var(--iztro-color-major);
  }

  /* 回應式設計 */
  @media (max-width: 820px) { /* 斷點調整 */
    .iztro-astrolabe {
      /* 在中等螢幕下，嘗試保持 grid，但宮位可能需要調整 */
      grid-template-columns: repeat(3, 1fr); /* 改為三欄 */
      grid-template-rows: auto; /* 行數自動 */
      max-width: 600px;
    }
    /* 宮位定位需要重新計算 */
    /* 這裡僅為示例，您需要根據三欄佈局重新安排 grid-area */
    .iztro-palace[data-palace-idx="0"], .iztro-palace[data-palace-name="命宮"] { grid-area: auto; } /* 清除或重新指定 */
    /* ... 其他宮位也需要重新指定 grid-area for 3 columns ... */

    .iztro-palace-center-container,
    .iztro-astrolabe > .iztro-palace-center {
      grid-column: 1 / -1; /* 中央區域橫跨所有欄 */
      grid-row: auto;    /* 位置自動 */
      order: -1; /* 嘗試移到頂部 */
      margin-bottom: 10px;
    }
  }

  @media (max-width: 600px) { /* 小螢幕，完全垂直堆疊 */
    .iztro-astrolabe {
      display: flex; 
      flex-direction: column; 
      max-width: 100%; 
    }
    .iztro-palace, 
    .iztro-palace-center-container,
    .iztro-astrolabe > .iztro-palace-center {
      width: calc(100% - 4px); /* 減去左右邊框 */
      margin: 2px auto; 
      min-height: auto;
      order: 0 !important; /* 清除 order */
      grid-area: auto !important; /* 清除 grid area */
    }
    .iztro-palace-stars-container {
      max-height: none; 
    }
    .iztro-palace-name, .iztro-palace-gz {
      text-align: left; 
    }
    .iztro-palace-center-container,
    .iztro-astrolabe > .iztro-palace-center {
      margin-bottom: 10px;
    }
    :host { font-size: 11px; }
    .iztro-astrolabe-theme-default {
        --iztro-star-font-size-big: 12px;
        --iztro-star-font-size-small: 9px;
    }
    .iztro-palace-name { font-size: 12px; }
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
                    /* background-color: #f0f0f0; */ /* 改為繼承 :host 或外部 */
                    background-color: var(--color-html-bg, var(--color-bg, #f0f0f0));

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
            // palaces: palaces, // 如果您從後端傳遞排好的盤數據
        };
        
        const iztroComponentOptions = {
             theme: 'default', 
             showFullAstrolabe: true,    
             showPalaceName: true,       
             // showPalaceGrid: false, // 圖二風格宮格線不明顯，靠宮位自身邊框
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
             // controlPanel: true, // 假設有選項可以顯示圖二中央的控制面板
             // responsive: true, // 告知組件啟用內建的回應式調整 (如果有)
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