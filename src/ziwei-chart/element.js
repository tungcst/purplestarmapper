
// src/ziwei-chart/element.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Iztrolabe } from 'react-iztro';
// react-iztro 的 CSS 會由 rollup-plugin-postcss 自動處理並注入

// 內部 React 組件
function ZiweiChartView({ birthDate, birthTime, gender, lang, options, solarTermOffset }) {
  if (!birthDate || birthTime === undefined || !gender) {
    return React.createElement('div', { style: { color: 'orange', padding: '10px', border: '1px solid orange' } }, 
      '紫微斗數命盤：請提供完整的生辰信息 (birth-date, birth-time, gender)。'
    );
  }

  try {
    // 將從 attribute 獲取的字符串 birthDate 轉換為 Date 對象
    const dateObject = new Date(birthDate);
    if (isNaN(dateObject.getTime())) {
      throw new Error('無效的日期格式 (birth-date)。請使用 YYYY-MM-DD 或可被 new Date() 解析的格式。');
    }

    // 將從 attribute 獲取的字符串 birthTime 轉換為數字
    const timeValue = parseInt(birthTime, 10);
    if (isNaN(timeValue) || timeValue < 0 || timeValue > 23) { // 假設 birthTime 是 0-23 的小時數
        // react-iztro 的 birthTime 是指時辰的索引 (0-12 for 子-亥)
        // 你需要在 Velo 中將用戶輸入的時間轉換成這個索引，或者在這裡做轉換
        // 為了簡單起見，這裡假設傳入的 birth-time attribute 已經是 react-iztro 需要的索引
        // 如果 birth-time attribute 是小時 (0-23)，你需要轉換邏輯
        // 例如：const iztroBirthTimeIndex = Math.floor((timeValue + 1) / 2) % 12; (這是一個簡化示例，實際轉換更複雜)
        console.warn(`birthTime ("${birthTime}") 應為 react-iztro 所需的時辰索引 (通常是 0-12)。請確保傳入正確的值。`);
        // throw new Error('無效的出生時間 (birth-time)。應為 0-12 的時辰索引。');
    }
    
    const iztroGender = gender === 'male' ? '男' : '女';

    const iztroOptions = options ? JSON.parse(options) : {};
    if (solarTermOffset) {
      iztroOptions.solarTermOffset = solarTermOffset === 'true'; // 從 string 轉 boolean
    }

    return React.createElement(Iztrolabe, {
      birthday: dateObject, // react-iztro 需要 Date 對象
      birthTime: timeValue, // react-iztro 需要時辰索引 (數字)
      gender: iztroGender,  // '男' 或 '女'
      lang: lang || 'zh-CN',
      options: iztroOptions, // 包含 anGalaxy, anTimeliness, anTraditional 等的對象
    });
  } catch (error) {
    console.error("渲染紫微斗數命盤時出錯:", error);
    return React.createElement('div', { style: { color: 'red', padding: '10px', border: '1px solid red' } }, 
      `渲染命盤失敗: ${error.message}`
    );
  }
}

// 自定義元素 (Custom Element Wrapper)
class ZiweiChartElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._reactRoot = ReactDOM.createRoot(this.shadowRoot);
    this._props = {};
  }

  static get observedAttributes() {
    // 監聽這些 HTML 屬性的變化
    return ['birth-date', 'birth-time', 'gender', 'lang', 'options', 'solar-term-offset'];
  }

  connectedCallback() {
    // 元素首次被添加到 DOM 時調用
    this._updatePropsFromAttributes();
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // 當 observedAttributes 中指定的屬性變化時調用
    if (oldValue !== newValue) {
      this._updatePropsFromAttributes();
      this._render();
    }
  }

  disconnectedCallback() {
    // 元素從 DOM 中移除時調用
    if (this._reactRoot) {
      this._reactRoot.unmount();
    }
  }

  _updatePropsFromAttributes() {
    this._props = {}; // 重置 props
    ZiweiChartElement.observedAttributes.forEach(attr => {
      const value = this.getAttribute(attr);
      if (value !== null) {
        // 將 HTML attribute 名稱 (kebab-case) 轉換為 prop 名稱 (camelCase)
        const propName = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        this._props[propName] = value;
      }
    });
  }

  _render() {
    if (this._reactRoot) {
      this._reactRoot.render(React.createElement(ZiweiChartView, this._props));
    }
  }
}

// 定義自定義元素，標籤名必須包含連字符
// 確保標籤名在你的 Wix 項目中是唯一的
if (!customElements.get('ziwei-chart-embed')) {
  customElements.define('ziwei-chart-embed', ZiweiChartElement);
}

