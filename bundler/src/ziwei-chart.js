// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro'; // 保持你的導入方式
// import { darkHidedHeavenlyStems } from 'react-iztro-plugins'; // 如果打包工具能處理

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started.');
// ... (保留 iztro 對象檢查日誌) ...

// --- CSS Definitions ---
const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;

// 你提供的 react-iztro 的完整 CSS
const reactIztroDefaultCSS = `
/* ... (粘貼你之前提供的所有 .iztro-xxx 規則，從 .iztro-palace 开始，包括 .iztro-astrolabe 的 grid 定义) ... */
.iztro-astrolabe-theme-default {
  --iztro-star-font-size-big: 13px;
  --iztro-star-font-size-small: 12px;
  --iztro-color-major: #531dab;
  --iztro-color-focus: #000;
  /* ... (所有 theme-default 變量) ... */
  --iztro-color-hourly: var(--iztro-color-text);
}
.iztro-astrolabe {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  display: grid;
  position: relative;
  width: 100%; 
  height: 100%; 
  grid-gap: 1px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-template-areas:
    "g3 g4 g5 g6"
    "g2 ct ct g7"
    "g1 ct ct g8"
    "g0 g11 g10 g9";
  text-align: left;
  border: 1px solid var(--iztro-color-border);
  box-sizing: border-box;
}
.iztro-palace {
  padding: 3px 5px;
  display: grid;
  text-transform: capitalize;
  grid-template-rows: auto auto 1fr auto;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "major minor adj"
    "horo  horo adj"
    "fate  fate fate"
    "ft   ft  ft";
  border: 1px solid var(--iztro-color-border);
  box-sizing: border-box;
  overflow: hidden; 
  position: relative;
  margin: -1px 0 0 -1px;
}
.iztro-astrolabe > .iztro-palace:nth-child(4n+1) { margin-left: 0; }
.iztro-astrolabe > .iztro-palace:nth-child(-n+4) { margin-top: 0; }
.iztro-astrolabe > .iztro-palace-center { margin: -1px 0 0 -1px; }

/* ... (繼續粘貼所有來自你提供的 iztro CSS 的規則) ... */
.gender.gender-female { color: var(--iztro-color-happy); }
`;

const customChartHostAndWrapperStyles = `
  :host {
    display: block; 
    width: 100%;   
    min-height: 500px; /* 確保 Custom Element 有最小高度 */
    height: auto; /* 高度由內容或 Wix 編輯器決定 */
    overflow: hidden; 
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4;
    /* border: 1px dashed blue;  */
  }
  #chart-render-target {
    width: 100%;
    height: 100%; 
    display: flex; 
    justify-content: center;
    align-items: center; 
    box-sizing: border-box;
    background-color: #f9f9f9;
    padding: 5px;
  }
  /* 確保 .iztro-astrolabe 元素 (由 react-iztro 渲染) 尺寸正確 */
  #chart-render-target > .iztro-astrolabe {
      width: 100%; /* 嘗試讓它填充 */
      height: 100%; /* 嘗試讓它填充 */
      max-width: 800px; 
      max-height: 700px;
      box-sizing: border-box;
  }
`;

