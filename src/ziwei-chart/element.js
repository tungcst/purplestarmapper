// public/elements/ziwei-chart.js
// 確保 React, ReactDOM, 和 react-iztro (例如 Astrolabe 組件) 已通過某種方式引入
// (例如，在關聯的 HTML 文件中用 <script> 標籤引入 CDN，或者這個 JS 文件本身是打包後的結果)

class ZiweiChartEmbed extends HTMLElement {
    static get observedAttributes() {
        return ['horoscope']; // 監聽 'horoscope' attribute 的變化
    }

    constructor() {
        super();
        this._horoscopeData = null;
        this._reactRoot = null;
        this._container = null; // 命盤容器
        // console.log('ZiweiChartEmbed constructor original called.'); // 日誌可以幫助追蹤
    }

    connectedCallback() {
        // console.log('ZiweiChartEmbed original connected to DOM.');
        this._container = document.createElement('div');
        this.appendChild(this._container);

        // 確保 ReactDOM.createRoot 可用 (React 18+)
        if (typeof ReactDOM !== 'undefined' && ReactDOM.createRoot) {
            this._reactRoot = ReactDOM.createRoot(this._container);
        } else {
            console.error("ZiweiChartEmbed: ReactDOM.createRoot is not available. Ensure React 18+ is loaded.");
            this._container.innerHTML = '<p style="color: red;">React 渲染環境初始化失敗。</p>';
            return;
        }

        this.renderChart(); // 初始渲染

        // 檢查初始 attribute
        const initialHoroscope = this.getAttribute('horoscope');
        if (initialHoroscope) {
            this.updateHoroscopeData(initialHoroscope);
        }
    }

    disconnectedCallback() {
        // console.log('ZiweiChartEmbed original disconnected from DOM.');
        if (this._reactRoot && typeof this._reactRoot.unmount === 'function') {
            this._reactRoot.unmount();
        }
        if (this._container && this._container.parentNode === this) {
            this.removeChild(this._container);
        }
        this._container = null;
        this._reactRoot = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(`ZiweiChartEmbed original: Attribute '${name}' changed from '${oldValue ? oldValue.substring(0,50)+"..." 
: null}' to '${newValue ? newValue.substring(0,50)+"..." : null}'.`);
        if (name === 'horoscope') {
            if (oldValue !== newValue) {
                this.updateHoroscopeData(newValue);
            }
        }
    }

    updateHoroscopeData(jsonString) {
        if (!jsonString || jsonString.trim() === "") {
            // console.warn("ZiweiChartEmbed original: Received empty or null horoscope data string.");
            this._horoscopeData = null;
        } else {
            try {
                const parsedData = JSON.parse(jsonString);
                // 你可以根據 react-iztro 數據結構添加更詳細的驗證
                if (typeof parsedData === 'object' && parsedData !== null /* && parsedData.palaces */) {
                    this._horoscopeData = parsedData;
                    // console.log("ZiweiChartEmbed original: Successfully parsed horoscope data:", this._horoscopeData);
                } else {
                    throw new Error("Parsed data is not a valid horoscope object.");
                }
            } catch (error) {
                console.error("ZiweiChartEmbed original: Error parsing 'horoscope' attribute JSON:", error, "Received string:", 
jsonString.substring(0, 200) + "...");
                this._horoscopeData = null;
            }
        }
        this.renderChart(); // 用新的數據（或null）重新渲染
    }

    renderChart() {
        if (!this._reactRoot) {
            // console.warn("ZiweiChartEmbed original: Render called before React root is ready.");
            if (this._container) {
                this._container.innerHTML = '<p style="color: orange;">圖表渲染器未就緒。</p>';
            }
            return;
        }

        if (this._horoscopeData) {
            // console.log("ZiweiChartEmbed original: Rendering Astrolabe with data...");
            try {
                // 確保 react-iztro 的 Astrolabe 組件在 window.ReactIztro.Astrolabe 或其他你引入它的地方可用
                if (window.ReactIztro && window.ReactIztro.Astrolabe) {
                    const chartElement = React.createElement(window.ReactIztro.Astrolabe, {
                        horoscope: this._horoscopeData,
                        // lang: 'zh-CN', // 或其他配置, 請根據 react-iztro 的 API
                        // config: { ... } // 其他 react-iztro 可能需要的配置
                    });
                    this._reactRoot.render(chartElement);
                } else {
                    console.error("ZiweiChartEmbed original: window.ReactIztro.Astrolabe not found. Ensure react-iztro is loaded 
and its components are exposed correctly.");
                    this._container.innerHTML = '<p style="color: red;">命盤組件(Astrolabe)加載失敗。</p>';
                }
            } catch (e) {
                console.error("ZiweiChartEmbed original: Error creating/rendering ReactIztro.Astrolabe element:", e);
                this._container.innerHTML = `<p style="color: red;">渲染命盤時發生錯誤: ${e.message}</p>`;
            }
        } else {
            // console.log("ZiweiChartEmbed original: No horoscope data to render, showing placeholder.");
            const placeholderText = "正在等待命盤數據或數據無效...";
            // 使用 React 渲染占位符，以保持一致性
            this._reactRoot.render(React.createElement('p', null, placeholderText));
        }
    }
}

// 確保只定義一次，並使用你期望的標籤名
if (!customElements.get('ziwei-chart-embed')) {
    customElements.define('ziwei-chart-embed', ZiweiChartEmbed);
    console.log('Custom element "ziwei-chart-embed" (Original Logic) defined.');
} else {
    console.log('Custom element "ziwei-chart-embed" (Original Logic) already defined.');
}
