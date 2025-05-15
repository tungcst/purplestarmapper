// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro'; // 保持您原來的 import 方式

// ... (您頂部的 console.log 維持不變) ...

const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -ms-overflow-style: scrollbar; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;

// reactIztroDefaultCSS 保持原樣，因為 customChartStyles 會覆寫它
const reactIztroDefaultCSS = `.iztro-astrolabe-theme-default { --iztro-star-font-size-big: 13px; --iztro-star-font-size-small: 12px; --iztro-color-major: #531dab; --iztro-color-focus: #000; --iztro-color-quan: #2f54eb; --iztro-color-tough: #612500; --iztro-color-awesome: #d4380d; --iztro-color-active: #1890ff; --iztro-color-happy: #c41d7f; --iztro-color-nice: #237804; --iztro-color-decorator-1: #90983c; --iztro-color-decorator-2: #813359; --iztro-color-text: #8c8c8c; --iztro-color-border: #00152912; --iztro-color-decadal: var(--iztro-color-active); --iztro-color-yearly: var(--iztro-color-decorator-2); --iztro-color-monthly: var(--iztro-color-nice); --iztro-color-daily: var(--iztro-color-decorator-1); --iztro-color-hourly: var(--iztro-color-text); } .iztro-astrolabe { text-align: left; } .iztro-palace { border: 1px solid var(--iztro-color-border); } .iztro-star-soft, .iztro-star-tough, .iztro-star-adjective, .iztro-star-flower, .iztro-star-helper, .iztro-palace-fate, .iztro-palace-horo-star, .iztro-palace-scope, .iztro-palace-dynamic-name, .iztro-palace-lft24, .iztro-palace-rgt24 { font-size: var(--iztro-star-font-size-small); font-weight: normal; text-wrap: nowrap; } .iztro-palace-scope-age { text-wrap: balance; } .iztro-palace-scope-age, .iztro-palace-scope-decadal { color: var(--iztro-color-text); } .iztro-palace-lft24 { color: var(--iztro-color-decorator-1); } .iztro-palace-rgt24 { color: var(--iztro-color-decorator-2); text-wrap: nowrap; } .iztro-star-major, .iztro-star-tianma, .iztro-star-lucun, .iztro-palace-name, .iztro-palace-gz { font-size: var(--iztro-star-font-size-big); font-weight: bold; } .iztro-star-tianma { color: var(--iztro-color-active); } .iztro-star-lucun { color: var(--iztro-color-awesome); } .iztro-palace-horo-star .iztro-star { opacity: 0.75; } .iztro-palace-horo-star .iztro-star-tianma, .iztro-palace-horo-star .iztro-star-lucun { font-weight: normal; font-size: var(--iztro-star-font-size-small); } .iztro-star-brightness, .iztro-star-adjective { font-style: normal; font-weight: normal; color: var(--iztro-color-text); } .iztro-star-brightness { opacity: 0.5; } .iztro-star-major, .iztro-star-soft, .iztro-palace-name { color: var(--iztro-color-major); } .iztro-star-tough { color: var(--iztro-color-tough); } .iztro-star-flower { color: var(--iztro-color-happy); } .iztro-star-helper, .iztro-palace-gz { color: var(--iztro-color-nice); } .iztro-star-mutagen.mutagen-0 { background-color: var(--iztro-color-awesome); } .iztro-star-mutagen.mutagen-1 { background-color: var(--iztro-color-quan); } .iztro-star-mutagen.mutagen-2 { background-color: var(--iztro-color-nice); } .iztro-star-mutagen.mutagen-3 { background-color: var(--iztro-color-focus); } .iztro-star-mutagen.mutagen-decadal { background-color: var(--iztro-color-decadal); opacity: 0.6; } .iztro-star-mutagen.mutagen-yearly { background-color: var(--iztro-color-yearly); opacity: 0.6; } .iztro-star-mutagen.mutagen-monthly { background-color: var(--iztro-color-monthly); opacity: 0.6; } .iztro-star-mutagen.mutagen-daily { background-color: var(--iztro-color-daily); opacity: 0.6; } .iztro-star-mutagen.mutagen-hourly { background-color: var(--iztro-color-hourly); opacity: 0.6; } .iztro-palace-gz .iztro-palace-gz-active { background-color: var(--iztro-color-nice); color: #fff; font-weight: normal; } .iztro-star-mutagen-0 { background-color: var(--iztro-color-awesome); color: #fff; font-weight: normal; } .iztro-star-mutagen-1 { background-color: var(--iztro-color-quan); color: #fff; font-weight: normal; } .iztro-star-mutagen-2 { background-color: var(--iztro-color-nice); color: #fff; font-weight: normal; } .iztro-star-mutagen-3 { background-color: var(--iztro-color-focus); color: #fff; font-weight: normal; } .iztro-star-self-mutagen-0::before { background-color: var(--iztro-color-awesome); } .iztro-star-self-mutagen-1::before { background-color: var(--iztro-color-quan); } .iztro-star-self-mutagen-2::before { background-color: var(--iztro-color-nice); } .iztro-star-self-mutagen-3::before { background-color: var(--iztro-color-focus); } .iztro-star-hover-mutagen-0::after { background-color: var(--iztro-color-awesome); } .iztro-star-hover-mutagen-1::after { background-color: var(--iztro-color-quan); } .iztro-star-hover-mutagen-2::after { background-color: var(--iztro-color-nice); } .iztro-star-hover-mutagen-3::after { background-color: var(--iztro-color-focus); } .iztro-palace-name-body { font-size: var(--iztro-star-font-size-small); font-weight: normal; position: absolute; margin-top: 2px; } .iztro-palace-fate span { display: block; padding: 0 3px; border-radius: 4px; color: #fff; background-color: var(--iztro-color-major); cursor: pointer; } .iztro-palace-center-item { font-size: var(--iztro-star-font-size-small); line-height: 22px; } .iztro-palace-center-item label { color: var(--iztro-color-text); } .iztro-palace-center-item span { color: var(--iztro-color-decorator-1); } .gender { display: inline-block; margin-right: 5px; } .gender.gender-male { color: var(--iztro-color-quan); } .gender.gender-female { color: var(--iztro-color-happy); }`;