class ZiweiChart extends HTMLElement {
    static get observedAttributes() {
        return ['data-config', 'theme-override'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style id="ziwei-dynamic-styles"></style>
            <div id="chart-render-target" class="chart-wrapper-inside-shadow-dom">
                <div class="message-display-in-shadow loading-message-in-shadow">初始化中...</div>
            </div>
        `;
        this._mountPoint = this.shadowRoot.getElementById('chart-render-target');
        // ... (其他屬性初始化) ...
        this._reactRoot = null;
        this._currentConfigString = null;
        this._currentThemeOverride = null;
        this._isRendering = false;
        this._isMounted = false;
        this._currentWidth = 0;
        this._currentHeight = 0;
        this._resizeObserver = null;
        this._data = {};
        this._forceNextRender = false;
    }

    _injectStyles = () => {
        // ... (注入 CSS 的邏輯保持不變，確保順序是 reset -> iztro -> custom)
        const styleElement = this.shadowRoot.getElementById('ziwei-dynamic-styles');
        if (!styleElement) {console.error("Style element not found in shadow DOM"); return;}
        let combinedCSS = `
            .message-display-in-shadow { /*...*/ }
            .loading-message-in-shadow { /*...*/ }
            .error-message-in-shadow { /*...*/ }
        `;
        if (typeof antdResetCSS !== 'undefined') combinedCSS += antdResetCSS;
        combinedCSS += reactIztroDefaultCSS;
        combinedCSS += customChartHostAndWrapperStyles;
        if (this._currentThemeOverride) combinedCSS += this._currentThemeOverride;
        styleElement.textContent = combinedCSS;
    }
    
    connectedCallback = () => {
        console.log('[ZiweiChart] connectedCallback');
        if (!this._isMounted) {
            this._injectStyles();
            if (!this._mountPoint) { this.renderError("Mount point error.", true); return; }
            if (typeof ReactDOM !== 'undefined' && ReactDOM.createRoot) {
                this._reactRoot = ReactDOM.createRoot(this._mountPoint);
            } else { this.renderError('React env error (createRoot).', true); this._isMounted = true; return; }
            
            this._isMounted = true;
            this._setupResizeObserver(); // 在 reactRoot 創建後
            
            const initialTheme = this.getAttribute('theme-override');
            if (initialTheme) {
                this._currentThemeOverride = initialTheme;
                this._injectStyles();
                this._forceNextRender = true;
            }
            // 初次渲染嘗試，使用 ResizeObserver 獲取到的尺寸
            // ResizeObserver 的回調可能會先於此處，或者此處的尺寸為0
             requestAnimationFrame(() => { // 確保在下一幀執行，此時尺寸可能已更新
                this.renderChartFromAttributes(this._forceNextRender);
            });
        } else {
            this._injectStyles(); // 再次連接時也確保樣式正確
            if (this._currentConfigString) this._parseAndRender(this._currentConfigString, true);
        }
    }

    disconnectedCallback = () => {
        console.log('[ZiweiChart] disconnectedCallback');
        if (this._isMounted && this._reactRoot) {
            this._reactRoot.unmount();
        }
        this._isMounted = false;
        this._reactRoot = null;
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
        }
        this._currentConfigString = null;
    }

    attributeChangedCallback = (name, oldValue, newValue) => {
        console.log(`[ZiweiChart] attributeChangedCallback: ${name}`);
        if (name === 'theme-override') {
            if (newValue !== this._currentThemeOverride) {
                this._currentThemeOverride = newValue;
                this._injectStyles();
                if (this._isMounted && this._currentConfigString) {
                    this._forceNextRender = true; // 標記強制重渲染
                    this._parseAndRender(this._currentConfigString, true);
                }
            }
        } else if (name === 'data-config') {
            // 只有在新值與當前值不同，或者需要強制渲染時才處理
            if (newValue === this._currentConfigString && !this._forceNextRender) {
                 console.log("[ZiweiChart] data-config no change, skipping unless forced.");
                 return;
            }
            if (!this._isMounted) { return; } // 如果還沒掛載，讓 connectedCallback 處理
            
            if (newValue === null || newValue === undefined) {
                this.renderPlaceholder("Config removed.");
                this._currentConfigString = null;
            } else {
                this._parseAndRender(newValue);
            }
            this._forceNextRender = false; // 用完後重置
        }
    }
    
    renderChartFromAttributes = (forceRender = false) => {
        // ... (與上一個版本相同，但確保 this 指向正確)
        if(!this._isMounted || !this._reactRoot) return;
        const configAttr = this.getAttribute('data-config');
        if (configAttr && (forceRender || configAttr !== this._currentConfigString || !this._currentWidth || !this._currentHeight )) {
            this._parseAndRender(configAttr, forceRender);
        } else if (!configAttr && this._currentConfigString !== null) {
            this.renderPlaceholder("Waiting for config (attr removed)...");
            this._currentConfigString = null;
        } else if (!configAttr) {
            this.renderPlaceholder("Waiting for config (initial)...");
        }
    }
    
    _setupResizeObserver = () => {
        // ... (保持 resize observer 邏輯, 內部調用 this._parseAndRender(this._currentConfigString, true))
        if (this._resizeObserver) this._resizeObserver.disconnect();
        this._resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 10 && height > 10 ) { 
                    if (Math.abs(width - this._currentWidth) > 5 || Math.abs(height - this._currentHeight) > 5) { // 增加閾值避免頻繁觸發
                        this._currentWidth = width;
                        this._currentHeight = height;
                        if (this._currentConfigString) {
                             this._parseAndRender(this._currentConfigString, true); 
                        }
                    }
                }
            }
        });
        if (this._mountPoint) {
            this._resizeObserver.observe(this._mountPoint);
             requestAnimationFrame(() => { // 在下一幀獲取初始尺寸
                if (this._mountPoint && this._isMounted) { 
                    const initialRect = this._mountPoint.getBoundingClientRect();
                    this._currentWidth = initialRect.width;
                    this._currentHeight = initialRect.height;
                     if (this._currentWidth > 0 && this._currentHeight > 0 && this.getAttribute('data-config')) {
                        this.renderChartFromAttributes(true); // 如果有初始尺寸和配置，渲染
                    }
                }
            });
        }
    }

    birthDataToIzTroParams = (payload) => {
        // ... (與你最新版本基本一致，確保 gender 輸出 'male'/'female')
        if (!payload || !payload.year || !payload.month || !payload.day || !payload.hour || payload.gender === undefined) { return null; }
        let { year, month, day, hour, minute = 0, gender, solarDate, lunarDate, timeZone, anH = false, lang = 'zh-CN', fixedLeap = false } = payload;
        let targetYear = parseInt(year, 10), targetMonth = parseInt(month, 10), targetDay = parseInt(day, 10), targetHour = parseInt(hour, 10), targetMinute = parseInt(minute, 10);
        const originalHourForIztro = targetHour;
        if (targetHour === 23) {
            let dToInc;
            if (solarDate && /^\d{4}-\d{1,2}-\d{1,2}$/.test(solarDate)) { const [sY, sM, sD] = solarDate.split('-').map(Number); dToInc = new Date(sY, sM - 1, sD); }
            else { dToInc = new Date(targetYear, targetMonth - 1, targetDay); }
            dToInc.setDate(dToInc.getDate() + 1);
            targetYear = dToInc.getFullYear(); targetMonth = dToInc.getMonth() + 1; targetDay = dToInc.getDate();
            solarDate = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`;
        }
        let birthdayForIztro, birthdayType = 'solar';
        if (solarDate && /^\d{4}-\d{1,2}-\d{1,2}$/.test(solarDate)) { birthdayForIztro = `${solarDate} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`; }
        else if (lunarDate && typeof lunarDate === 'object') { birthdayForIztro = { ...lunarDate, hour: originalHourForIztro, minute: targetMinute }; birthdayType = 'lunar'; }
        else { birthdayForIztro = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`; }
        const plugins = [];
        if (anH && window.reactIztroPlugins?.darkHidedHeavenlyStems) plugins.push(window.reactIztroPlugins.darkHidedHeavenlyStems());
        return { birthday: birthdayForIztro, gender: gender === 'M' ? 'male' : (gender === 'F' ? 'female' : undefined), birthdayType, timeZone: parseInt(timeZone, 10) || undefined, fixedLeap, plugins, language: lang };
    }
    
    _parseAndRender = (configString, forceRender = false) => {
        if (!forceRender && this._isRendering && configString === this._currentConfigString) return;
        if (!this._isMounted || !this._reactRoot) return;
        this._isRendering = true; this._currentConfigString = configString;
        if (!configString) { this.renderError('Config is empty.'); this._isRendering = false; return; }
        try {
            const config = JSON.parse(configString);
            if (config?.type === 'RENDER_CHART' && config.payload) this._renderAstrolabeWithReact(config.payload);
            else { this.renderError('Invalid config structure.'); this._isRendering = false; }
        } catch (error) { this.renderError(`Parse config error: ${error.message}`); this._isRendering = false; }
    }
    
    _renderAstrolabeWithReact = (payload) => {
        if (!this._isMounted || !this._reactRoot) { this._isRendering = false; return; }
        const iztroParams = this.birthDataToIzTroParams(payload);
        if (!iztroParams) { this.renderError('Invalid birth data.'); this._isRendering = false; return; }

        const AstrolabeComponent = iztro.Iztrolabe; // 你已確認是 Iztrolabe
        if (typeof AstrolabeComponent === 'undefined') { 
            this.renderError('Iztrolabe component is undefined.'); this._isRendering = false; return; 
        }

        const chartWidth = this._currentWidth > 10 ? this._currentWidth : 580;
        const chartHeight = this._currentHeight > 10 ? this._currentHeight : 680;
        
        const veloChartOptions = payload.chartOptions || this._data?.chartOptions || {};

        // 根據 react-iztro (SylarLong) 的 Storybook 和 Iztrolabe.type.ts：
        // width 是頂級 prop，其他顯示選項似乎由庫內部或CSS主題控制。
        // options prop 用於傳遞更底層的 iztro 核心庫配置。
        const finalProps = {
            birthday: iztroParams.birthday,
            birthTime: iztroParams.birthTime, // birthTime 已經在 birthDataToIzTroParams 中處理為數字
            gender: iztroParams.gender,
            birthdayType: iztroParams.birthdayType,
            isLeapMonth: iztroParams.birthdayType === 'lunar' ? payload.isLeapMonth || false : undefined, // 只在農曆時傳遞
            fixLeap: iztroParams.fixedLeap, // 從 iztroParams 獲取
            lang: iztroParams.language,
            plugins: iztroParams.plugins,

            // 顯示/佈局相關的 props (根據 SylarLong/react-iztro 的 IztrolabeProps)
            width: chartWidth, // 頂級 prop
            // height: chartHeight, // Iztrolabe 組件似乎不直接接受 height prop，高度由 CSS 和內容決定
            horoscopeDate: veloChartOptions.horoscopeDate ? new Date(veloChartOptions.horoscopeDate) : undefined,
            horoscopeHour: veloChartOptions.horoscopeHour,
            centerPalaceAlign: veloChartOptions.centerPalaceAlign || false,

            options: { // 傳遞給底層 iztro.js 的選項
                ...(veloChartOptions.iztroCoreOptions || {}), // 例如 { yearDivide: "exact" }
                // 以下這些 showXXX 選項，react-iztro 的 React 組件層面可能不直接支持
                // 它們的效果更可能通過 CSS 主題或底層 iztro 核心庫的 options 來實現
                // 如果要控制顯示，可能需要修改 reactIztroDefaultCSS 或傳遞給 options 的特定鍵
                // theme: veloChartOptions.theme || 'default', // theme 通常也是 options 的一部分
                // showPalaceName: ..., 等等
            }
        };
        
        // 清理 finalProps.options 中不屬於底層 iztro 核心庫的選項
        // (這一步比較 tricky，需要明確知道哪些 key 屬於 iztro 核心，哪些屬於 react-iztro 的 React 組件)
        // 暫時先這樣，如果 iztro 核心庫不識別多餘的 options 也沒關係

        console.log('[ZiweiChart] Final props for Iztrolabe:', JSON.stringify(finalProps, (k,v) => typeof v === 'function' ? "Function" : v , 2 ));
        this.renderPlaceholder("正在繪製命盤...");

        setTimeout(() => {
            if (!this._reactRoot) { this.renderError("React Root null in timeout.", true); this._isRendering = false; return; }
            try {
                this._reactRoot.render(React.createElement(AstrolabeComponent, finalProps));
                console.log('[ZiweiChart] React render() for Iztrolabe was called.');
            } catch (error) { 
                console.error('[ZiweiChart] EXCEPTION during Iztrolabe rendering:', error);
                this.renderError(`渲染命盤時發生錯誤: ${error.message}`);
            }
            finally { this._isRendering = false; }
        }, 100);
    }
    
    renderPlaceholder = (message) => { /* ... */ 
        if (!this._reactRoot || !this._mountPoint) return;
        try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message)); }
        catch (e) { if(this._mountPoint) this._mountPoint.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React Err)</div>`; }
    }
    renderError = (message, isCritical = false) => { /* ... */ 
        if (!this._reactRoot || !this._mountPoint) {
            if(this.shadowRoot) this.shadowRoot.innerHTML = `<style>.error-message-in-shadow { /* ... */ }</style><div class="message-display-in-shadow error-message-in-shadow">${message}</div>`;
            return;
        }
        try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message)); }
        catch (e) { if(this._mountPoint) this._mountPoint.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React Err)</div>`; }
    }

    set birthData(value) {
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } 
            catch (e) { this.renderError('birthData 格式錯誤.'); return; }
        }
        this._data = { ...this._data, birthData: parsedValue };
        if (this._isMounted) { this.renderChartFromAttributes(true); }
    }
    get birthData() { return this._data?.birthData; }

    set chartOptions(value) {
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } 
            catch (e) { console.warn('chartOptions 解析失敗'); }
        }
        this._data = { ...this._data, chartOptions: parsedValue };
        if (this._isMounted) { this.renderChartFromAttributes(true); }
    }
    get chartOptions() { return this._data?.chartOptions; }
}

if (customElements && typeof customElements.get === 'function' && !customElements.get('ziwei-chart')) {
    try {
        customElements.define('ziwei-chart', ZiweiChart);
    } catch (e) {
        console.error('[ZiweiChart CE SCRIPT] Error defining ziwei-chart:', e);
    }
} else {
    console.warn('[ZiweiChart CE SCRIPT] ziwei-chart already defined or API issue.');
}