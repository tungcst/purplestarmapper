class ZiweiChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .ziwei-container { background: white; padding: 20px; width: 90%; max-width: 800px; margin: 50px auto; }
        .iztrolabe-container button { background: #a78bfa; color: white; border: none; padding: 8px 16px; }
        .iztrolabe-container button:hover { background: #7c3aed; }
      </style>
      <div id="ziwei-container">載入命盤中...</div>
    `;
  }

  connectedCallback() {
    window.addEventListener('message', (event) => {
      if (event.data.trigger === 'parseQuery') {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
          birthDate: urlParams.get('birthDate'),
          birthTime: urlParams.get('birthTime'),
          gender: urlParams.get('gender'),
          lang: urlParams.get('lang') || 'zh',
          service: urlParams.get('service') || 'trial'
        };
        this.renderChart(params);
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const params = {
      birthDate: urlParams.get('birthDate'),
      birthTime: urlParams.get('birthTime'),
      gender: urlParams.get('gender'),
      lang: urlParams.get('lang') || 'zh',
      service: urlParams.get('service') || 'trial'
    };
    if (params.birthDate && params.birthTime && params.gender) {
      this.renderChart(params);
    }
  }

  renderChart(params) {
    const language = params.lang || 'zh';
    const messages = {
      zh: { loading: '載入命盤中...', missingParams: '請提供完整的出生資料！', invalidTime: '出生時間格式錯誤！', 
generationError: '生成命盤失敗！' },
      en: { loading: 'Loading chart...', missingParams: 'Please provide complete birth details!', invalidTime: 'Invalid birth 
time!', generationError: 'Failed to generate chart!' }
    };

    if (!params.birthDate || !params.birthTime || !params.gender) {
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: 
red;">${messages[language].missingParams}</p>`;
      return;
    }

    const dateStr = params.birthDate.split('T')[0];
    const timeIndex = parseInt(params.birthTime, 10);

    if (isNaN(timeIndex) || timeIndex < 0 || timeIndex > 11) {
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: 
red;">${messages[language].invalidTime}</p>`;
      return;
    }

    $w.wixData.getIztro().then(({ iztro, react, reactDom }) => {
      const { Iztrolabe } = iztro;
      const { createElement } = react;
      const { createRoot } = reactDom;

      const App = () => createElement('div', { className: 'ziwei-container' }, createElement(Iztrolabe, {
        birthday: dateStr,
        birthTime: timeIndex,
        birthdayType: 'solar',
        gender: params.gender === 'M' ? 'male' : 'female',
        language: language === 'zh' ? 'zh-TW' : 'en',
        horoscopeDate: new Date(),
        horoscopeHour: 1
      }));

      const container = this.shadowRoot.getElementById('ziwei-container');
      const root = createRoot(container);
      root.render(createElement(App));
    }).catch(error => {
      console.error("載入 react-iztro 失敗:", error);
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: 
red;">${messages[language].generationError}</p>`;
    });
  }
}

customElements.define('ziwei-chart', ZiweiChart);
