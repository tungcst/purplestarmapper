class ZiweiChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 800px;
          margin: 20px auto;
          font-family: sans-serif;
        }
        .chart-container {
          background: white;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          min-height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .loading-message, .error-message {
          color: #555;
          font-size: 1.1em;
        }
        .error-message {
          color: #dc3545;
        }
        .iztrolabe-container button {
          background: #a78bfa;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1em;
          transition: background-color 0.3s ease;
          margin: 5px;
        }
        .iztrolabe-container button:hover {
          background: #7c3aed;
        }
      </style>
      <div id="chart-container" class="chart-container">
        <div class="loading-message">等待接收生辰資料...</div>
      </div>
    `;
    this.handleMessage = this.handleMessage.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  connectedCallback() {
    console.log('ZiweiChart Custom Element Connected.');
    window.addEventListener('message', this.handleMessage);
    this.loadScripts();
  }

  disconnectedCallback() {
    console.log('ZiweiChart Custom Element Disconnected.');
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage(event) {
    console.log('ZiweiChart received message:', event.data);
    if (event.data && event.data.type === 'RENDER_CHART' && event.data.payload) {
      const birthData = event.data.payload;
      if (window.React && window.ReactDOM && window.Iztrolabe) {
        this.renderChart(birthData);
      } else {
        console.warn('函式庫尚未載入完成，等待中...');
        this.shadowRoot.getElementById('chart-container').innerHTML =
          `<div class="loading-message">正在載入必要資源，請稍候...</div>`;
        setTimeout(() => this.renderChart(birthData), 1500);
      }
    }
  }

  loadScripts() {
    const scripts = [
      'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
      'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
      'https://unpkg.com/react-iztro@1.4.0/dist/index.umd.js' // 假設 UMD 版本存在，若不存在需打包
    ];

    let loadedCount = 0;
    const totalScripts = scripts.length;

    scripts.forEach(src => {
      if (document.querySelector(`script[src="${src}"]`)) {
        loadedCount++;
        if (loadedCount === totalScripts) {
          console.log('所有函式庫已載入 (來自緩存或先前載入)');
        }
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => {
        loadedCount++;
        console.log(`${src} 載入成功`);
        if (loadedCount === totalScripts) {
          console.log('所有函式庫載入完成');
        }
      };
      script.onerror = () => {
        console.error(`無法載入腳本: ${src}`);
        this.shadowRoot.getElementById('chart-container').innerHTML =
          `<div class="error-message">無法載入必要資源，請檢查網路連線或稍後再試。</div>`;
      };
      document.head.appendChild(script);
    });
  }

  renderChart(params) {
    const container = this.shadowRoot.getElementById('chart-container');

    if (!window.React || !window.ReactDOM || !window.Iztrolabe) {
      console.error('錯誤：React, ReactDOM 或 Iztrolabe 函式庫未載入！');
      container.innerHTML = `<div class="error-message">初始化錯誤，無法渲染命盤。</div>`;
      return;
    }

    const { createElement } = window.React;
    const { createRoot } = window.ReactDOM;

    const language = params.lang || 'zh';
    const messages = {
      zh: { loading: '載入命盤中...', missingParams: '請提供完整的出生年月日時和性別！', invalidTime: '出生時間格式錯誤！', 
generationError: '生成命盤失敗！請檢查輸入或稍後再試。', success: '命盤生成成功' },
      en: { loading: 'Loading chart...', missingParams: 'Please provide complete birth date, time, and gender!', invalidTime: 
'Invalid birth time!', generationError: 'Failed to generate chart! Please check input or try again later.', success: 'Chart 
generated successfully' }
    };

    container.innerHTML = `<div class="loading-message">${messages[language].loading}</div>`;

    if (!params.birthDate || params.birthTime === undefined || !params.gender) {
      console.error('缺少必要的生辰參數:', params);
      container.innerHTML = `<div class="error-message">${messages[language].missingParams}</div>`;
      return;
    }

    const dateStr = params.birthDate.split('T')[0];
    let timeIndex;

    // 將小時數（0-23）轉換為時辰索引（0-11）
    const hour = parseInt(params.birthTime, 10);
    if (isNaN(hour) || hour < 0 || hour > 23) {
      console.error('無效的 birthTime 格式:', params.birthTime);
      container.innerHTML = `<div class="error-message">${messages[language].invalidTime}</div>`;
      return;
    }
    // 轉換邏輯：每 2 小時一個時辰，子時跨日
    if (hour >= 23 || hour < 1) timeIndex = 0;  // 子時
    else if (hour < 3) timeIndex = 1;  // 丑時
    else if (hour < 5) timeIndex = 2;  // 寅時
    else if (hour < 7) timeIndex = 3;  // 卯時
    else if (hour < 9) timeIndex = 4;  // 辰時
    else if (hour < 11) timeIndex = 5;  // 巳時
    else if (hour < 13) timeIndex = 6;  // 午時
    else if (hour < 15) timeIndex = 7;  // 未時
    else if (hour < 17) timeIndex = 8;  // 申時
    else if (hour < 19) timeIndex = 9;  // 酉時
    else if (hour < 21) timeIndex = 10;  // 戌時
    else timeIndex = 11;  // 亥時

    const iztroOptions = {
      birthday: dateStr,
      birthTime: timeIndex,
      gender: params.gender === 'M' ? 'male' : 'female',
      birthdayType: params.solar ? 'solar' : 'lunar',
      language: language === 'zh' ? 'zh-TW' : 'en'
    };

    console.log('準備傳遞給 Iztrolabe 的參數:', iztroOptions);

    try {
      const App = () => createElement('div', { className: 'iztrolabe-wrapper' },
        createElement(window.Iztrolabe, iztroOptions)
      );
      const root = createRoot(container);
      root.render(createElement(App));
      console.log(messages[language].success);
    } catch (error) {
      console.error("生成或渲染命盤時出錯:", error);
      container.innerHTML = `<div class="error-message">${messages[language].generationError} 
<br><small>${error.message}</small></div>`;
    }
  }
}

if (!customElements.get('ziwei-chart')) {
  customElements.define('ziwei-chart', ZiweiChart);
  console.log('Custom element "ziwei-chart" defined.');
} else {
  console.warn('Custom element "ziwei-chart" already defined.');
}
