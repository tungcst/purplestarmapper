// bundler/src/ziwei-chart.js (Complete file with extensive logging and injected CSS)
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro';

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
console.log('[ZiweiChart CE SCRIPT] iztro library object:', iztro); // 檢查 iztro 是否真的被導入了

// 從 antd@5.x (一個常見的較新版本) 的 reset.css 獲取的內容，確保基礎樣式一致性
// 來源: https://unpkg.com/antd@5.17.0/dist/reset.css (您可以檢查此鏈接以獲取最新或特定版本的 reset.css)
// 為了簡潔，這裡只包含核心的 reset 部分，您可以根據需要擴展。
// 更好的做法是如果 antd 是項目依賴，可以從 node_modules 中找到並讀取。
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

// 您提供的 react-iztro 的 default.css 內容
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

.iztro-astrolabe {
  text-align: left;
}

.iztro-palace {
  border: 1px solid var(--iztro-color-border);
}

.iztro-star-soft,
.iztro-star-tough,
.iztro-star-adjective,
.iztro-star-flower,
.iztro-star-helper,
.iztro-palace-fate,
.iztro-palace-horo-star,
.iztro-palace-scope,
.iztro-palace-dynamic-name,
.iztro-palace-lft24,
.iztro-palace-rgt24 {
  font-size: var(--iztro-star-font-size-small);
  font-weight: normal;
  text-wrap: nowrap;
}
.iztro-palace-scope-age {
  text-wrap: balance;
}
.iztro-palace-scope-age,
.iztro-palace-scope-decadal {
  color: var(--iztro-color-text);
}

.iztro-palace-lft24 {
  color: var(--iztro-color-decorator-1);
}
.iztro-palace-rgt24 {
  color: var(--iztro-color-decorator-2);
  text-wrap: nowrap;
}

.iztro-star-major,
.iztro-star-tianma,
.iztro-star-lucun,
.iztro-palace-name,
.iztro-palace-gz {
  font-size: var(--iztro-star-font-size-big);
  font-weight: bold;
}

.iztro-star-tianma {
  color: var(--iztro-color-active);
}
.iztro-star-lucun {
  color: var(--iztro-color-awesome);
}

.iztro-palace-horo-star .iztro-star {
  opacity: 0.75;
}
.iztro-palace-horo-star .iztro-star-tianma,
.iztro-palace-horo-star .iztro-star-lucun {
  font-weight: normal;
  font-size: var(--iztro-star-font-size-small);
}

.iztro-star-brightness,
.iztro-star-adjective {
  font-style: normal;
  font-weight: normal;
  color: var(--iztro-color-text);
}

.iztro-star-brightness {
  opacity: 0.5;
}

.iztro-star-major,
.iztro-star-soft,
.iztro-palace-name {
  color: var(--iztro-color-major);
}
.iztro-star-tough {
  color: var(--iztro-color-tough);
}
.iztro-star-flower {
  color: var(--iztro-color-happy);
}
.iztro-star-helper,
.iztro-palace-gz {
  color: var(--iztro-color-nice);
}

.iztro-star-mutagen.mutagen-0 {
  background-color: var(--iztro-color-awesome);
}
.iztro-star-mutagen.mutagen-1 {
  background-color: var(--iztro-color-quan);
}
.iztro-star-mutagen.mutagen-2 {
  background-color: var(--iztro-color-nice);
}
.iztro-star-mutagen.mutagen-3 {
  background-color: var(--iztro-color-focus);
}

.iztro-star-mutagen.mutagen-decadal {
  background-color: var(--iztro-color-decadal);
  opacity: 0.6;
}
.iztro-star-mutagen.mutagen-yearly {
  background-color: var(--iztro-color-yearly);
  opacity: 0.6;
}
.iztro-star-mutagen.mutagen-monthly {
  background-color: var(--iztro-color-monthly);
  opacity: 0.6;
}
.iztro-star-mutagen.mutagen-daily {
  background-color: var(--iztro-color-daily);
  opacity: 0.6;
}
.iztro-star-mutagen.mutagen-hourly {
  background-color: var(--iztro-color-hourly);
  opacity: 0.6;
}

