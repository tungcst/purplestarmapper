import React from 'react';
import ReactDOM from 'react-dom';
import * as iztro from 'react-iztro';

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
        console.log("ZiweiChart 元件初始化");
        this.handleMessage = this.handleMessage.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    connectedCallback() {
        console.log("ZiweiChart 已連接到 DOM");
        window.addEventListener('message', this.handleMessage);
    }

    disconnectedCallback() {
        console.log("ZiweiChart 已從 DOM 移除");
        window.removeEventListener('message', this.handleMessage);
    }

    handleMessage(event) {
        console.log("ZiweiChart 收到消息:", event.data);
        if (event.data.type === 'RENDER_CHART' && event.data.payload) {
            this.renderChart(event.data.payload);
        }
    }

    renderChart(params) {
        console.log("開始渲染命盤，參數:", params);
        const container = this.shadowRoot.getElementById('chart-container');
        container.innerHTML = '';

        if (!React || !ReactDOM || !iztro) {
            console.error("缺少必要庫：", {
                React: !!React,
                ReactDOM: !!ReactDOM,
                iztro: !!iztro
            });
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

            console.log("iztro 選項:", iztroOptions);
            const chartData = iztro.getHoroscope(iztroOptions);
            console.log("命盤數據:", chartData);

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

            const { createElement } = React;
            const { render } = ReactDOM;

            const ChartComponent = () => createElement('div', { dangerouslySetInnerHTML: { __html: content } });
            render(createElement(ChartComponent), container);
            console.log("命盤渲染完成");

            // 返回命盤數據
            this.dispatchEvent(new CustomEvent('chartRendered', { detail: chartData }));
        } catch (err) {
            console.error("渲染命盤失敗:", err);
            container.innerHTML = '<div class="error-message">無法生成命盤，請聯繫管理員</div>';
        }
    }
}

customElements.define('ziwei-chart', ZiweiChart);
