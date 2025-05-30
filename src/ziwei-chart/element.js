// public/elements/ziwei-chart.js
// 確保 React, ReactDOM, 和 react-iztro (例如 Astrolabe 組件) 已通過某種方式引入
// (例如，在關聯的 HTML 文件中用 <script> 標籤引入 CDN，或者這個 JS 文件本身是打包後的結果)

// Enhanced Ziwei Chart Custom Element with better stability and responsive design
class ZiweiChartElement extends HTMLElement {
    static get observedAttributes() {
        return ['birth-data', 'chart-size', 'theme', 'language'];
    }

    constructor() {
        super();
        
        // 初始化狀態
        this._birthData = null;
        this._chartSize = 'auto';
        this._theme = 'purple';
        this._language = 'zh-TW';
        this._reactRoot = null;
        this._container = null;
        this._isLoading = false;
        this._retryCount = 0;
        this._maxRetries = 3;
        
        // 綁定方法
        this._handleResize = this._handleResize.bind(this);
        this._handleMessage = this._handleMessage.bind(this);
        
        // 創建 Shadow DOM
        this.attachShadow({ mode: 'open' });
        this._setupShadowDOM();
        
        console.log('🎯 ZiweiChartElement initialized');
    }

    _setupShadowDOM() {
        this.shadowRoot.innerHTML = `
            <style>
                /* 重置樣式，確保與外部樣式隔離 */
                :host {
                    display: block;
                    width: 100%;
                    min-height: 400px;
                    font-family: 'Inter', 'Noto Sans TC', sans-serif;
                    box-sizing: border-box;
                }
                
                * {
                    box-sizing: border-box;
                }
                
                .ziwei-chart-container {
                    width: 100%;
                    height: 100%;
                    min-height: 400px;
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(88, 28, 135, 0.1);
                    border: 1px solid rgba(230, 230, 250, 0.8);
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .ziwei-chart-container:hover {
                    box-shadow: 0 8px 30px rgba(88, 28, 135, 0.15);
                    border-color: rgba(216, 191, 216, 0.9);
                }
                
                .chart-content {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                    color: #581C87;
                }
                
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(88, 28, 135, 0.2);
                    border-top: 3px solid #581C87;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .loading-text {
                    font-size: 14px;
                    font-weight: 500;
                    color: #6B21A8;
                    text-align: center;
                }
                
                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                    color: #dc2626;
                    text-align: center;
                }
                
                .error-icon {
                    font-size: 32px;
                    margin-bottom: 16px;
                    opacity: 0.7;
                }
                
                .error-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #dc2626;
                }
                
                .error-message {
                    font-size: 14px;
                    line-height: 1.5;
                    color: #7f1d1d;
                    margin-bottom: 16px;
                }
                
                .retry-button {
                    background: linear-gradient(135deg, #581C87, #6B21A8);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .retry-button:hover {
                    background: linear-gradient(135deg, #6B21A8, #7C3AED);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(88, 28, 135, 0.3);
                }
                
                .retry-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                
                /* IZTRO 命盤樣式修正 */
                .iztro-astrolabe {
                    width: 100% !important;
                    height: auto !important;
                    max-width: 100% !important;
                }
                
                .iztro-palace {
                    border: 1px solid rgba(88, 28, 135, 0.3) !important;
                    background: rgba(255, 255, 255, 0.9) !important;
                    transition: all 0.2s ease !important;
                }
                
                .iztro-palace:hover {
                    background: rgba(230, 230, 250, 0.5) !important;
                    border-color: rgba(88, 28, 135, 0.5) !important;
                    box-shadow: 0 2px 8px rgba(88, 28, 135, 0.2) !important;
                }
                
                .iztro-palace-name {
                    color: #581C87 !important;
                    font-weight: 600 !important;
                    font-size: 12px !important;
                }
                
                .iztro-star {
                    color: #6B21A8 !important;
                    font-size: 11px !important;
                    font-weight: 500 !important;
                }
                
                .iztro-star.major {
                    color: #581C87 !important;
                    font-weight: 700 !important;
                }
                
                /* 響應式設計 */
                @media (max-width: 768px) {
                    .ziwei-chart-container {
                        min-height: 350px;
                        border-radius: 8px;
                    }
                    
                    .iztro-palace-name {
                        font-size: 10px !important;
                    }
                    
                    .iztro-star {
                        font-size: 9px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .ziwei-chart-container {
                        min-height: 300px;
                        border-radius: 6px;
                    }
                    
                    .loading-container,
                    .error-container {
                        padding: 20px 16px;
                    }
                }
                
                /* 為報告功能預留的樣式 */
                .chart-actions {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    display: flex;
                    gap: 8px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .ziwei-chart-container:hover .chart-actions {
                    opacity: 1;
                }
                
                .action-button {
                    background: rgba(88, 28, 135, 0.9);
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .action-button:hover {
                    background: rgba(88, 28, 135, 1);
                    transform: translateY(-1px);
                }
            </style>
            <div class="ziwei-chart-container">
                <div class="chart-content" id="chart-content">
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <div class="loading-text">正在準備命盤...</div>
                    </div>
                </div>
                <div class="chart-actions" id="chart-actions" style="display: none;">
                    <!-- 為報告功能預留的按鈕空間 -->
                </div>
            </div>
        `;
        
        this._container = this.shadowRoot.getElementById('chart-content');
    }