// --- 新的 CustomChartStyles ---
const customChartStyles = `
  :host {
    font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Heiti TC", "LiHei Pro", "微軟正黑體", "蘋果儷中黑", sans-serif;
    font-size: 12px;
    line-height: 1.4; /* 稍微緊湊一點的行高 */
    color: #333; /* 預設文字顏色 */
  }

  .iztro-astrolabe-theme-default {
    /* 覆寫 react-iztro 的 CSS 變數，參考圖片2, 3 的風格 */
    --iztro-star-font-size-big: 14px;   /* 主星字體 */
    --iztro-star-font-size-small: 11px; /* 輔星、雜曜字體 */
    
    --iztro-color-major: #4A0D6F;       /* 主星、宮名等主要顏色 (深紫) */
    --iztro-color-focus: #000000;       /* 化忌 (黑) - 預設 */
    --iztro-color-quan: #303F9F;        /* 化權 (深藍) */
    --iztro-color-tough: #6D4C41;       /* 煞星 (咖啡) */
    --iztro-color-awesome: #D32F2F;     /* 化祿、祿存 (紅) */
    --iztro-color-active: #FF5722;      /* 天馬、目前流運 (橘) */
    --iztro-color-happy: #E91E63;       /* 桃花星 (桃紅) */
    --iztro-color-nice: #388E3C;        /* 化科、吉星 (綠) */
    
    --iztro-color-decorator-1: #757575; /* 干支、輔助文字 */
    --iztro-color-decorator-2: #BDBDBD; /* 更淡的輔助文字、邊框 */
    --iztro-color-text: #424242;        /* 一般內文 (稍深) */
    --iztro-color-border: #E0E0E0;      /* 宮位邊框 (稍淺) */

    /* 流運顏色定義 (與 react-iztro 預設的變數名對應) */
    --iztro-color-decadal: var(--iztro-color-major); /* 大限 (深紫) */
    --iztro-color-yearly: #0277BD;    /* 流年 (藍，圖片2風格) */
    --iztro-color-monthly: #FBC02D;   /* 流月 (黃，圖片2風格) */
    --iztro-color-daily: #D84315;     /* 流日 (橘紅，圖片2風格) */
    --iztro-color-hourly: var(--iztro-color-text); /* 流時 (灰色) */
  }

  .iztro-astrolabe {
    /* 移除 Grid 佈局，讓 react-iztro 自行決定宮位排列方式 */
    /* 通常 react-iztro 會是 flex 或 inline-block 排列 */
    /* display: flex; flex-wrap: wrap; */ /* 可嘗試，如果宮位是並排的 */
    width: 100%;
    max-width: 760px; /* 限制最大寬度，參考圖片 */
    margin: 0 auto; /* 水平置中 */
    border: 1px solid var(--iztro-color-decorator-2); /* 整個命盤外框 */
  }

  .iztro-palace {
    /* 單個宮位的樣式 */
    border: 1px solid var(--iztro-color-border);
    padding: 4px; /* 內部留白 */
    box-sizing: border-box;
    min-height: 120px; /* 宮位最小高度，可依內容調整 */
    display: flex;
    flex-direction: column; /* 宮內元素垂直排列 */
    position: relative; /* 為了絕對定位子元素 (如命身宮標記) */
  }
  
  /* 如果 react-iztro 的宮位是透過 flex 排列的，可能需要設定宮位寬度 */
  /* .iztro-astrolabe > .iztro-palace { flex-basis: 25%; } */ /* 四欄 */
  /* .iztro-astrolabe > .iztro-palace:nth-child(4n+1) { margin-left: 0; } */

  .iztro-palace-name {
    font-size: var(--iztro-star-font-size-big);
    font-weight: bold;
    color: var(--iztro-color-major);
    text-align: center;
    margin-bottom: 3px;
  }
  
  .iztro-palace-gz { /* 宮干支 */
    font-size: 10px;
    color: var(--iztro-color-decorator-1);
    text-align: right;
    margin-top: auto; /* 將干支推到宮位底部 */
    padding-top: 3px;
  }
  
  .iztro-palace-stars-container { /* 宮內星曜的容器 - 假設有此容器 */
    flex-grow: 1; /* 佔據剩餘空間 */
    text-align: left; /* 星曜靠左 */
    line-height: 1.3; /* 星曜行高 */
    overflow-y: auto; /* 星曜過多時可滾動 */
    max-height: 65px; /* 限制星曜顯示區域高度 */
  }
  /* 如果沒有 .iztro-palace-stars-container，直接對 .iztro-palace 內的星曜處理 */
  /* .iztro-palace > .iztro-star { ... } */

  .iztro-star {
    display: inline; /* 讓星曜可以自然換行 */
    margin-right: 4px; /* 星曜間的水平間隔 */
    white-space: nowrap; /* 星名本身不換行 */
  }
  /* 星名後直接跟亮度或四化，不需要額外 flex 容器 */

  .iztro-star-major {
    font-size: var(--iztro-star-font-size-big);
    font-weight: bold;
    color: var(--iztro-color-major);
  }
  /* 其他星曜類型，顏色由 CSS 變數或 react-iztro 預設 class 控制 */
  .iztro-star-soft { color: var(--iztro-color-nice); }
  .iztro-star-tough { color: var(--iztro-color-tough); }
  .iztro-star-flower { color: var(--iztro-color-happy); }
  .iztro-star-helper { color: var(--iztro-color-nice); }
  .iztro-star-tianma { color: var(--iztro-color-active); font-weight:bold; }
  .iztro-star-lucun { color: var(--iztro-color-awesome); font-weight:bold; }


  .iztro-star-brightness {
    font-size: 9px;
    color: var(--iztro-color-text);
    margin-left: 1px;
    font-style: normal;
    opacity: 0.8; /* 讓亮度稍淡 */
  }

  .iztro-star-mutagen { /* 四化標記 */
    display: inline-block; /* 確保背景色生效 */
    color: #fff !important; /* 文字強制白色 */
    font-size: 9px;
    font-weight: normal;
    padding: 1px 3px;
    border-radius: 3px;
    margin-left: 2px;
    line-height: 1; /* 緊湊行高 */
    vertical-align: middle; /* 嘗試與星名垂直居中 */
  }
  /* 四化背景色使用 react-iztro 的 .mutagen-X class */
  .iztro-star-mutagen.mutagen-0 { background-color: var(--iztro-color-awesome); } /* 化祿 */
  .iztro-star-mutagen.mutagen-1 { background-color: var(--iztro-color-quan); }    /* 化權 */
  .iztro-star-mutagen.mutagen-2 { background-color: var(--iztro-color-nice); }    /* 化科 */
  .iztro-star-mutagen.mutagen-3 { background-color: var(--iztro-color-focus); }   /* 化忌 */

  .iztro-palace-scope {
    font-size: 10px;
    text-align: left;
    margin-top: 2px; /* 與星曜區域的間隔 */
    line-height: 1.2;
  }
  .iztro-palace-scope span { /* 大限、流年等文字本身 */
    display: inline-block; /* 可以並排顯示，例如 "大限: 24-33" */
    margin-right: 5px; /* 不同 scope 之間的間隔 */
    white-space: nowrap;
  }
  /* 流運的顏色應由 react-iztro 的 class (如 .scope-decadal) 或 CSS 變數控制 */
  /* 確保 .iztro-palace-scope span 或其父元素有正確的 scope 類名 */
  .iztro-palace-scope .scope-decadal, .iztro-palace-scope [class*="decadal"] { color: var(--iztro-color-decadal) !important; font-weight: bold; }
  .iztro-palace-scope .scope-yearly, .iztro-palace-scope [class*="yearly"] { color: var(--iztro-color-yearly) !important; }
  .iztro-palace-scope .scope-monthly, .iztro-palace-scope [class*="monthly"] { color: var(--iztro-color-monthly) !important; }
  .iztro-palace-scope .scope-daily, .iztro-palace-scope [class*="daily"] { color: var(--iztro-color-daily) !important; }
  .iztro-palace-scope .scope-hourly, .iztro-palace-scope [class*="hourly"] { color: var(--iztro-color-hourly) !important; }
  .iztro-palace-scope-age { color: var(--iztro-color-text) !important; }


  .iztro-palace-fate { /* 命宮、身宮標記 */
    position: absolute;
    top: 2px;
    left: 2px;
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

  /* 中央區域的資訊 (如果 react-iztro 有特定 class 包裹) */
  .iztro-palace-center-wrapper { /* 假設中央區域有一個 .iztro-palace-center-wrapper */
    /* 如果是 grid 的一部分，需要指定 grid-column / grid-row */
    padding: 10px;
    text-align: center;
    border: 1px solid var(--iztro-color-border);
    background-color: #f9f9f9;
  }
  .iztro-palace-center-item {
    font-size: 11px;
    line-height: 1.7;
    margin-bottom: 4px;
    text-align: left;
  }
  .iztro-palace-center-item label {
    color: var(--iztro-color-text);
    margin-right: 5px;
    display: inline-block;
    min-width: 50px; /* 標籤對齊 */
  }
  .iztro-palace-center-item span {
    color: var(--iztro-color-major);
    font-weight: bold;
  }

  /* 針對圖片中右下角童限、流年等深色背景條塊的樣式 */
  /* 這需要 react-iztro 在對應宮位輸出特定的HTML結構 */
  /* 例如，在 .iztro-palace-scope 或獨立的 div 中 */
  .iztro-palace .scoped-block-display { /* 假設有這樣的容器 */
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .iztro-palace .scoped-block-display .scope-item-block {
    color: white;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 10px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 根據 react-iztro 輸出的 class 名稱來設定背景色 */
  .iztro-palace .scoped-block-display .scope-item-block.decadal { background-color: var(--iztro-color-decadal); }
  .iztro-palace .scoped-block-display .scope-item-block.yearly { background-color: var(--iztro-color-yearly); }
  .iztro-palace .scoped-block-display .scope-item-block.monthly { background-color: var(--iztro-color-monthly); }
  /* ... 其他流運類型 */
`;

