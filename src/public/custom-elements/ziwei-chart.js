class ZiweiChart extends HTMLElement {
  constructor() {
    super();
    this.chartRendered = false; // Add this line
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
      if (event.data.trigger === 'parseQuery' && !this.chartRendered) { // Add !this.chartRendered
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
          birthDate: urlParams.get('birthDate'),
          birthTime: urlParams.get('birthTime'),
          gender: urlParams.get('gender'),
          lang: urlParams.get('lang') || 'zh',
          service: urlParams.get('service') || 'trial' // Currently unused, reserved for future features (e.g., 'premium' service)
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
      service: urlParams.get('service') || 'trial' // Currently unused, reserved for future features (e.g., 'premium' service)
    };
    if (params.birthDate && params.birthTime && params.gender && !this.chartRendered) { // Add !this.chartRendered
      this.renderChart(params);
    }
  }

  renderChart(params) {
    this.chartRendered = true; // Add this line
    const language = params.lang || 'zh';
    const messages = {
      zh: {
        loading: '載入命盤中...',
        missingParams: '請提供完整的出生資料（日期、時間、性別）！',
        invalidTime: '出生時間格式錯誤，請選擇有效時辰（子時到亥時）！',
        invalidDate: '出生日期格式錯誤，請提供有效的日期！', // Added
        invalidGender: '性別參數錯誤，請提供有效的性別（M 或 F）！', // Added
        generationError: '生成命盤失敗，請檢查輸入資料或稍後重試！'
      },
      en: {
        loading: 'Loading chart...',
        missingParams: 'Please provide complete birth details (date, time, gender)!',
        invalidTime: 'Invalid birth time, please select a valid hour (Zi to Hai)!',
        invalidDate: 'Invalid birth date format, please provide a valid date!', // Added
        invalidGender: 'Invalid gender parameter, please provide a valid gender (M or F)!', // Added
        generationError: 'Failed to generate chart, please check input data or try again later!'
      }
    };

    console.log("自訂元件收到參數:", params);

    if (!params.birthDate || !params.birthTime || !params.gender) {
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: red;">${messages[language].missingParams}</p>`;
      return;
    }

    // Validate birthDate
    if (typeof params.birthDate !== 'string') {
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: red;">${messages[language].invalidDate}</p>`;
      return;
    }
    
    const dateObj = new Date(params.birthDate.split('T')[0]); // Ensure we only parse the date part
    if (isNaN(dateObj.getTime())) {
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: red;">${messages[language].invalidDate}</p>`;
      return;
    }

    // Format date to YYYY-MM-DD
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const timeIndex = parseInt(params.birthTime, 10);

    if (isNaN(timeIndex) || timeIndex < 0 || timeIndex > 11) {
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: red;">${messages[language].invalidTime}</p>`;
      return;
    }

    // Validate gender
    const genderUpper = typeof params.gender === 'string' ? params.gender.toUpperCase() : '';
    if (genderUpper !== 'M' && genderUpper !== 'F') {
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: red;">${messages[language].invalidGender}</p>`;
      return;
    }
    const iztrolabeGender = genderUpper === 'M' ? 'male' : 'female';

    $w.wixData.getIztro().then(({ iztro, react, reactDom }) => {
      const { Iztrolabe } = iztro;
      const { createElement } = react;
      const { createRoot } = reactDom;

      const App = () => {
        return createElement(
          'div',
          { className: 'ziwei-container' },
          createElement(Iztrolabe, {
            birthday: dateStr,
            birthTime: timeIndex,
            birthdayType: 'solar',
            gender: iztrolabeGender, // Use validated gender
            language: language.startsWith('zh') ? 'zh-TW' : 'en', // Updated language handling
            horoscopeDate: new Date(),
            horoscopeHour: 1
          })
        );
      };

      const container = this.shadowRoot.getElementById('ziwei-container');
      const root = createRoot(container);
      root.render(createElement(App));
    }).catch(error => {
      console.error("載入 react-iztro 失敗:", error);
      this.shadowRoot.getElementById('ziwei-container').innerHTML = `<p style="color: red;">${messages[language].generationError}</p>`;
    });
  }
}

customElements.define('ziwei-chart', ZiweiChart);