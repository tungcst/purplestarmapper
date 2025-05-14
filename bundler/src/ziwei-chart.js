// bundler/src/ziwei-chart.js (Complete file with added detailed logging)
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro'; // 確保 react-iztro 已安裝並可以導入

class ZiweiChart extends HTMLElement {
    static get observedAttributes() {
        return ['data-config']; // 監聽 data-config 屬性的變化
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // 開啟 Shadow DOM
        console.log('[ZiweiChart CE] Constructor: Shadow DOM attached.');

        // 初始化 Shadow DOM 的基本 HTML 結構和樣式
        this.shadowRoot.innerHTML = `
            <style>
                :host { 
                    display: block; 
                    width: 100%; 
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    border: 1px solid #ccc; /* 給組件本身一個邊框，方便調試時看到範圍 */
                    box-sizing: border-box;
                }
                .chart-container-wrapper {
                    width: 100%;
                    min-height: 600px; /* 增加最小高度確保有足夠空間 */
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 20px;
                    box-sizing: border-box;
                    border: 2px dashed blue; /* 給內部容器一個明顯邊框用於調試 */
                    background-color: #f9f9f9;
                }
                .message {
                    font-size: 1.2em;
                    color: #333;
                    text-align: center;
                    margin-top: 30px;
                    padding: 15px;
                    border-radius: 5px;
                }
                .loading-message {
                    background-color: #e0e0e0;
                }
                .error-message {
                    background-color: #ffdddd;
                    color: #d8000c;
                    border: 1px solid #d8000c;
                }
                /* react-iztro 的 Astrolabe 組件可能會生成自己的樣式，這裡可以嘗試覆蓋或補充 */
                .iztro-astrolabe {
                    /* 嘗試確保它能正確顯示，如果它依賴外部樣式，可能需要處理 */
                    /* 例如: border: 1px solid green; */
                }
            </style>
            <div id="chart-host" class="chart-container-wrapper">
                <div class="message loading-message">命盤組件正在初始化... (Constructor)</div>
            </div>
        `;
        console.log('[ZiweiChart CE] Constructor: Initial innerHTML set.');

        this._reactRoot = null; // 用於存儲 React Root 實例
        this._currentConfigString = null; // 用於比較 data-config 是否真的改變
        this._isRendering = false; // 防止並發渲染的標誌
    }

    connectedCallback() {
        console.log('[ZiweiChart CE] connectedCallback: Element connected to DOM.');
        const hostElement = this.shadowRoot.getElementById('chart-host');

        if (!hostElement) {
            console.error('[ZiweiChart CE] connectedCallback: CRITICAL - chart-host element NOT FOUND in Shadow DOM.');
            this.shadowRoot.innerHTML = '<div class="message error-message">內部錯誤：無法找到渲染目標。</div>';
            return;
        }
        console.log('[ZiweiChart CE] connectedCallback: chart-host element found.');

        if (ReactDOM.createRoot) {
            this._reactRoot = ReactDOM.createRoot(hostElement);
            console.log('[ZiweiChart CE] connectedCallback: React root created successfully.');
        } else {
            console.error('[ZiweiChart CE] connectedCallback: ReactDOM.createRoot is not available. Ensure React 18+ is loaded.');
            hostElement.innerHTML = '<div class="message error-message">React 環境初始化失敗 (createRoot 不可用)。</div>';
            return;
        }

        const initialConfig = this.getAttribute('data-config');
        if (initialConfig) {
            console.log('[ZiweiChart CE] connectedCallback: Initial data-config found. Value (first 150 chars):', initialConfig.substring(0, 150) + "...");
            this._parseAndRender(initialConfig);
        } else {
            console.log('[ZiweiChart CE] connectedCallback: No initial data-config found. Rendering placeholder.');
            this.renderPlaceholder("等待命盤配置數據...");
        }
    }