class ZiweiChart extends HTMLElement {
    // ... (static get observedAttributes() 維持不變) ...

    constructor() {
        super();
        // ... (constructor 內部 console.log 維持不變) ...

        this.shadowRoot.innerHTML = `
            <style>
                :host { 
                    display: block; 
                    width: 100%; 
                    padding: 0; 
                    box-sizing: border-box; 
                }
                ${antdResetCSS}
                ${reactIztroDefaultCSS} /* react-iztro 預設 CSS */
                ${customChartStyles}    /* 我們大幅修改的 CSS */

                .chart-wrapper-inside-shadow-dom { 
                    width: 100%; 
                    display: flex; 
                    justify-content: center;
                    align-items: flex-start; 
                    padding: 10px; 
                    box-sizing: border-box; 
                    background-color: #f0f0f0; /* 頁面背景色 */
                }
                .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; }
                .loading-message-in-shadow { background-color: #e9e9e9; color: #333; }
                .error-message-in-shadow { background-color: #ffebee; color: #c62828; border: 1px solid #c62828; }
            </style>
            <div id="chart-render-target" class="chart-wrapper-inside-shadow-dom">
                <div class="message-display-in-shadow loading-message-in-shadow">命盤組件初始化 (Constructor)...</div>
            </div>
        `;
        // ... (constructor 內部其他初始化維持不變) ...
    }

