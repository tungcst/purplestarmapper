class ZiweiChart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .chart-container { width: 100%; height: 600px; display: flex; flex-direction: column; align-items: center; 
font-family: Arial, sans-serif; }
                .loading-message { font-size: 18px; color: #333; }
                .error-message { font-size: 18px; color: red; }
                h2 { color: #4A2C76; margin-bottom: 10px; }
                p { font-size: 16px; margin: 5px 0; }
            </style>
            <div id="chart-container" class="chart-container">
                <div class="loading-message">載入命盤中...</div>
            </div>
        `;
        this.handleMessage = this.handleMessage.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    connectedCallback() {
        window.addEventListener('message', this.handleMessage);
        this.loadScripts();
    }

    disconnectedCallback() {
        window.removeEventListener('message', this.handleMessage);
    }

    handleMessage(event) {
        if (event.data.type === 'RENDER_CHART' && event.data.payload) {
            this.renderChart(event.data.payload);
        }
    }

    loadScripts() {
        const scripts = [
            'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
            'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
            'https://unpkg.com/react-iztro@1.4.0/dist/index.umd.js'
        ];

        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => console.log(`${src} loaded`);
            script.onerror = () => console.error(`Failed to load ${src}`);
            this.shadowRoot.appendChild(script);
        });
    }

    renderChart(params) {
        const container = this.shadowRoot.getElementById('chart-container');
        container.innerHTML = '';

        if (!window.React || !window.ReactDOM || !window.iztro) {
            container.innerHTML = '<div class="error-message">無法載入命盤，請稍後重試</div>';
            return;
        }

        const { birthDate, birthTime, gender, service, solar, lang } = params;

        try {
            const iztroOptions = {
                birthday: birthDate,
                birthTime: birthTime,
                gender: gender === 'M' ? 'male' : 'female',
                birthdayType: solar ? 'solar' : 'lunar',
                language: lang === 'zh' ? 'zh-TW' : 'en'
            };

            const chartData = window.iztro.getHoroscope(iztroOptions);

            // 根據服務類型調整顯示內容
            let content = '';
            if (service === 'ziwei') {
                content = `
                    <h2>${lang === 'zh' ? '紫微斗數命盤' : 'Purple Star Chart'}</h2>
                    <p>${lang === 'zh' ? '命宮：' : 'Life Palace: '}${chartData.lifePalace.name}</p>
                    <p>${lang === 'zh' ? '身宮：' : 'Body Palace: '}${chartData.bodyPalace.name}</p>
                    <p>${lang === 'zh' ? '十二宮：' : 'Twelve Palaces: '}${chartData.palaces.map(p => p.name).join(', ')}</p>
                `;
            } else if (service === 'career') {
                content = `
                    <h2>${lang === 'zh' ? '事業運勢分析' : 'Career Fortune Analysis'}</h2>
                    <p>${lang === 'zh' ? '事業宮：' : 'Career Palace: '}${chartData.careerPalace.name}</p>
                    <p>${lang === 'zh' ? '財帛宮：' : 'Wealth Palace: '}${chartData.wealthPalace.name}</p>
                `;
            } else if (service === 'love') {
                content = `
                    <h2>${lang === 'zh' ? '愛情運勢分析' : 'Love Fortune Analysis'}</h2>
                    <p>${lang === 'zh' ? '夫妻宮：' : 'Spouse Palace: '}${chartData.spousePalace.name}</p>
                    <p>${lang === 'zh' ? '福德宮：' : 'Happiness Palace: '}${chartData.happinessPalace.name}</p>
                `;
            }

            const { createElement } = window.React;
            const { render } = window.ReactDOM;

            const ChartComponent = () => createElement('div', { dangerouslySetInnerHTML: { __html: content } });
            render(createElement(ChartComponent), container);

            // 返回命盤數據
            this.dispatchEvent(new CustomEvent('chartRendered', { detail: chartData }));
        } catch (err) {
            console.error("渲染命盤失敗:", err);
            container.innerHTML = '<div class="error-message">無法生成命盤，請聯繫管理員</div>';
        }
    }
}

customElements.define('ziwei-chart', ZiweiChart);