.iztro-palace-gz .iztro-palace-gz-active {
  background-color: var(--iztro-color-nice);
  color: #fff;
  font-weight: normal;
}

.iztro-star-mutagen-0 {
  background-color: var(--iztro-color-awesome);
  color: #fff;
  font-weight: normal;
}

.iztro-star-mutagen-1 {
  background-color: var(--iztro-color-quan);
  color: #fff;
  font-weight: normal;
}

.iztro-star-mutagen-2 {
  background-color: var(--iztro-color-nice);
  color: #fff;
  font-weight: normal;
}

.iztro-star-mutagen-3 {
  background-color: var(--iztro-color-focus);
  color: #fff;
  font-weight: normal;
}

.iztro-star-self-mutagen-0::before {
  background-color: var(--iztro-color-awesome);
}
.iztro-star-self-mutagen-1::before {
  background-color: var(--iztro-color-quan);
}
.iztro-star-self-mutagen-2::before {
  background-color: var(--iztro-color-nice);
}
.iztro-star-self-mutagen-3::before {
  background-color: var(--iztro-color-focus);
}

.iztro-star-hover-mutagen-0::after {
  background-color: var(--iztro-color-awesome);
}
.iztro-star-hover-mutagen-1::after {
  background-color: var(--iztro-color-quan);
}
.iztro-star-hover-mutagen-2::after {
  background-color: var(--iztro-color-nice);
}
.iztro-star-hover-mutagen-3::after {
  background-color: var(--iztro-color-focus);
}

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

.iztro-palace-center-item label {
  color: var(--iztro-color-text);
}

.iztro-palace-center-item span {
  color: var(--iztro-color-decorator-1);
}

