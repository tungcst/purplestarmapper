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

// --- 極簡化的 customChartStyles (用於排錯，讓元素強制可見) ---
const customChartStyles = `
  :host {
    font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Heiti TC", sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: #333;
    border: 2px solid red !important; 
    display: block !important; 
    padding: 5px !important; 
    min-height: 300px; /* 給 host 一個最小高度 */
    width: 100%;
  }

  .iztro-astrolabe-theme-default {
    --iztro-star-font-size-big: 13px;
    --iztro-star-font-size-small: 11px;
    --iztro-color-major: #531dab;
    --iztro-color-text: #333333;
    --iztro-color-border: #cccccc;
    border: 1px dashed blue !important; 
    padding: 5px !important; 
    min-height: 200px !important; 
    background-color: #f0f0f0 !important; 
    width: 100% !important; /* 確保容器寬度 */
    box-sizing: border-box !important;
  }

  .iztro-palace {
    border: 1px solid green !important; 
    padding: 3px !important; 
    margin: 2px !important; 
    min-height: 50px !important; 
    background-color: #ffffff !important; 
    display: block !important; /* 改為 block，讓它們堆疊 */
    width: auto !important; /* 寬度自動，或設為 100% 看效果 */
    float: none !important; /* 清除可能的浮動 */
  }

  .iztro-star {
    color: #000000 !important; 
    display: inline !important; /* 保持 inline，但父容器是 block */
    margin-right: 3px !important;
    font-size: 12px !important; /* 強制字號 */
  }

  .iztro-palace-name,
  .iztro-palace-gz,
  .iztro-star-brightness,
  .iztro-star-mutagen,
  .iztro-palace-scope,
  .iztro-palace-fate {
    color: #111111 !important; 
    display: block !important; 
    background-color: #e9e9e9 !important; 
    margin-bottom: 2px !important;
    font-size: 10px !important; /* 強制字號 */
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
                    display: block; /* 已在 customChartStyles 中設定 */
                    width: 100%; 
                    /* padding: 0; */ /* 已在 customChartStyles 中設定 */
                    box-sizing: border-box; 
                }
                ${antdResetCSS}
                ${reactIztroDefaultCSS}
                ${customChartStyles} /* 使用極簡化的 CSS */

                .chart-wrapper-inside-shadow-dom { 
                    width: 100%; 
                    min-height: 580px;
                    display: flex; 
                    flex-direction: column; 
                    justify-content: flex-start; 
                    align-items: stretch; 
                    border: 2px dashed dodgerblue !important; 
                    padding: 10px; 
                    box-sizing: border-box; 
                    background-color: #fff; /* 改回白色背景，避免與命盤背景混淆 */
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
            if (renderTarget && ReactDOM.createRoot && !this._reactRoot) { // 再次檢查 this._reactRoot
                console.log('[ZiweiChart INSTANCE] _ensureReactRoot: React Root is null. Primary creation should be in connectedCallback.');
                // 不要在此處主動創建，讓 connectedCallback 處理
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
                if (this._reactRoot) { // 只有在 root 存在時才清空
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
        if (this._isRendering && this._currentConfigString === configString) { // 避免重複渲染相同內容
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: Already rendering or same config, skipping.');
            return;
        }
        this._isRendering = true;
        this._currentConfigString = configString; // 更新當前配置

        if (!this._ensureReactRoot()) { 
            this.renderError('配置解析前，渲染引擎初始化失敗。');
            this._isRendering = false;
            return;
        }

        if (!configString) {
            console.warn('[ZiweiChart INSTANCE] _parseAndRender: configString is empty/null.');
            if (this._reactRoot) this.renderError('配置為空。'); // 只有在 root 存在時才渲染錯誤信息
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
        
        const { birthDate, birthTime, gender, solar, lang, fixLeap } = payload; // 移除 minute, palaces, options: payloadOptions 以簡化
        const iztroBirthTimeNum = parseInt(birthTime, 10);
        if (isNaN(iztroBirthTimeNum)) {
            console.error(`[ZiweiChart INSTANCE] _renderAstrolabeWithReact: birthTime "${birthTime}" is NaN.`);
            if (this._reactRoot) this.renderError(`時辰數據錯誤: "${birthTime}".`);
            return;
        }

        // --- ★★★ 優先測試：只傳遞最核心、最不可能出錯的 Props ★★★ ---
        const finalProps = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-CN'),
            fixLeap: fixLeap === true, // 確保是布林值
            // theme: 'default', // 許多函式庫會直接接受 theme prop
        };
        // 暫時不傳遞 options: iztroComponentOptions 或攤平的 iztroComponentOptions
        // 先確保最基本的數據能讓組件渲染出來

        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final simplified props for Astrolabe:', JSON.stringify(finalProps));

        try {
            if (!this._reactRoot) { // 再次檢查，以防萬一
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
        // 確保在 renderPlaceholder 時 _reactRoot 存在
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
        // 確保在 renderError 時 _reactRoot 存在 (除非是嚴重到無法建立 root 的情況)
        const renderTarget = this.shadowRoot.getElementById('chart-render-target');
        if (!this._reactRoot && !isCritical) {
             if (renderTarget) {
                renderTarget.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React root not ready for error)</div>`;
            }
            console.warn('[ZiweiChart INSTANCE] renderError: _reactRoot is null (non-critical).');
            return;
        }
        if (!renderTarget && isCritical) { // 如果連 target 都沒有了
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
        } else if (renderTarget) { // Critical error or no React root, use direct HTML
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