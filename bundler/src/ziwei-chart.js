// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro'; // Assuming react-iztro is the correct export

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
console.log('[ZiweiChart CE SCRIPT] Typeof iztro (imported via * as iztro):', typeof iztro);
console.log('[ZiweiChart CE SCRIPT] iztro object keys:', iztro ? Object.keys(iztro) : 'iztro is null/undefined');
console.log('[ZiweiChart CE SCRIPT] typeof iztro.Astrolabe:', typeof iztro.Astrolabe); // This is the component we'll likely use
console.log('[ZiweiChart CE SCRIPT] typeof iztro.Iztrolabe (old name check):', typeof iztro.Iztrolabe);


// --- CSS Definitions ---

// 1. Ant Design-like Reset (Simplified)
const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -ms-overflow-style: scrollbar; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;

// 2. Default CSS from react-iztro (version 0.11.3)
// It's good to include this as a base, so custom styles mainly override or extend.
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

// 3. Custom Chart Styles for 图一/图二 look and feel + Responsiveness
const customChartStyles = `
  :host {
    /* CSS Variables for easier theming from outside or via theme-override attribute */
    --ziwei-font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Heiti TC", "LiHei Pro", "微軟正黑體", "蘋果儷中黑", sans-serif;
    --ziwei-font-size-base: 12px;
    --ziwei-line-height-base: 1.3;
    --ziwei-color-text-main: #424242;       /* 主文字顏色 */
    --ziwei-color-text-secondary: #757575;  /* 次要文字顏色 */
    --ziwei-color-brand: #673AB7;           /* 主題品牌色 (例如圖二的紫色調) */
    --ziwei-color-border-palace: #E0E0E0;   /* 宮位邊框顏色 */
    --ziwei-color-border-chart: #BDBDBD;    /* 命盤外框顏色 */
    --ziwei-color-bg-chart: #ffffff;        /* 命盤背景色 */
    --ziwei-color-bg-palace: rgba(250, 250, 250, 0.5); /* 宮位背景色，輕微透明感 */
    --ziwei-color-bg-center: rgba(245, 245, 245, 0.8); /* 中央區域背景色 */
    --ziwei-chart-shadow: 0 3px 10px rgba(0,0,0,0.12); /* 命盤陰影 */
    --ziwei-palace-min-height: 120px;       /* 宮位最小高度 */
    --ziwei-palace-padding: 5px 8px;        /* 宮位內邊距 */

    /* Apply base variables */
    font-family: var(--ziwei-font-family);
    font-size: var(--ziwei-font-size-base);
    line-height: var(--ziwei-line-height-base);
    color: var(--ziwei-color-text-main);
    display: block; /* Necessary for custom elements to take up space */
    width: 100%;
    box-sizing: border-box;
  }

  .iztro-astrolabe-theme-default {
    /* Override react-iztro's default theme variables with our custom ones */
    --iztro-star-font-size-big: 13px;   /* 主星字號 */
    --iztro-star-font-size-small: 10px; /* 輔星、雜曜字號 */
    
    /* 色彩配置 (參考圖一/圖二，並賦予語義化命名) */
    --iztro-color-major: var(--ziwei-color-brand);          /* 宮名、甲級星主色 */
    --iztro-color-focus: #D32F2F;                           /* 化忌 (紅色) */
    --iztro-color-quan: #1976D2;                            /* 化權 (藍色) */
    --iztro-color-tough: #6D4C41;                           /* 煞星 (深咖啡色) */
    --iztro-color-awesome: #FF8F00;                         /* 化祿、祿存 (亮橘色) */
    --iztro-color-active: #FB8C00;                          /* 天馬 (橘色) */
    --iztro-color-happy: #D81B60;                           /* 桃花星 (桃紅色) */
    --iztro-color-nice: #388E3C;                            /* 化科、吉星 (綠色) */
    
    --iztro-color-decorator-1: var(--ziwei-color-text-secondary); /* 干支、輔助文字 */
    --iztro-color-decorator-2: #9E9E9E;                     /* 更淡的輔助文字 */
    --iztro-color-text: var(--ziwei-color-text-main);       /* 一般內文 (星曜亮度等) */
    --iztro-color-border: var(--ziwei-color-border-palace); /* 宮位邊框 */

    /* 流曜顏色 */
    --iztro-color-decadal: var(--iztro-color-major); 
    --iztro-color-yearly: #0288D1;    
    --iztro-color-monthly: #4CAF50;   
    --iztro-color-daily: #FFC107;     
    --iztro-color-hourly: var(--ziwei-color-text-secondary);
  }

  .iztro-astrolabe {
    display: grid;
    /* 4 columns, 4 rows. Middle 2x2 area for center info. */
    grid-template-columns: repeat(4, minmax(90px, 1fr)); /* Min width for palace, then flex */
    grid-template-rows: repeat(4, minmax(var(--ziwei-palace-min-height), auto));
    width: 100%;
    max-width: 880px; /* Max width of the chart */
    margin: 10px auto; /* Centering the chart */
    border: 1px solid var(--ziwei-color-border-chart);
    background-color: var(--ziwei-color-bg-chart);
    box-shadow: var(--ziwei-chart-shadow);
    border-radius: 6px; /* Slightly rounded corners for the chart */
    overflow: hidden; /* Ensures child borders don't poke out if rounded */
  }

  .iztro-palace {
    border: 1px solid var(--iztro-color-border); /*宫格线由宫位自身border实现*/
    /* Overlap borders by 1px to avoid double borders in grid */
    margin: -1px 0 0 -1px; 
    padding: var(--ziwei-palace-padding);
    box-sizing: border-box;
    min-height: var(--ziwei-palace-min-height); /* Ensure consistent height */
    display: flex;
    flex-direction: column; /* Stack palace name, stars, GZ */
    position: relative; /* For absolute positioning of elements like '命宮' badge */
    background-color: var(--ziwei-color-bg-palace);
    line-height: var(--ziwei-line-height-base);
  }

  /* 
    宮位定位 (grid-area): 
    KEY ASSUMPTION: react-iztro generates <div class="iztro-palace" data-palace-idx="X"> where X is 0-11,
    AND the order is 遷移宮(idx=6 for react-iztro typically, but could be 0 if it starts there for display purposes),
    ...ending with 命宮(idx=0 typically).
    YOU MUST VERIFY THIS  and its order from react-iztro's output.
    The grid-area is row-start / column-start / row-end / column-end.
    
    Standard Zi Wei Chart Layout (clockwise from top-left as viewed):
    Top Row:      遷移(6)  僕役(7)  官祿(8)  田宅(9)
    Left Col:     疾厄(5)           福德(10)
    Right Col:    財帛(4)           父母(11)
    Bottom Row:   子女(3)  夫妻(2)  兄弟(1)  命宮(0)
    
    Assuming react-iztro  maps to:
    0:命, 1:兄, 2:夫, 3:子, 4:財, 5:疾, 6:遷, 7:僕, 8:官, 9:田, 10:福, 11:父
  */
  .iztro-palace[data-palace-idx="6"]  { grid-area: 1 / 1 / 2 / 2; } /* 遷移 */
  .iztro-palace[data-palace-idx="7"]  { grid-area: 1 / 2 / 2 / 3; } /* 僕役 (交友) */
  .iztro-palace[data-palace-idx="8"]  { grid-area: 1 / 3 / 2 / 4; } /* 官祿 (事業) */
  .iztro-palace[data-palace-idx="9"]  { grid-area: 1 / 4 / 2 / 5; } /* 田宅 */

  .iztro-palace[data-palace-idx="5"]  { grid-area: 2 / 1 / 3 / 2; } /* 疾厄 */
  /* Center Area will be 2 / 2 / 4 / 4 */
  .iztro-palace[data-palace-idx="10"] { grid-area: 2 / 4 / 3 / 5; } /* 福德 */

  .iztro-palace[data-palace-idx="4"]  { grid-area: 3 / 1 / 4 / 2; } /* 財帛 */
  .iztro-palace[data-palace-idx="11"] { grid-area: 3 / 4 / 4 / 5; } /* 父母 */

  .iztro-palace[data-palace-idx="3"]  { grid-area: 4 / 1 / 5 / 2; } /* 子女 */
  .iztro-palace[data-palace-idx="2"]  { grid-area: 4 / 2 / 5 / 3; } /* 夫妻 */
  .iztro-palace[data-palace-idx="1"]  { grid-area: 4 / 3 / 5 / 4; } /* 兄弟 */
  .iztro-palace[data-palace-idx="0"]  { grid-area: 4 / 4 / 5 / 5; } /* 命宮 */

  /* Alternative: If react-iztro uses data-palace-name="命宮", etc. */
  /* .iztro-palace[data-palace-name="遷移宮"] { grid-area: 1 / 1 / 2 / 2; } ... etc. */
  /* You'll need to uncomment and use these if data-palace-idx is not available or reliable. */

  /* 中央區域 (天盤基本資料) */
  /* ASSUMPTION: react-iztro has a div with class .iztro-palace-center for this. */
  .iztro-astrolabe > .iztro-palace-center { /* If it's a direct child of astrolabe */
    grid-area: 2 / 2 / 4 / 4; /* Spans 2 rows and 2 columns in the middle */
    border: 1px solid var(--iztro-color-border);
    margin: -1px 0 0 -1px; 
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center content horizontally */
    justify-content: space-around; /* Distribute content vertically */
    text-align: center;
    background-color: var(--ziwei-color-bg-center); 
    box-sizing: border-box;
  }

  /* 宮位內部樣式 */
  .iztro-palace-name {
    font-size: calc(var(--iztro-star-font-size-big) + 1px); /* 宮名稍大 */
    font-weight: 500; 
    color: var(--iztro-color-major);
    text-align: left; 
    padding-bottom: 3px; /* Space below palace name */
    border-bottom: 1px solid var(--ziwei-color-border-palace); /* Separator line */
    margin-bottom: 4px; /* Space after separator */
    line-height: 1.2;
  }
  
  .iztro-palace-gz { /* 干支 */
    font-size: calc(var(--iztro-star-font-size-small) - 1px);
    color: var(--iztro-color-decorator-1);
    text-align: right; 
    width: 100%;
    margin-top: auto; /* Push to the bottom of the flex container */
    padding-top: 3px; /* Space above GZ */
    line-height: 1.2;
  }
  
  /* Container for stars, allowing scroll if content overflows */
  /* This assumes react-iztro wraps stars in a div or they are direct children */
  .iztro-palace-stars-group, /* Ideal: if iztro has a dedicated class for stars */
  .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate) /* Fallback selector */ {
    flex-grow: 1; /* Takes up available space */
    text-align: left;
    overflow-y: auto; /* Scroll if stars overflow */
    max-height: 65px; /* Adjust based on overall palace height and other content */
    padding: 2px 0;
    line-height: 1.4; /* Slightly more line height for stars */
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: var(--ziwei-color-text-secondary) transparent; /* For Firefox */
  }
  .iztro-palace-stars-group::-webkit-scrollbar,
  .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate)::-webkit-scrollbar {
    width: 4px; /* Slim scrollbar for Webkit */
  }
  .iztro-palace-stars-group::-webkit-scrollbar-thumb,
  .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate)::-webkit-scrollbar-thumb {
    background-color: var(--ziwei-color-text-secondary);
    border-radius: 2px;
  }

  .iztro-star {
    display: inline; /* Keep star and its attributes (mutagen, brightness) together */
    margin-right: 5px; /* Space between stars */
    white-space: nowrap; /* Prevent star name from breaking */
  }

  .iztro-star-major { font-weight: 500; } /* Already colored by --iztro-color-major */
  /* Other star type colors are mostly handled by react-iztro's variables */

  /* Example for less important stars (雜曜) - if they have a common class or specific ones */
  .iztro-star-doctor, .iztro-star-博士, .iztro-star-力士, .iztro-star-青龍, /* ... and so on for common misc stars */
  .iztro-star-adjective /* If react-iztro uses this for misc stars descriptions */ { 
    font-size: calc(var(--iztro-star-font-size-small) - 2px); /* Even smaller for misc */
    color: var(--iztro-color-decorator-1); 
    opacity: 0.9;
  }

  .iztro-star-brightness { /* 亮度 (廟旺平陷) */
    font-size: calc(var(--iztro-star-font-size-small) - 2px);
    color: var(--iztro-color-text); /* Use general text color */
    margin-left: 2px; /* Space from star name */
    font-style: normal;
    opacity: 0.65; /* Make it less prominent */
    font-weight: 300; /* Lighter font weight */
  }

  .iztro-star-mutagen { /* 四化星標記 (科權祿忌) */
    display: inline-block; /* To apply padding and background */
    color: #fff !important; /* Ensure text is white */
    font-size: calc(var(--iztro-star-font-size-small) - 2px);
    font-weight: normal;
    padding: 1px 4px; 
    border-radius: 3px;
    margin-left: 2px;
    line-height: 1; 
    vertical-align: middle; /* Align with star name */
  }
  /* Colors for mutagens are set by react-iztro's default CSS variables */

  .iztro-palace-scope { /* 流運資訊 (大限、小限、流年等) */
    font-size: calc(var(--iztro-star-font-size-small) - 1px);
    text-align: left;
    margin-top: 4px; /* Space from stars group */
    padding-top: 3px;
    border-top: 1px dashed var(--ziwei-color-border-palace); /* Separator for scopes */
    line-height: 1.3;
  }
  .iztro-palace-scope span { /* Each line of scope info */
    display: block; 
    margin-bottom: 1px;
    white-space: nowrap;
  }
  /* Colors for scopes are set by react-iztro's default CSS variables */
  .iztro-palace-scope-age { 
      color: var(--iztro-color-text) !important; 
      font-size: calc(var(--iztro-star-font-size-small) - 2px); 
      opacity: 0.8;
  }


  .iztro-palace-fate { /* 命宮、身宮標記 */
    position: absolute;
    top: var(--ziwei-palace-padding); /* Align with padding */
    right: var(--ziwei-palace-padding); /* Positioned at top-right of palace */
    font-size: calc(var(--iztro-star-font-size-small) - 1px);
    z-index: 1; 
  }
  .iztro-palace-fate span { /* For '命宮', '身宮' badges */
    display: inline-block;
    padding: 2px 5px;
    border-radius: 3px;
    color: #fff;
    background-color: var(--iztro-color-major);
    margin-left: 3px; /* If multiple badges */
  }

  /* 中央區域的詳細資訊排版 */
  .iztro-palace-center-item {
    font-size: calc(var(--ziwei-font-size-base) - 1px);
    line-height: 1.8; /* More spacing for center items */
    margin-bottom: 6px;
    text-align: left; /* Align items to the left within the center block */
    width: 100%;
    max-width: 350px; /* Max width for readability */
  }
  .iztro-palace-center-item label { /* e.g., "姓名:", "性別:" */
    color: var(--ziwei-color-text-secondary);
    margin-right: 8px;
    display: inline-block;
    min-width: 70px; /* For alignment */
    font-weight: 500;
  }
  .iztro-palace-center-item span { /* The actual data */
    color: var(--iztro-color-major); 
    font-weight: 400;
  }
  .iztro-palace-center-item .gender.gender-male { color: var(--iztro-color-quan); font-weight: bold; }
  .iztro-palace-center-item .gender.gender-female { color: var(--iztro-color-happy); font-weight: bold; }

  /* --- 回應式設計 --- */
  /* Medium screens (e.g., tablets) - Adjust breakpoint as needed */
  @media (max-width: 880px) { /* Breakpoint slightly larger than max-width of chart */
    :host { 
        --ziwei-palace-min-height: 110px; 
        --ziwei-font-size-base: 11px;
    }
    .iztro-astrolabe {
      grid-template-columns: repeat(4, minmax(80px, 1fr));
      max-width: 100%; /* Allow chart to shrink */
      margin: 5px auto;
      border-radius: 0; /* Full width, no radius */
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

  /* Small screens (e.g., mobile) - Stack palaces vertically */
  @media (max-width: 600px) {
    :host { 
        --ziwei-palace-min-height: auto; /* Allow natural height */
        --ziwei-font-size-base: 10px; 
        --ziwei-palace-padding: 4px 6px;
    }
    .iztro-astrolabe {
      display: flex; 
      flex-direction: column; /* Stack all children vertically */
      border: none;
      box-shadow: none;
      margin: 0;
    }
    .iztro-palace, 
    .iztro-astrolabe > .iztro-palace-center {
      width: 100%; 
      margin: 0 0 1px 0; /* Remove grid margin, add tiny bottom margin for separation */
      min-height: var(--ziwei-palace-min-height);
      order: 0 !important; /* Reset any grid-based order */
      grid-area: auto !important; /* Clear grid area assignments */
      border-left: none;
      border-right: none;
      border-radius: 0; /* No rounded corners for individual palaces in stack */
      /* Ensure top/bottom borders are visible if main chart border is removed */
      border-top: 1px solid var(--ziwei-color-border-chart); 
    }
    .iztro-astrolabe > *:first-child { border-top: none; } /* Remove top border for the very first item */
    .iztro-astrolabe > *:last-child { border-bottom: none; } /* Remove bottom border for the very last item */


    .iztro-palace-stars-group,
    .iztro-palace > div:not(.iztro-palace-name):not(.iztro-palace-gz):not(.iztro-palace-scope):not(.iztro-palace-fate) {
      max-height: none; /* Allow full height for stars when stacked */
      overflow-y: visible; /* No scroll needed if height is not restricted */
    }
    .iztro-palace-name, .iztro-palace-gz {
      text-align: left; /* Consistent alignment */
    }
    .iztro-astrolabe > .iztro-palace-center {
      order: -1; /* Move center info to the top on mobile */
      margin-bottom: 5px; /* Space after center block */
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
        return ['data-config', 'theme-override']; // Added 'theme-override'
    }

    constructor() {
        super();
        console.log('[ZiweiChart INSTANCE] constructor CALLED');
        this.attachShadow({ mode: 'open' });
        console.log('[ZiweiChart INSTANCE] constructor: Shadow DOM attached.');

        // Initial minimal HTML. Styles and content will be injected/rendered.
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
        this._isRendering = false; // Flag to prevent concurrent rendering attempts
    }

    _injectStyles() {
        const styleElement = this.shadowRoot.getElementById('ziwei-dynamic-styles');
        if (!styleElement) {
            console.error("[ZiweiChart INSTANCE] _injectStyles: Critical - #ziwei-dynamic-styles element not found in Shadow DOM!");
            return;
        }

        // Base styles for the host and wrapper, message placeholders
        let combinedCSS = `
            :host { 
                display: block; 
                width: 100%; 
                padding: 0; 
                box-sizing: border-box;
                /* Default values for CSS variables, can be overridden by :host styles from outside */
                --color-html-bg: #f0f2f5; /* A light grey for the page background, if chart is on it */
            }
            .chart-wrapper-inside-shadow-dom { 
                width: 100%; 
                /* min-height: 500px; /* Consider removing fixed min-height or making it a CSS var */
                display: flex; /* To center placeholder messages */
                justify-content: center;
                align-items: flex-start; /* Align chart to top */
                padding: 0; /* Padding is handled by .iztro-astrolabe margin now */
                box-sizing: border-box; 
                background-color: var(--color-html-bg, #f0f2f5); /* Use a variable for background */
            }
            .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; }
            .loading-message-in-shadow { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
            .error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
        `;
        
        combinedCSS += antdResetCSS;
        combinedCSS += reactIztroDefaultCSS;
        combinedCSS += customChartStyles; // Your main theme

        if (this._currentThemeOverride) {
            console.log("[ZiweiChart INSTANCE] _injectStyles: Applying theme-override CSS.");
            combinedCSS += this._currentThemeOverride;
        }
        
        styleElement.textContent = combinedCSS;
        console.log("[ZiweiChart INSTANCE] _injectStyles: All styles injected/updated in #ziwei-dynamic-styles.");
    }
    
    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED.');
        this._injectStyles(); // Inject styles as the first step

        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        if (!renderTarget) {
            console.error('[ZiweiChart INSTANCE] connectedCallback: CRITICAL - #chart-render-target NOT FOUND in Shadow DOM.');
            // Attempt to display error directly in shadow root if target is missing
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
            this._injectStyles(); // Re-inject styles if theme override is present on connect
        }

        if (initialConfig) {
            console.log('[ZiweiChart INSTANCE] connectedCallback: Initial data-config found, preparing to parse and render.');
            // Defer parsing to allow current call stack to complete, ensuring DOM is ready.
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
        this._reactRoot = null; // Important to nullify for potential re-attachment
        this._currentConfigString = null; // Reset config state
        this._isRendering = false; // Reset rendering flag
        console.log('[ZiweiChart INSTANCE] disconnectedCallback: _reactRoot and config state reset.');
    }

    attributeChangedCallback(name, oldValue, newValue) { 
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback: Attribute '${name}' changed.`);
        // console.log(`  Old Value (short): ${oldValue ? String(oldValue).substring(0,50)+'...' : oldValue}`);
        // console.log(`  New Value (short): ${newValue ? String(newValue).substring(0,50)+'...' : newValue}`);

        if (name === 'theme-override') {
            if (newValue !== this._currentThemeOverride) {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: theme-override changed. Updating styles.');
                this._currentThemeOverride = newValue;
                this._injectStyles(); // Re-apply all styles with the new override

                // If a chart is already rendered, re-parse the current config to apply theme potentially affecting React output
                if (this._currentConfigString && this._reactRoot) {
                    console.log('[ZiweiChart INSTANCE] attributeChangedCallback: Forcing re-render due to theme change with existing config.');
                    const tempConfig = this._currentConfigString;
                    this._currentConfigString = null; // Force _parseAndRender to see it as new
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
            
            // If React root isn't ready yet (e.g., attribute set before connectedCallback runs or completes)
            // connectedCallback will handle the initial render with the latest attribute value.
            if (!this._reactRoot) { 
                console.warn('[ZiweiChart INSTANCE] attributeChangedCallback: React root not ready for data-config. Render will be handled by connectedCallback or later update.');
                return; 
            }

            if (newValue === null || newValue === undefined) {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config removed. Clearing chart.');
                this.renderPlaceholder("命盤配置已移除。");
                this._currentConfigString = null; // Clear stored config
            } else {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config has new value. Preparing to parse and render.');
                 Promise.resolve().then(() => this._parseAndRender(newValue));
            }
        }
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback for '${name}' FINISHED.`);
    }

    _parseAndRender(configString) { 
        console.log('[ZiweiChart INSTANCE] _parseAndRender CALLED.');
        // console.log('  Config string (first 100):', configString ? configString.substring(0, 100) + '...' : 'null/undefined');
        
        if (this._isRendering && configString === this._currentConfigString) { // Avoid re-entry if already processing the exact same config
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: Skipped. Already rendering this exact config or in progress.');
            return;
        }
        this._isRendering = true;
        this._currentConfigString = configString; // Update current config *before* async operations

        // Ensure React root is available. It should be by now if connected.
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
            }
        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _parseAndRender: ERROR parsing JSON config:', error);
            this.renderError(`解析命盤配置時發生錯誤: ${error.message}`);
        }
        // _isRendering will be set to false within _renderAstrolabeWithReact's final block or error handlers
        // For synchronous errors here, set it.
        if(this._isRendering) { // if not cleared by async _renderAstrolabeWithReact
            this._isRendering = false;
        }
        console.log('[ZiweiChart INSTANCE] _parseAndRender FINISHED processing.');
    }
    
    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact CALLED with payload.');
        // console.debug('  Payload details:', JSON.stringify(payload)); // For deep debugging if needed

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

        // Use iztro.Astrolabe (assuming this is the main chart component from react-iztro)
        const AstrolabeComponent = iztro.Astrolabe; 
        if (typeof AstrolabeComponent === 'undefined') {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: CRITICAL - AstrolabeComponent (iztro.Astrolabe) is UNDEFINED!');
            this.renderError('命盤核心組件 (iztro.Astrolabe) 未能正確載入。');
            this._isRendering = false;
            return;
        }
        
        // Destructure payload with defaults for safety
        const { 
            birthDate, // Expected: YYYY-MM-DD string
            birthTime, // Expected: number (0-23)
            gender,    // Expected: "M" or "F"
            solar = true, 
            lang = 'zh-CN', // Default to Simplified Chinese if not provided
            fixLeap = false, // For lunar calendar leap months
            // palaces, // Optional: pre-calculated palace data (not typically used with react-iztro component)
            options: payloadOptions = {} // Options for react-iztro itself
        } = payload;

        // --- Input Validation ---
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

        // --- Prepare Props for react-iztro's Astrolabe component ---
        const chartDataProps = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female', // react-iztro expects 'male'/'female'
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang, // 'zh-CN', 'zh-TW', 'en'
            fixedLeap: fixLeap, // boolean
            // palaces: palaces, // if you were to pass pre-calculated data
        };
        
        // Default options for react-iztro, merged with any payloadOptions
        // YOU MUST CHECK react-iztro DOCUMENTATION FOR THE CORRECT AND AVAILABLE OPTIONS.
        const iztroComponentOptions = {
             theme: 'default', // This will be styled by customChartStyles
             // --- Common react-iztro options (VERIFY THESE NAMES AND EXISTENCE) ---
             // showFullAstrolabe: true,    // Might control overall visibility
             // showPalaceName: true,       //宫位名称
             // showStars: true,            //星曜
             // showMutagens: true,         //四化
             // showBrightness: true,       //亮度
             // showFiveElementsClass: true,//五行局
             // showChineseDate: true,      //农历日期
             // showDecadalScope: true,     //大限
             // showYearlyScope: true,      //流年
             // showMonthlyScope: false,    //流月 (typically less common on main chart)
             // showDailyScope: false,      //流日
             // showHourlyScope: false,     //流时
             // responsive: true, // If react-iztro has its own responsive handling
             // --- Example of passing a custom click handler if supported ---
             // onPalaceClick: (palaceData, event) => {
             //   console.log('[ZiweiChart] Palace Clicked:', palaceData);
             //   this.dispatchEvent(new CustomEvent('palaceclick', { detail: palaceData, bubbles: true, composed: true }));
             // },
             ...payloadOptions, // Payload options can override defaults
        };

        const finalProps = { ...chartDataProps, options: iztroComponentOptions };

        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final props for Astrolabe:', JSON.stringify(finalProps));
        this.renderPlaceholder("正在生成命盤，請稍候..."); // Update placeholder

        // Use setTimeout to allow the placeholder message to render before potentially blocking React render.
        setTimeout(() => {
            if (!this._reactRoot) { // Re-check root, in case of unmount during timeout
                console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact (timeout): _reactRoot became null before rendering!');
                this.renderError('渲染命盤前 React Root 丟失 (timeout)。', true);
                this._isRendering = false;
                return;
            }
            try {
                const astrolabeElement = React.createElement(AstrolabeComponent, finalProps);
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
                this._isRendering = false; // Ensure rendering flag is reset
                console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact (timeout): Rendering process finished.');
            }
        }, 50); // Small delay (e.g., 50ms) to ensure UI update for placeholder
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
            const key = `placeholder-${Date.now()}`; // Unique key to ensure re-render
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
        
        if (!renderTarget && isCritical) { // Critical error, and render target itself is missing
            this.shadowRoot.innerHTML = `<style>.error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; }</style><div class="message-display-in-shadow error-message-in-shadow">FATAL: ${message} (No render target in Shadow DOM)</div>`;
            console.error("Critical error rendered directly to Shadow DOM root due to missing target.");
            return;
        }

        if (this._reactRoot && !isCritical) { 
            try { 
                const key = `error-${Date.now()}`; // Unique key
                this._reactRoot.render(React.createElement('div', { key, className: 'message-display-in-shadow error-message-in-shadow' }, message)); 
            } catch (e) { 
                 console.error('[ZiweiChart INSTANCE] renderError: Error rendering error message with React:', e);
                 if(renderTarget) renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React error: ${e.message})</div>`;
            }
        } else if (renderTarget) { // Fallback to direct HTML injection if React root issue or critical
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
        // Fallback: display error on the page if possible, for diagnosis
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