// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// import * as iztro from 'react-iztro'; // <--- 將這一行註釋掉或刪除
import { Astrolabe } from 'react-iztro'; // <--- 確保這一行是有效的

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM imported.');
// 下面兩行是新的，用來檢查直接導入的 Astrolabe
console.log('[ZiweiChart CE SCRIPT] Type of directly imported Astrolabe:', typeof Astrolabe);
console.log('[ZiweiChart CE SCRIPT] Value of directly imported Astrolabe:', Astrolabe);

// antdResetCSS 和 reactIztroDefaultCSS 保持不變...
// class ZiweiChart extends HTMLElement { ...

// ... (antdResetCSS 和 reactIztroDefaultCSS 保持不變，從我上次提供的代碼中複製過來)
const antdResetCSS = `
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-family: sans-serif; /* 1 */
  line-height: 1.15; /* 2 */
  -webkit-text-size-adjust: 100%; /* 3 */
  -ms-text-size-adjust: 100%; /* 3 */
  -ms-overflow-style: scrollbar; /* 4 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 5 */
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 14px;
  line-height: 1.5715;
  color: rgba(0,0,0,.85);
  background-color: #fff;
}
`;
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
.iztro-star-soft, .iztro-star-tough, .iztro-star-adjective, .iztro-star-flower, .iztro-star-helper, .iztro-palace-fate, .iztro-palace-horo-star, .iztro-palace-scope, .iztro-palace-dynamic-name, .iztro-palace-lft24, .iztro-palace-rgt24 { font-size: var(--iztro-star-font-size-small); font-weight: normal; text-wrap: nowrap; }
.iztro-palace-scope-age { text-wrap: balance; }
.iztro-palace-scope-age, .iztro-palace-scope-decadal { color: var(--iztro-color-text); }
.iztro-palace-lft24 { color: var(--iztro-color-decorator-1); }
.iztro-palace-rgt24 { color: var(--iztro-color-decorator-2); text-wrap: nowrap; }
.iztro-star-major, .iztro-star-tianma, .iztro-star-lucun, .iztro-palace-name, .iztro-palace-gz { font-size: var(--iztro-star-font-size-big); font-weight: bold; }
.iztro-star-tianma { color: var(--iztro-color-active); }
.iztro-star-lucun { color: var(--iztro-color-awesome); }
.iztro-palace-horo-star .iztro-star { opacity: 0.75; }
.iztro-palace-horo-star .iztro-star-tianma, .iztro-palace-horo-star .iztro-star-lucun { font-weight: normal; font-size: var(--iztro-star-font-size-small); }
.iztro-star-brightness, .iztro-star-adjective { font-style: normal; font-weight: normal; color: var(--iztro-color-text); }
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
.iztro-palace-gz .iztro-palace-gz-active { background-color: var(--iztro-color-nice); color: #fff; font-weight: normal; }
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
.iztro-palace-name-body { font-size: var(--iztro-star-font-size-small); font-weight: normal; position: absolute; margin-top: 2px; }
.iztro-palace-fate span { display: block; padding: 0 3px; border-radius: 4px; color: #fff; background-color: var(--iztro-color-major); cursor: pointer; }
.iztro-palace-center-item { font-size: var(--iztro-star-font-size-small); line-height: 22px; }
.iztro-palace-center-item label { color: var(--iztro-color-text); }
.iztro-palace-center-item span { color: var(--iztro-color-decorator-1); }
.gender { display: inline-block; margin-right: 5px; }
.gender.gender-male { color: var(--iztro-color-quan); }
.gender.gender-female { color: var(--iztro-color-happy); }
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
                :host { display: block; width: 100%; min-height: 500px; border: 3px solid deeppink; padding: 5px; box-sizing: border-box; }
                ${antdResetCSS}
                ${reactIztroDefaultCSS}
                .chart-wrapper-inside-shadow-dom { width: 100%; min-height: 580px; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 2px dashed dodgerblue; padding: 10px; box-sizing: border-box; background-color: #f0f0f0; }
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

    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED.');
        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        if (!renderTarget) {
            console.error('[ZiweiChart INSTANCE] connectedCallback: CRITICAL - #chart-render-target NOT FOUND.');
            this.shadowRoot.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">內部渲染目標丟失！</div>`;
            return;
        }
        console.log('[ZiweiChart INSTANCE] connectedCallback: #chart-render-target found.');
        if (ReactDOM.createRoot) {
            this._reactRoot = ReactDOM.createRoot(renderTarget);
            console.log('[ZiweiChart INSTANCE] connectedCallback: React root CREATED.');
        } else {
            console.error('[ZiweiChart INSTANCE] connectedCallback: ReactDOM.createRoot is UNDEFINED.');
            renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">React 環境錯誤 (createRoot)。</div>`;
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

    disconnectedCallback() { /* ...內容與上次提供的一致，包含日誌... */ 
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
    }

    attributeChangedCallback(name, oldValue, newValue) { /* ...內容與上次提供的一致，包含日誌... */ 
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback CALLED for attribute: ${name}`);
        if (name === 'data-config') {
            if (newValue === null || newValue === undefined) {
                this.renderPlaceholder("命盤配置已移除 (attrChanged).");
                this._currentConfigString = null;
            } else if (newValue !== this._currentConfigString) {
                this._parseAndRender(newValue);
            }
        }
        console.log('[ZiweiChart INSTANCE] attributeChangedCallback FINISHED.');
    }

    _parseAndRender(configString) { /* ...內容與上次提供的一致，包含日誌... */ 
        console.log('[ZiweiChart INSTANCE] _parseAndRender CALLED.');
        if (this._isRendering) return;
        this._isRendering = true;
        this._currentConfigString = configString;
        if (!configString) {
            this.renderError('配置為空。');
            this._isRendering = false; return;
        }
        try {
            const config = JSON.parse(configString);
            console.log('[ZiweiChart INSTANCE] _parseAndRender: Parsed config:', config);
            if (config && config.type === 'RENDER_CHART' && config.payload) {
                this._renderAstrolabeWithReact(config.payload);
            } else {
                this.renderError('配置格式無效。');
            }
        } catch (error) {
            this.renderError(`解析配置錯誤: ${error.message}`);
        }
        this._isRendering = false;
        console.log('[ZiweiChart INSTANCE] _parseAndRender FINISHED.');
    }

    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact CALLED. Payload:', JSON.stringify(payload));
        console.log('[ZiweiChart INSTANCE] Type of Astrolabe in _renderAstrolabeWithReact:', typeof Astrolabe); // 檢查這裡的 Astrolabe
        console.log('[ZiweiChart INSTANCE] Value of Astrolabe in _renderAstrolabeWithReact:', Astrolabe);


        if (!this._reactRoot) {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React root is NOT INITIALIZED!');
            this.renderError('渲染引擎錯誤 (React Root丢失)。', true);
            return;
        }
        if (!payload) {
            console.warn('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Payload is empty.');
            this.renderError('命盤核心數據 (payload) 為空。');
            return;
        }

        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Checking Astrolabe component availability...');
        if (typeof Astrolabe === 'undefined') { // <--- 修改檢查目標
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: CRITICAL - Astrolabe component is UNDEFINED! (Direct import failed)');
            this.renderError('命盤核心組件 (Astrolabe) 未能加載。');
            return;
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Astrolabe component IS AVAILABLE.');

        const { birthDate, birthTime, gender, solar, lang } = payload;
        const iztroBirthTimeNum = parseInt(birthTime, 10);

        if (isNaN(iztroBirthTimeNum)) {
            console.error(`[ZiweiChart INSTANCE] _renderAstrolabeWithReact: birthTime "${birthTime}" is NaN.`);
            this.renderError(`時辰數據錯誤: "${birthTime}".`);
            return;
        }

        const iztroInputOptions = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-TW'),
        };
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final options for Astrolabe:', JSON.stringify(iztroInputOptions));

        try {
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Attempting React.createElement(Astrolabe)...');
            const astrolabeElement = React.createElement(Astrolabe, iztroInputOptions); // <--- 使用直接導入的 Astrolabe
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React.createElement result:', astrolabeElement ? 'Element created' : 'Element creation FAILED');

            if (!astrolabeElement) {
                 console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React.createElement(Astrolabe) returned null/undefined.');
                 this.renderError('無法創建命盤圖表實例。');
                 return;
            }

            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Attempting this._reactRoot.render()...');
            this._reactRoot.render(astrolabeElement);
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React render() call executed.');

        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: >>> EXCEPTION during React rendering <<<', error);
            this.renderError(`渲染命盤時發生內部錯誤: ${error.message}.`);
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact FINISHED.');
    }

    renderPlaceholder(message) { /* ...內容與上次提供的一致，包含日誌... */ 
        console.log(`[ZiweiChart INSTANCE] renderPlaceholder CALLED. Message: "${message}"`);
        const target = this.shadowRoot.getElementById('chart-render-target');
        if (!target) { console.error('Placeholder: Target not found'); return; }
        if (this._reactRoot) { try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message)); } catch (e) { target.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React err)</div>`;}
        } else { target.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (No React root)</div>`; }
    }

    renderError(message, isCritical = false) { /* ...內容與上次提供的一致，包含日誌... */ 
        console.error(`[ZiweiChart INSTANCE] renderError CALLED. Message: "${message}", isCritical: ${isCritical}`);
        const target = this.shadowRoot.getElementById('chart-render-target');
        if (!target) { console.error('ErrorMsg: Target not found'); if(isCritical) this.shadowRoot.innerHTML = `<div style="color:red;">FATAL: ${message}</div>`; return; }
        if (this._reactRoot && !isCritical) { try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message)); } catch (e) { target.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React err)</div>`; }
        } else { target.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (No React root or critical)</div>`; }
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