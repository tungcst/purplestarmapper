cat << 'EOF' > src/ziwei-chart.js
// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro';

class ZiweiChart extends HTMLElement {
    static get observedAttributes() {
        return ['data-config'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; width: 100%; }
                .chart-container-wrapper {
                    width: 100%;
                    min-height: 550px; /* 確保有足夠高度容納命盤 */
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start; /* 從頂部開始 */
                    align-items: center;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    border: 1px solid #e0e0e0;
                    box-sizing: border-box;
                    padding: 15px;
                    background-color: #fdfdfd;
                }
                .loading-message, .error-message {
                    font-size: 1.1em;
                    color: #333;
                    text-align: center;
                    margin-top: 20px;
                }
                .error-message {
                    color: #d9534f;
                }
                h2 {
                    color: #333; /* 深灰色標題 */
                    margin-bottom: 12px;
                    font-size: 1.4em;
                    font-weight: 600;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 8px;
                }
                p {
                    font-size: 0.95em;
                    margin: 6px 0;
                    line-height: 1.5;
                    color: #454545;
                }
                .palace-info-container {
                    width: 100%;
                    max-width: 700px; /* 限制內容最大寬度 */
                }
                .palace-info {
                    margin-bottom: 8px;
                    padding: 8px 12px;
                    border: 1px solid #f0f0f0;
                    border-radius: 4px;
                    background-color: #ffffff;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }
                /* 可以添加 iztro.Astrolabe 可能需要的基礎樣式或覆蓋 */
                .iztro-astrolabe { /* 這是 react-iztro 的 Astrolabe 組件的根 class */
                    /* 如果你需要調整它的大小或樣式，可以在這裡嘗試 */
                    /* 例如： width: 100% !important; max-width: 600px !important; */
                }
            </style>
            <div id="chart-host" class="chart-container-wrapper">
                <div class="loading-message">正在初始化命盤組件...</div>
            </div>
        `;
        console.log('[ZiweiChart CE] Constructor executed.');
        this._reactRoot = null;
        this._currentConfigString = null; // 用於比較配置字符串是否變化
        this._isRendering = false; // 防止並發渲染
    }

    connectedCallback() {
        console.log('[ZiweiChart CE] Connected to DOM.');
        const hostElement = this.shadowRoot.getElementById('chart-host');
        if (ReactDOM.createRoot) {
            this._reactRoot = ReactDOM.createRoot(hostElement);
            console.log('[ZiweiChart CE] React root created.');
        } else {
            console.error('[ZiweiChart CE] ReactDOM.createRoot is not available. Ensure React 18 is loaded.');
            hostElement.innerHTML = '<div class="error-message">React 環境初始化失敗。</div>';
            return;
        }

        const initialConfig = this.getAttribute('data-config');
        if (initialConfig) {
            console.log('[ZiweiChart CE] Initial data-config found on connect:', initialConfig.substring(0, 150) + "...");
            this._parseAndRender(initialConfig);
        } else {
             this.renderPlaceholder("等待配置數據...");
        }
    }

    disconnectedCallback() {
        console.log('[ZiweiChart CE] Disconnected from DOM.');
        if (this._reactRoot && typeof this._reactRoot.unmount === 'function') {
            this._reactRoot.unmount();
            console.log('[ZiweiChart CE] React root unmounted.');
        }
        this._reactRoot = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`[ZiweiChart CE] Attribute '${name}' changed from (oldValue type: ${typeof oldValue}) to (newValue type: ${typeof newValue})`);
        if (name === 'data-config' && newValue !== null && newValue !== undefined) {
            if (newValue !== this._currentConfigString) { // 只有當字符串確實改變時才處理
                console.log(`[ZiweiChart CE] data-config new value (first 150 chars): ${newValue.substring(0,150)}...`);
                this._parseAndRender(newValue);
            } else {
                console.log('[ZiweiChart CE] data-config received the same string value. Skipping re-parse and re-render.');
            }
        } else if (name === 'data-config' && (newValue === null || newValue === undefined)) {
            console.log('[ZiweiChart CE] data-config attribute removed or set to null/undefined. Clearing chart.');
            this.renderPlaceholder("配置數據已移除。");
            this._currentConfigString = null;
        }
    }

    _parseAndRender(configString) {
        if (this._isRendering) {
            console.warn('[ZiweiChart CE] Rendering is already in progress. Skipping this call.');
            return;
        }
        this._isRendering = true;
        this._currentConfigString = configString; // 更新當前配置字符串

        if (!configString) {
            console.warn('[ZiweiChart CE] Received empty or null config string.');
            this.renderError('配置數據為空。');
            this._isRendering = false;
            return;
        }

        try {
            const config = JSON.parse(configString);
            console.log('[ZiweiChart CE] Successfully parsed data-config JSON:', config);

            if (config && config.type === 'RENDER_CHART' && config.payload) {
                this._renderAstrolabeWithReact(config.payload);
            } else {
                // 這一行是關鍵，它在「這個」代碼塊中是第 134 行
                console.warn('[ZiweiChart CE] Invalid config structure or type. Expected { type: "RENDER_CHART", payload: {...} }. Received:', config);
                this.renderError('命盤配置數據格式無效。');
            }
        } catch (error) {
            console.error('[ZiweiChart CE] Error parsing data-config JSON:', error, 'Received string (first 200 chars):', configString.substring(0, 200) + "...");
            this.renderError(`解析命盤配置時出錯: ${error.message}`);
        } finally {
            this._isRendering = false;
        }
    }

    _renderAstrolabeWithReact(payload) {
        if (!this._reactRoot) {
            console.error('[ZiweiChart CE] React root not initialized in _renderAstrolabeWithReact.');
            this.renderError('渲染引擎未就緒 (React Root)。', true);
            return;
        }

        if (!payload) {
            console.warn('[ZiweiChart CE] _renderAstrolabeWithReact received empty payload.');
            this.renderError('命盤數據為空。');
            return;
        }

        console.log('[ZiweiChart CE] Attempting to render Astrolabe with payload:', payload);

        if (typeof iztro === 'undefined' || typeof iztro.Astrolabe === 'undefined') {
            console.error('[ZiweiChart CE] iztro library or iztro.Astrolabe component is not available. Ensure react-iztro is correctly bundled and exposed via `import * as iztro from "react-iztro";`.');
            this.renderError('命盤核心組件 (iztro.Astrolabe) 未能加載。');
            return;
        }

        const { birthDate, birthTime, gender, service, solar, lang } = payload;

        const iztroInputOptions = {
            birthday: birthDate, 
            birthTime: parseInt(birthTime, 10), 
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-TW'),
        };

        console.log('[ZiweiChart CE] Options for iztro.Astrolabe:', iztroInputOptions);

        try {
            const astrolabeComponent = React.createElement(iztro.Astrolabe, iztroInputOptions);
            this._reactRoot.render(astrolabeComponent);
            console.log('[ZiweiChart CE] Astrolabe rendering initiated successfully.');

        } catch (error) {
            console.error('[ZiweiChart CE] Error rendering Astrolabe with React:', error);
            this.renderError(`渲染命盤時發生內部錯誤: ${error.message}`);
        }
    }
    
    renderPlaceholder(message) {
        if (this._reactRoot) {
            this._reactRoot.render(React.createElement('div', { className: 'loading-message' }, message));
        } else {
            const hostElement = this.shadowRoot.getElementById('chart-host');
            if(hostElement) hostElement.innerHTML = `<div class="loading-message">${message}</div>`;
        }
        console.log(`[ZiweiChart CE] Placeholder rendered: ${message}`);
    }

    renderError(message, renderInHost = false) {
        if (this._reactRoot && !renderInHost) {
            this._reactRoot.render(React.createElement('div', { className: 'error-message' }, message));
        } else {
            const hostElement = this.shadowRoot.getElementById('chart-host');
            if(hostElement) hostElement.innerHTML = `<div class="error-message">${message}</div>`;
        }
        console.error(`[ZiweiChart CE] Error displayed: ${message}`);
    }
}

if (!customElements.get('ziwei-chart')) {
    customElements.define('ziwei-chart', ZiweiChart);
    console.log('[ZiweiChart CE] Custom element "ziwei-chart" defined successfully.');
} else {
    console.warn('[ZiweiChart CE] Custom element "ziwei-chart" already defined. This might be due to HMR or multiple script loads.');
}
EOF