    // ... (_ensureReactRoot, connectedCallback, disconnectedCallback, attributeChangedCallback 維持不變) ...
    // ... (_parseAndRender 維持不變) ...

    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact CALLED. Payload:', JSON.stringify(payload));
        
        if (!this._ensureReactRoot()) {
            this.renderError('渲染命盤前，渲染引擎初始化失敗。', true);
            return;
        }

        if (!payload) {
            console.warn('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Payload is empty.');
            this.renderError('命盤核心數據 (payload) 為空。');
            return;
        }

        const AstrolabeComponentToUse = iztro.Iztrolabe; 

        if (typeof AstrolabeComponentToUse === 'undefined') {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: CRITICAL - AstrolabeComponentToUse (iztro.Iztrolabe) is UNDEFINED!');
            this.renderError('命盤核心組件未能正確獲取 (iztro.Iztrolabe undefined)。');
            return;
        }
        
        const { birthDate, birthTime, gender, solar, lang, fixLeap, minute, palaces, options: payloadOptions } = payload;
        const iztroBirthTimeNum = parseInt(birthTime, 10);

        if (isNaN(iztroBirthTimeNum)) {
            console.error(`[ZiweiChart INSTANCE] _renderAstrolabeWithReact: birthTime "${birthTime}" is NaN.`);
            this.renderError(`時辰數據錯誤: "${birthTime}".`);
            return;
        }

