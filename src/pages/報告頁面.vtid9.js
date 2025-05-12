// src/pages/chart.js
import { local } from 'wix-storage';

export function onReady() {
  console.log("報告頁面 Velo onReady 啟動");

  const birthDataString = local.getItem("birthChartData");

  if (birthDataString) {
    console.log("從 Storage 獲取到數據字串:", birthDataString);
    try {
      const birthData = JSON.parse(birthDataString);
      console.log("解析後的生辰數據:", birthData);

      if (birthData && birthData.birthDate && birthData.birthTime !== undefined && birthData.gender && birthData.solar !== 
undefined) {
        const customElement = document.querySelector('#ziweiChart');

        if (customElement) {
          console.log("找到自訂元素:", customElement.id);

          const message = {
            type: 'RENDER_CHART',
            payload: {
              birthDate: birthData.birthDate,
              birthTime: birthData.birthTime,
              gender: birthData.gender,
              solar: birthData.solar,
              lang: birthData.lang || 'zh'
            }
          };

          console.log("準備發送消息給自訂元素:", message);
          customElement.postMessage(message, '*');
          console.log("消息已發送");
        } else {
          console.error("錯誤：在頁面上找不到 ID 為 'ziweiChart' 的自訂元素！");
          const errorElement = document.querySelector('#errorMessageTextElement');
          if (errorElement) {
            errorElement.textContent = "無法載入命盤元件，請聯繫管理員。";
            errorElement.style.display = 'block';
          }
        }
      } else {
        console.error("錯誤：從 Storage 獲取的生辰數據不完整或格式錯誤。", birthData);
        const errorElement = document.querySelector('#errorMessageTextElement');
        if (errorElement) {
          errorElement.textContent = "缺少必要的生辰資訊，無法生成命盤。";
          errorElement.style.display = 'block';
        }
      }
    } catch (error) {
      console.error("錯誤：解析 Storage 中的生辰數據失敗。", error);
      const errorElement = document.querySelector('#errorMessageTextElement');
      if (errorElement) {
        errorElement.textContent = "讀取生辰資訊時發生錯誤。";
        errorElement.style.display = 'block';
      }
    }
  } else {
    console.warn("警告：在 Storage 中未找到 'birthChartData'。無法生成命盤。");
    const errorElement = document.querySelector('#errorMessageTextElement');
    if (errorElement) {
      errorElement.textContent = "請先輸入您的生辰資料。";
      errorElement.style.display = 'block';
    }
  }
}