    connectedCallback() {
        console.log('🔗 ZiweiChartElement connected to DOM');
        
        // 監聽窗口大小變化
        window.addEventListener('resize', this._handleResize);
        
        // 監聽來自外部的消息
        window.addEventListener('message', this._handleMessage);
        
        // 處理初始屬性
        this._processInitialAttributes();
        
        // 初始化 React
        this._initializeReact();
    }

    disconnectedCallback() {
        console.log('🔌 ZiweiChartElement disconnected from DOM');
        
        window.removeEventListener('resize', this._handleResize);
        window.removeEventListener('message', this._handleMessage);
        
        this._cleanupReact();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        console.log(`📝 Attribute changed: ${name} = ${newValue}`);
        
        switch (name) {
            case 'birth-data':
                this._updateBirthData(newValue);
                break;
            case 'chart-size':
                this._chartSize = newValue || 'auto';
                this._handleResize();
                break;
            case 'theme':
                this._theme = newValue || 'purple';
                this._renderChart();
                break;
            case 'language':
                this._language = newValue || 'zh-TW';
                this._renderChart();
                break;
        }
    }

    _processInitialAttributes() {
        const birthData = this.getAttribute('birth-data');
        const chartSize = this.getAttribute('chart-size');
        const theme = this.getAttribute('theme');
        const language = this.getAttribute('language');
        
        if (birthData) this._updateBirthData(birthData);
        if (chartSize) this._chartSize = chartSize;
        if (theme) this._theme = theme;
        if (language) this._language = language;
    }

    _updateBirthData(jsonString) {
        if (!jsonString || jsonString.trim() === '') {
            this._birthData = null;
            this._showPlaceholder();
            return;
        }

        try {
            const data = JSON.parse(jsonString);
            if (this._validateBirthData(data)) {
                this._birthData = data;
                this._renderChart();
            } else {
                throw new Error('Invalid birth data format');
            }
        } catch (error) {
            console.error('❌ Error parsing birth data:', error);
            this._showError('生辰數據格式錯誤', error.message);
        }
    }

    _validateBirthData(data) {
        return data && 
               typeof data === 'object' &&
               data.birthDate &&
               typeof data.birthTime !== 'undefined' &&
               data.gender;
    }

    async _initializeReact() {
        if (this._reactRoot) return;
        
        try {
            this._showLoading('正在初始化組件...');
            
            // 檢查依賴是否可用
            await this._ensureDependencies();
            
            // 創建 React Root
            if (window.ReactDOM && window.ReactDOM.createRoot) {
                this._reactRoot = window.ReactDOM.createRoot(this._container);
                console.log('✅ React root created successfully');
                
                if (this._birthData) {
                    this._renderChart();
                } else {
                    this._showPlaceholder();
                }
            } else {
                throw new Error('ReactDOM.createRoot not available');
            }
        } catch (error) {
            console.error('❌ Failed to initialize React:', error);
            this._showError('組件初始化失敗', error.message);
        }
    }

    async _ensureDependencies() {
        const maxWaitTime = 10000; // 10 seconds
        const checkInterval = 200; // 200ms
        let waitTime = 0;
        
        while (waitTime < maxWaitTime) {
            if (window.React && window.ReactDOM && window.ReactIztro) {
                console.log('✅ All dependencies loaded');
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, checkInterval));
            waitTime += checkInterval;
        }
        