        const chartDataProps = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-CN'), // 調整預設中文為 zh-CN 或 zh-TW
            fixLeap: fixLeap === true,
            // minute: typeof minute === 'number' ? minute : undefined, // 如果您的 payload 有 minute
            // palaces: palaces, // 如果您從後端傳遞了排好的盤
        };
        
        // 這裡的 options 應該是 react-iztro <Iztrolabe /> 組件本身接受的顯示選項
        // 您需要查閱 react-iztro 的文檔來確定有哪些可用的 options
        const iztroComponentOptions = {
             theme: 'default', // 告訴 react-iztro 使用其 'default' 主題的 class，我們的 CSS 會基於此覆寫
             // 以下為假設的 react-iztro 選項，請依實際情況調整或移除
             // showPalaceName: true,
             // showStars: true,
             // showMutagens: true,
             // showBrightness: true,
             // showFiveElementsClass: true, // 顯示五行局
             // showChineseDateInCenter: true, // 在中央顯示農曆等
             // displayScopes: ['decadal', 'yearly'], // 控制顯示哪些流運
             // clickablePalace: false,
             // customRenderPalace: (palaceData, defaultRender) => { ... }, // 進階自訂
             ...(payloadOptions || {}), // 如果 payload 中有 options，合併進來
        };

        const finalProps = { ...chartDataProps, options: iztroComponentOptions };

        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final props for Astrolabe:', JSON.stringify(finalProps));

        try {
            const astrolabeElement = React.createElement(AstrolabeComponentToUse, finalProps);
            if (!astrolabeElement) {
                 console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React.createElement(AstrolabeComponentToUse) returned null/undefined.');
                 this.renderError('無法創建命盤圖表實例。');
                 return;
            }
            this._reactRoot.render(astrolabeElement);
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React render() call executed. THE CHART SHOULD NOW BE VISIBLE!');
        } catch (error) {
            // ... (錯誤處理維持不變) ...
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact FINISHED.');
    }

    // ... (renderPlaceholder, renderError 維持不變) ...
}

// ... (customElements.define 部分維持不變) ...