.gender {
  display: inline-block;
  margin-right: 5px;
}
.gender.gender-male {
  color: var(--iztro-color-quan);
}
.gender.gender-female {
  color: var(--iztro-color-happy);
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
                /* Host styles */
                :host {
                    display: block;
                    width: 100%;
                    min-height: 500px; /* Ensure host has some size */
                    border: 3px solid deeppink; /* Very visible host border for debugging */
                    padding: 5px;
                    box-sizing: border-box;
                }

                /* Injected Ant Design Reset CSS */
                ${antdResetCSS}

                /* Injected react-iztro default theme CSS */
                ${reactIztroDefaultCSS}

                /* Container for the chart inside Shadow DOM */
                .chart-wrapper-inside-shadow-dom {
                    width: 100%;
                    min-height: 580px; /* Slightly less than host to see padding */
                    display: flex;
                    flex-direction: column;
                    justify-content: center; /* Try to center content */
                    align-items: center;
                    border: 2px dashed dodgerblue; /* Visible border for this inner container */
                    padding: 10px;
                    box-sizing: border-box;
                    background-color: #f0f0f0; /* Light background for visibility */
                }
                .message-display-in-shadow {
                    font-size: 16px;
                    padding: 20px;
                    border-radius: 4px;
                    text-align: center;
                }
                .loading-message-in-shadow {
                    background-color: #e9e9e9;
                    color: #333;
                }
                .error-message-in-shadow {
                    background-color: #ffebee;
                    color: #c62828;
                    border: 1px solid #c62828;
                }
            </style>
            <div id="chart-render-target" class="chart-wrapper-inside-shadow-dom">
                <div class="message-display-in-shadow loading-message-in-shadow">命盤組件初始化 (Constructor)...</div>
            </div>
        `;
        console.log('[ZiweiChart INSTANCE] constructor: Initial Shadow DOM HTML (with styles and target div) set.');

        this._reactRoot = null;
        this._currentConfigString = null;
        this._isRendering = false;
    }

    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED - Element has been connected to the DOM.');
        const renderTarget = this.shadowRoot.getElementById('chart-render-target');

        if (!renderTarget) {
            console.error('[ZiweiChart INSTANCE] connectedCallback: CRITICAL - #chart-render-target element NOT FOUND in Shadow DOM!');
            // Try to display error directly in shadow DOM if possible
            this.shadowRoot.innerHTML = `<div style="color:red; padding:20px; border:1px solid red;">Error: Chart render target not found!</div>`;
            return;
        }
        console.log('[ZiweiChart INSTANCE] connectedCallback: #chart-render-target element found.');

        if (ReactDOM.createRoot) {
            this._reactRoot = ReactDOM.createRoot(renderTarget);
            console.log('[ZiweiChart INSTANCE] connectedCallback: React root CREATED on #chart-render-target.');
        } else {
            console.error('[ZiweiChart INSTANCE] connectedCallback: ReactDOM.createRoot is not available. Ensure React 18+ is correctly bundled.');
            renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">React 環境錯誤 (createRoot不可用)。</div>`;
            return;
        }

        const initialConfig = this.getAttribute('data-config');
        if (initialConfig) {
            console.log('[ZiweiChart INSTANCE] connectedCallback: Initial data-config FOUND. Value (first 100):', initialConfig.substring(0, 100));
            this._parseAndRender(initialConfig);
        } else {
            console.log('[ZiweiChart INSTANCE] connectedCallback: NO initial data-config. Rendering placeholder.');
            this.renderPlaceholder("等待命盤數據 (connectedCallback)...");
        }
        console.log('[ZiweiChart INSTANCE] connectedCallback FINISHED.');
    }

    disconnectedCallback() {
        console.log('[ZiweiChart INSTANCE] disconnectedCallback CALLED - Element has been disconnected from the DOM.');
        if (this._reactRoot && typeof this._reactRoot.unmount === 'function') {
            try {
                this._reactRoot.unmount();
                console.log('[ZiweiChart INSTANCE] disconnectedCallback: React root unmounted.');
            } catch (e) {
                console.error('[ZiweiChart INSTANCE] disconnectedCallback: Error during React root.unmount():', e);
            }
        }
        this._reactRoot = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback CALLED for attribute: ${name}`);
        // console.log(`  Old value (type ${typeof oldValue}, first 50):`, oldValue ? oldValue.substring(0, 50) + '...' : oldValue);
        // console.log(`  New value (type ${typeof newValue}, first 50):`, newValue ? newValue.substring(0, 50) + '...' : newValue);

        if (name === 'data-config') {
            if (newValue === null || newValue === undefined) {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config is now null/undefined. Clearing chart.');
                this.renderPlaceholder("命盤配置已移除 (attributeChangedCallback).");
                this._currentConfigString = null;
            } else if (newValue !== this._currentConfigString) {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config has a NEW value. Processing...');
                this._parseAndRender(newValue);
            } else {
                console.log('[ZiweiChart INSTANCE] attributeChangedCallback: data-config value is the SAME as current. Skipping re-render.');
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

        if (!configString) {
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: configString is empty/null.');
            this.renderError('命盤配置錯誤：數據為空。');
            this._isRendering = false;
            return;
        }

        let config;
        try {
            config = JSON.parse(configString);
            console.log('[ZiweiChart INSTANCE] _parseAndRender: JSON.parse successful. Parsed config:', config);
        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _parseAndRender: ERROR parsing JSON from configString:', error);
            this.renderError(`解析配置錯誤: ${error.message}`);
            this._isRendering = false;
            return;
        }

        if (config && config.type === 'RENDER_CHART' && config.payload) {
            console.log('[ZiweiChart INSTANCE] _parseAndRender: Valid config.type and payload. Calling _renderAstrolabeWithReact.');
            this._renderAstrolabeWithReact(config.payload);
        } else {
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: Invalid config structure. Expected {type: "RENDER_CHART", payload: Object}, Received:', config);
            this.renderError('命盤配置格式不正確。');
        }
        this._isRendering = false;
        console.log('[ZiweiChart INSTANCE] _parseAndRender FINISHED.');
    }

    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact CALLED. Payload:', JSON.stringify(payload));

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

        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Checking iztro & iztro.Astrolabe availability...');
        if (typeof Astrolabe === 'undefined') { // 只檢查 Astrolabe
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: CRITICAL - Astrolabe component is UNDEFINED! (Direct import failed)');
            this.renderError('命盤核心組件 (Astrolabe) 未能加載。');
            return;
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Astrolabe component IS AVAILABLE (direct import).');
        const { birthDate, birthTime, gender, solar, lang } = payload;
        console.log(`[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Destructured props - birthDate: ${birthDate}, birthTime: ${birthTime} (type: ${typeof birthTime}), gender: ${gender}, solar: ${solar}, lang: ${lang}`);

        const iztroBirthTimeNum = parseInt(birthTime, 10);
        if (isNaN(iztroBirthTimeNum)) {
            console.error(`[ZiweiChart INSTANCE] _renderAstrolabeWithReact: birthTime "${birthTime}" is Not a Number after parseInt.`);
            this.renderError(`出生時辰數據轉換錯誤: "${birthTime}".`);
            return;
        }
        console.log(`[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Parsed iztroBirthTimeNum: ${iztroBirthTimeNum} (type: ${typeof iztroBirthTimeNum})`);

        const iztroInputOptions = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-TW'),
            // config: { astrolabe: { width: 550, height: 750 } } // 可以嘗試強制設定大小
        };
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final options for iztro.Astrolabe:', JSON.stringify(iztroInputOptions));

        try {
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Attempting React.createElement for iztro.Astrolabe...');
            const astrolabeElement = React.createElement(Astrolabe, iztroInputOptions); // 直接使用
            //             console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React.createElement result:', astrolabeElement ? 'Component created' : 'FAILED to create component');

            if (!astrolabeElement) {
                 console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React.createElement returned null/undefined for iztro.Astrolabe. Cannot render.');
                 this.renderError('無法創建命盤圖表組件實例。');
                 return;
            }

            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Attempting this._reactRoot.render(astrolabeElement)...');
            this._reactRoot.render(astrolabeElement);
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React render() call for Astrolabe executed. UI should update.');

        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: >>> EXCEPTION during React rendering <<<');
            console.error('  Error Name:', error.name);
            console.error('  Error Message:', error.message);
            if (error.stack) {
                console.error('  Error Stack:', error.stack);
            }
            this.renderError(`渲染命盤時發生嚴重錯誤: ${error.message}.`);
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact FINISHED.');
    }

    renderPlaceholder(message) {
        console.log(`[ZiweiChart INSTANCE] renderPlaceholder CALLED. Message: "${message}"`);
        const target = this.shadowRoot.getElementById('chart-render-target');
        if (!target) {
            console.error('[ZiweiChart INSTANCE] renderPlaceholder: #chart-render-target NOT FOUND for placeholder.');
            return;
        }
        if (this._reactRoot) {
            try {
                this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message));
            } catch (e) {
                target.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React render failed for placeholder)</div>`;
            }
        } else {
            target.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React root not ready for placeholder)</div>`;
        }
    }

    renderError(message, isCritical = false) {
        console.error(`[ZiweiChart INSTANCE] renderError CALLED. Message: "${message}", isCritical: ${isCritical}`);
        const target = this.shadowRoot.getElementById('chart-render-target');
        if (!target) {
            console.error('[ZiweiChart INSTANCE] renderError: #chart-render-target NOT FOUND for error message.');
            // If even the target is gone, this is a major issue with shadow DOM setup
            if (isCritical) this.shadowRoot.innerHTML = `<div style="color:red; padding:20px; border:1px solid red;">FATAL ERROR: ${message}</div>`;
            return;
        }
        if (this._reactRoot && !isCritical) {
            try {
                this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message));
            } catch (e) {
                target.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React render failed for error)</div>`;
            }
        } else {
            target.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React root not ready or critical error)</div>`;
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
    console.warn('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" was ALREADY DEFINED. This might indicate multiple script loads or HMR issues.');
}
console.log('[ZiweiChart CE SCRIPT] Top-level script execution FINISHED.');