    disconnectedCallback() {
        console.log('[ZiweiChart CE] disconnectedCallback: Element disconnected from DOM.');
        if (this._reactRoot && typeof this._reactRoot.unmount === 'function') {
            try {
                this._reactRoot.unmount();
                console.log('[ZiweiChart CE] disconnectedCallback: React root unmounted successfully.');
            } catch (e) {
                console.error('[ZiweiChart CE] disconnectedCallback: Error during React root unmount:', e);
            }
        }
        this._reactRoot = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`[ZiweiChart CE] attributeChangedCallback: Attribute '${name}' changed.`);
        // console.log(`[ZiweiChart CE]   Old value (type ${typeof oldValue}):`, oldValue ? oldValue.substring(0,50) + "..." : oldValue);
        // console.log(`[ZiweiChart CE]   New value (type ${typeof newValue}):`, newValue ? newValue.substring(0,50) + "..." : newValue);

        if (name === 'data-config') {
            if (newValue === null || newValue === undefined) {
                console.log('[ZiweiChart CE] attributeChangedCallback: data-config removed or set to null/undefined. Clearing chart.');
                this.renderPlaceholder("命盤配置數據已移除。");
                this._currentConfigString = null;
            } else if (newValue !== this._currentConfigString) {
                console.log('[ZiweiChart CE] attributeChangedCallback: data-config new value received. Processing...');
                // console.log('[ZiweiChart CE] Full new data-config string:', newValue);
                this._parseAndRender(newValue);
            } else {
                console.log('[ZiweiChart CE] attributeChangedCallback: data-config received the same string value. Skipping re-parse and re-render.');
            }
        }
    }

    _parseAndRender(configString) {
        console.log('[ZiweiChart CE] _parseAndRender: Called with configString (first 150 chars):', configString ? configString.substring(0, 150) + "..." : "null/undefined");

        if (this._isRendering) {
            console.warn('[ZiweiChart CE] _parseAndRender: Rendering is already in progress. Skipping this call to prevent concurrency issues.');
            return;
        }
        this._isRendering = true;
        this._currentConfigString = configString; // 更新當前配置字符串

        if (!configString) {
            console.warn('[ZiweiChart CE] _parseAndRender: Received empty or null config string.');
            this.renderError('無效的命盤配置：數據為空。');
            this._isRendering = false;
            return;
        }

        let config;
        try {
            config = JSON.parse(configString);
            console.log('[ZiweiChart CE] _parseAndRender: Successfully parsed data-config JSON:', config);
        } catch (error) {
            console.error('[ZiweiChart CE] _parseAndRender: Error parsing data-config JSON.', error);
            console.error('[ZiweiChart CE] Received string that caused error (first 200 chars):', configString.substring(0, 200) + "...");
            this.renderError(`解析命盤配置時出錯: ${error.message}`);
            this._isRendering = false;
            return;
        }

        if (config && config.type === 'RENDER_CHART' && config.payload) {
            console.log('[ZiweiChart CE] _parseAndRender: Config type is RENDER_CHART with payload. Proceeding to _renderAstrolabeWithReact.');
            this._renderAstrolabeWithReact(config.payload);
        } else {
            console.warn('[ZiweiChart CE] _parseAndRender: Invalid config structure or type.',
                         `Expected { type: "RENDER_CHART", payload: {...} }. Received:`, config);
            this.renderError('命盤配置數據格式無效。');
        }
        this._isRendering = false;
        console.log('[ZiweiChart CE] _parseAndRender: Finished.');
    }

    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart CE] _renderAstrolabeWithReact: Called. Payload:', JSON.stringify(payload));

        if (!this._reactRoot) {
            console.error('[ZiweiChart CE] _renderAstrolabeWithReact: React root not initialized. THIS SHOULD NOT HAPPEN if connectedCallback succeeded.');
            this.renderError('渲染引擎未就緒 (React Root Missing)。', true);
            return;
        }

        if (!payload) {
            console.warn('[ZiweiChart CE] _renderAstrolabeWithReact: Received empty or null payload.');
            this.renderError('命盤數據負載 (payload) 為空。');
            return;
        }

        console.log('[ZiweiChart CE] _renderAstrolabeWithReact: Checking iztro library availability...');
        if (typeof iztro === 'undefined' || typeof iztro.Astrolabe === 'undefined') {
            console.error('[ZiweiChart CE] _renderAstrolabeWithReact: CRITICAL - iztro library or iztro.Astrolabe component is NOT available. Ensure react-iztro is correctly bundled and imported.');
            this.renderError('命盤核心組件 (iztro.Astrolabe) 未能加載。請檢查打包配置。');
            return;
        }
        console.log('[ZiweiChart CE] _renderAstrolabeWithReact: iztro library and iztro.Astrolabe component ARE available.');
        console.log('[ZiweiChart CE] iztro object content:', iztro); // 打印 iztro 對象看看裡面有什麼

        const { birthDate, birthTime, gender, solar, lang } = payload; // 移除了 service，因為 iztro 不直接用
        console.log(`[ZiweiChart CE] _renderAstrolabeWithReact: Destructured payload: birthDate=${birthDate}, birthTime=${birthTime} (type: ${typeof birthTime}), gender=${gender}, solar=${solar}, lang=${lang}`);

        const iztroBirthTime = parseInt(birthTime, 10);
        if (isNaN(iztroBirthTime) || iztroBirthTime < 0 || iztroBirthTime > 23) { // react-iztro 的 birthTime 應該是 0-23 的時辰索引 (0=子時0點, 1=丑時1點...) 我們的下拉是 0-11 代表時辰段
            // 根據 react-iztro 的文檔，birthTime 是 0-12 的索引 (0=子時0點, 1=子時1點... 12=午時0點)
            // 我們的下拉框 "0" 代表整個 23:00-00:59 的子時。
            // react-iztro 的 birthTime 參數期望的是 0-12 的索引，0代表早子/晚子，1代表丑時1點...
            // 如果 Velo 傳過來的是 0-11 代表12個時辰段的索引，react-iztro 應該能處理
            // 我們這裡的 birthTime 是 0-11，對應 react-iztro 的 0-11 （子時到亥時）
            console.warn(`[ZiweiChart CE] _renderAstrolabeWithReact: Parsed birthTime for iztro: ${iztroBirthTime}. Ensure this range (0-11) is compatible with react-iztro's expectation for its 'birthTime' prop.`);
        } else {
             console.log(`[ZiweiChart CE] _renderAstrolabeWithReact: Parsed birthTime for iztro: ${iztroBirthTime} (type: ${typeof iztroBirthTime})`);
        }


        const iztroInputOptions = {
            birthday: birthDate, // 格式應為 'YYYY-MM-DD'
            birthTime: iztroBirthTime, // 使用解析後的數字 0-11
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-TW'), // 默認為繁體中文
            // 可選配置，來自 react-iztro README:
            // timeZone: 8, (默認為8)
            // fixLeap: true, (默認為true)
            // config: {
            //   astrolabe: {
            //     width: 500, (可以嘗試設置寬高)
            //     height: 700,
            //   },
            //   showDecadalScope: true,
            //   showYearlyScope: true,
            //   showMonthlyScope: false,
            //   showDailyScope: false,
            //   showHourlyScope: false,
            // }
        };

        console.log('[ZiweiChart CE] _renderAstrolabeWithReact: Options prepared for iztro.Astrolabe:', JSON.stringify(iztroInputOptions));

        try {
            console.log('[ZiweiChart CE] _renderAstrolabeWithReact: Attempting to React.createElement(iztro.Astrolabe)...');
            const astrolabeElement = React.createElement(iztro.Astrolabe, iztroInputOptions);
            console.log('[ZiweiChart CE] _renderAstrolabeWithReact: astrolabeElement created via React.createElement:', astrolabeElement ? 'Exists' : 'null or undefined');
            
            if (!astrolabeElement) {
                console.error('[ZiweiChart CE] _renderAstrolabeWithReact: React.createElement(iztro.Astrolabe) returned null or undefined. This is unexpected.');
                this.renderError('無法創建命盤圖表實例。');
                return;
            }
            
            console.log('[ZiweiChart CE] _renderAstrolabeWithReact: Attempting to this._reactRoot.render(astrolabeElement)...');
            this._reactRoot.render(astrolabeElement);
            console.log('[ZiweiChart CE] _renderAstrolabeWithReact: React render call for Astrolabe executed. Check the UI for the chart.');
            
            // 臨時添加一個成功的標記到 Shadow DOM，以便視覺確認
            // const successMsg = this.shadowRoot.ownerDocument.createElement('div');
            // successMsg.textContent = 'Astrolabe Render Attempted!';
            // successMsg.style.color = 'green';
            // successMsg.style.marginTop = '10px';
            // this.shadowRoot.getElementById('chart-host').appendChild(successMsg);

        } catch (error) {
            console.error('[ZiweiChart CE] _renderAstrolabeWithReact: CRITICAL ERROR during React.createElement or render:', error);
            // 打印更詳細的錯誤信息
            console.error('[ZiweiChart CE] Error Name:', error.name);
            console.error('[ZiweiChart CE] Error Message:', error.message);
            if (error.stack) {
                console.error('[ZiweiChart CE] Error Stack:', error.stack);
            }
            this.renderError(`渲染命盤時發生嚴重內部錯誤: ${error.message}. 請檢查控制台獲取更多細節.`);
        }
        console.log('[ZiweiChart CE] _renderAstrolabeWithReact: Finished.');
    }
    
    renderPlaceholder(message) {
        console.log(`[ZiweiChart CE] renderPlaceholder: Message: "${message}"`);
        if (this._reactRoot) {
            try {
                this._reactRoot.render(React.createElement('div', { className: 'message loading-message' }, message));
            } catch (e) {
                console.error('[ZiweiChart CE] renderPlaceholder: Error rendering placeholder with React:', e);
                this._renderFallbackMessage(message, false);
            }
        } else {
            console.warn('[ZiweiChart CE] renderPlaceholder: React root not available. Rendering fallback message.');
            this._renderFallbackMessage(message, false);
        }
    }

    renderError(message, isCriticalShadowDomError = false) {
        console.error(`[ZiweiChart CE] renderError: Message: "${message}"`);
        if (this._reactRoot && !isCriticalShadowDomError) { // 如果是 Shadow DOM 本身的問題，就不要再嘗試用 React 渲染錯誤了
            try {
                this._reactRoot.render(React.createElement('div', { className: 'message error-message' }, message));
            } catch (e) {
                console.error('[ZiweiChart CE] renderError: Error rendering error message with React:', e);
                this._renderFallbackMessage(message, true);
            }
        } else {
            console.warn('[ZiweiChart CE] renderError: React root not available or critical DOM error. Rendering fallback error message.');
            this._renderFallbackMessage(message, true);
        }
    }

    _renderFallbackMessage(message, isError) {
        // 在 React Root 無法使用時，直接操作 Shadow DOM 來顯示消息
        const hostElement = this.shadowRoot.getElementById('chart-host');
        if (hostElement) {
            hostElement.innerHTML = `<div class="message ${isError ? 'error-message' : 'loading-message'}">${message}</div>`;
        } else {
            // 極端情況，連 hostElement 都沒有了
            this.shadowRoot.innerHTML = `<div class="message error-message">FATAL ERROR: UI container missing. Message: ${message}</div>`;
        }
    }
}

console.log('[ZiweiChart CE Script] Script loaded. Attempting to define custom element "ziwei-chart"...');
if (!customElements.get('ziwei-chart')) {
    try {
        customElements.define('ziwei-chart', ZiweiChart);
        console.log('[ZiweiChart CE Script] Custom element "ziwei-chart" DEFINED SUCCESSFULLY.');
    } catch (e) {
        console.error('[ZiweiChart CE Script] CRITICAL ERROR defining custom element "ziwei-chart":', e);
    }
} else {
    console.warn('[ZiweiChart CE Script] Custom element "ziwei-chart" ALREADY DEFINED. This might be due to HMR or multiple script loads.');
}