        throw new Error('Required dependencies not loaded within timeout');
    }

    _renderChart() {
        if (!this._reactRoot || !this._birthData) {
            return;
        }

        try {
            this._showLoading('正在生成命盤...');
            
            const { React, ReactIztro } = window;
            const { Iztrolabe } = ReactIztro;
            
            // 轉換生辰數據格式
            const iztroProps = this._convertToIztroFormat(this._birthData);
            
            const ChartElement = React.createElement(Iztrolabe, {
                ...iztroProps,
                className: 'iztro-astrolabe',
                style: { width: '100%', height: '100%' }
            });
            
            this._reactRoot.render(ChartElement);
            console.log('✅ Chart rendered successfully');
            
            // 重置重試計數
            this._retryCount = 0;
            
        } catch (error) {
            console.error('❌ Error rendering chart:', error);
            this._handleRenderError(error);
        }
    }

    _convertToIztroFormat(birthData) {
        const {
            birthDate,
            birthTime,
            gender,
            birthLocation = null,
            solar = true
        } = birthData;

        // 處理時辰（子時換日邏輯）
        let actualDate = birthDate;
        let timeIndex = parseInt(birthTime);
        
        if (timeIndex === 0) { // 子時 (23:00-01:00)
            const date = new Date(birthDate);
            date.setDate(date.getDate() + 1);
            actualDate = date.toISOString().split('T')[0];
        }

        return {
            birthday: actualDate,
            birthTime: timeIndex,
            birthdayType: solar ? 'solar' : 'lunar',
            gender: gender === 'M' ? 'male' : 'female',
            language: this._language,
            ...(birthLocation && { birthLocation })
        };
    }

    _handleRenderError(error) {
        this._retryCount++;
        
        if (this._retryCount <= this._maxRetries) {
            console.log(`🔄 Retrying chart render (${this._retryCount}/${this._maxRetries})`);
            setTimeout(() => this._renderChart(), 1000 * this._retryCount);
                } else {
            this._showError('命盤生成失敗', `已重試 ${this._maxRetries} 次，請檢查數據格式或稍後再試`);
        }
    }

    _showLoading(message = '載入中...') {
        if (!this._container) return;
        
        this._isLoading = true;
        this._container.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="loading-text">${message}</div>
            </div>
        `;
    }

    _showError(title, message) {
        if (!this._container) return;
        
        this._isLoading = false;
        this._container.innerHTML = `
            <div class="error-container">
                <div class="error-icon">⚠️</div>
                <div class="error-title">${title}</div>
                <div class="error-message">${message}</div>
                <button class="retry-button" onclick="this.closest('.ziwei-chart-container').parentNode.host._retryRender()">
                    重新嘗試
                </button>
            </div>
        `;
    }

    _showPlaceholder() {
        if (!this._container) return;
        
        this._isLoading = false;
        this._container.innerHTML = `
            <div class="loading-container">
                <div style="font-size: 48px; margin-bottom: 16px; opacity: 0.6;">⭐</div>
                <div class="loading-text">請提供生辰數據以生成命盤</div>
            </div>
        `;
    }

    _retryRender() {
        this._retryCount = 0;
        if (this._birthData) {
            this._renderChart();
        } else {
            this._showPlaceholder();
        }
    }

    _handleResize() {
        // 響應式調整
        if (this._chartSize === 'auto') {
            this._renderChart();
        }
    }

    _handleMessage(event) {
        // 處理來自外部的消息
        const { data } = event;
        
        if (data && data.target === 'ziwei-chart') {
            switch (data.action) {
                case 'updateBirthData':
                    this._updateBirthData(JSON.stringify(data.payload));
                    break;
                case 'generateReport':
                    this._triggerReportGeneration(data.payload);
                    break;
                default:
                    console.log('Unknown message action:', data.action);
            }
        }
    }

    // 為報告功能預留的接口
    _triggerReportGeneration(reportType) {
        if (!this._birthData) {
            console.warn('No birth data available for report generation');
            return;
        }
        
        // 向父頁面發送報告生成請求
        const event = new CustomEvent('reportRequest', {
            detail: {
                birthData: this._birthData,
                reportType: reportType,
                timestamp: Date.now()
            }
        });
        
        this.dispatchEvent(event);
        
        // 也可以通過 postMessage 發送
        window.parent.postMessage({
            type: 'REPORT_REQUEST',
            source: 'ziwei-chart',
            payload: {
                birthData: this._birthData,
                reportType: reportType
            }
        }, '*');
    }

    _cleanupReact() {
        if (this._reactRoot && typeof this._reactRoot.unmount === 'function') {
            this._reactRoot.unmount();
            this._reactRoot = null;
        }
    }

    // 公共方法，供外部調用
    updateChart(birthData) {
        this._updateBirthData(JSON.stringify(birthData));
    }

    exportChart() {
        // 預留的導出功能
        console.log('Chart export functionality will be implemented here');
    }

    showReportActions(actions) {
        // 顯示報告相關的操作按鈕
        const actionsContainer = this.shadowRoot.getElementById('chart-actions');
        if (actionsContainer && actions && actions.length > 0) {
            actionsContainer.innerHTML = actions.map(action => 
                `<button class="action-button" onclick="this.closest('.ziwei-chart-container').parentNode.host._triggerReportGeneration('${action.type}')">${action.label}</button>`
            ).join('');
            actionsContainer.style.display = 'flex';
        }
    }
}

// 註冊 Custom Element
if (!customElements.get('ziwei-chart')) {
    customElements.define('ziwei-chart', ZiweiChartElement);
    console.log('🎯 ZiweiChartElement registered successfully');
} else {
    console.log('⚠️ ZiweiChartElement already registered');
}
