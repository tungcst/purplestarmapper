// bundler/src/ziwei-chart.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro';
// 假設 react-iztro-plugins 全局可用，或你已配置打包工具
// import { darkHidedHeavenlyStems } from 'react-iztro-plugins';


console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
// ... (你的 iztro 對象檢查日誌) ...

// --- CSS Definitions ---
const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -ms-overflow-style: scrollbar; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;

const reactIztroDefaultCSS = `
/* 你之前提供的完整的 react-iztro CSS 內容應放在這裡 */
/* 確保包含了 .iztro-astrolabe 的 grid-template-areas 定義 */
.iztro-astrolabe-theme-default {
  --iztro-star-font-size-big: 13px;
  --iztro-star-font-size-small: 12px;
  --iztro-color-major: #531dab; /* ... 等等 ... */
}
.iztro-astrolabe {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  display: grid;
  position: relative;
  width: 100%;
  height: 100%; /* 新增，確保它填滿掛載點高度 */
  grid-gap: 3px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-template-areas:
    "g3 g4 g5 g6"
    "g2 ct ct g7"
    "g1 ct ct g8"
    "g0 g11 g10 g9";
  text-align: left;
}
.iztro-palace {
  padding: 3px;
  display: grid;
  text-transform: capitalize;
  grid-template-rows: auto auto auto 50px; /* 或者讓它更具彈性: auto auto 1fr auto; */
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "major minor adj"
    "horo  horo adj"
    "fate  fate fate"
    "ft   ft  ft";
  transition: all 0.25s ease-in-out;
  grid-auto-flow: column;
  border: 1px solid var(--iztro-color-border);
  box-sizing: border-box; /* 確保 padding 和 border 不會撐大元素 */
  overflow: hidden; /* 如果宮位內容過多，嘗試隱藏 */
}
/* ... (所有其他 .iztro-xxx 規則) ... */
.gender.gender-female {
  color: var(--iztro-color-happy);
}
`;

const customChartHostAndWrapperStyles = `
  :host {
    display: block;
    width: 100%;
    height: 600px; /* 給一個明確的初始高度，Wix 編輯器應可覆蓋 */
    min-height: 450px; /* 最小高度，防止塌陷 */
    overflow: hidden;
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4;
    /* border: 1px dashed green; /* Debug border */ */
  }
  #chart-render-target {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; /* 或者 flex-start */
    box-sizing: border-box;
    background-color: var(--color-html-bg, #ffffff); /* 背景色 */
    padding: 5px; /* 給一點內邊距 */
  }
  /* 如果需要，可以微調 react-iztro 樣式，但避免修改核心佈局 */
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
                <div class="message-display-in-shadow loading-message-in-shadow">命盤組件初始化中...</div>
            </div>
        `;
        this._mountPoint = this.shadowRoot.getElementById('chart-render-target');
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

        // 綁定需要在回調中使用的 'this'
        this.renderChartFromAttributes = this.renderChartFromAttributes.bind(this);
        this._parseAndRender = this._parseAndRender.bind(this);
        this._renderAstrolabeWithReact = this._renderAstrolabeWithReact.bind(this);
        this._setupResizeObserver = this._setupResizeObserver.bind(this);
        this._injectStyles = this._injectStyles.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderPlaceholder = this.renderPlaceholder.bind(this);
    }

    _injectStyles() {
        const styleElement = this.shadowRoot.getElementById('ziwei-dynamic-styles');
        if (!styleElement) {
            console.error("[ZiweiChart INSTANCE] _injectStyles: #ziwei-dynamic-styles not found!");
            return;
        }
        let combinedCSS = `
            .message-display-in-shadow { font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
            .loading-message-in-shadow { background-color: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
            .error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
        `;
        if (typeof antdResetCSS !== 'undefined') combinedCSS += antdResetCSS;
        combinedCSS += reactIztroDefaultCSS;
        combinedCSS += customChartHostAndWrapperStyles;
        if (this._currentThemeOverride) combinedCSS += this._currentThemeOverride;
        styleElement.textContent = combinedCSS;
    }
    
    connectedCallback() {
        console.log('[ZiweiChart INSTANCE] connectedCallback CALLED.');
        if (!this._isMounted) {
            this._injectStyles();

            if (!this._mountPoint) {
                console.error('[ZiweiChart INSTANCE] connectedCallback: _mountPoint is NULL.');
                this.shadowRoot.innerHTML = `<style>.error-message-in-shadow { background-color: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; font-size: 16px; padding: 20px; border-radius: 4px; text-align: center; margin: 20px; }</style><div class="error-message-in-shadow">Mount point error.</div>`;
                return;
            }

            if (typeof ReactDOM !== 'undefined' && typeof ReactDOM.createRoot === 'function') {
                this._reactRoot = ReactDOM.createRoot(this._mountPoint);
            } else {
                this.renderError('React 環境錯誤 (createRoot)。', true);
                this._isMounted = true; return;
            }
            
            this._isMounted = true;
            this._setupResizeObserver(); // ResizeObserver 應在掛載後且 reactRoot 創建後
            
            const initialThemeOverride = this.getAttribute('theme-override');
            if (initialThemeOverride) { // 如果有初始主題，先應用
                this._currentThemeOverride = initialThemeOverride;
                this._injectStyles();
                this._forceNextRender = true;
            }
            // 確保調用 renderChartFromAttributes
            this.renderChartFromAttributes(this._forceNextRender);

        } else { // 如果已經掛載過 (例如元素被移動後重新連接)
            this._injectStyles(); 
            if (this._currentConfigString) this._parseAndRender(this._currentConfigString, true);
        }
    }

    // ✅ renderChartFromAttributes 方法定義在類中
    renderChartFromAttributes(forceRender = false) {
        console.log(`[ZiweiChart INSTANCE] renderChartFromAttributes CALLED. Force: ${forceRender}`);
        if(!this._isMounted || !this._reactRoot) {
            console.warn("[ZiweiChart INSTANCE] renderChartFromAttributes: Not ready to render.");
            return;
        }
        const configAttr = this.getAttribute('data-config');
        if (configAttr && (forceRender || configAttr !== this._currentConfigString)) {
            this._parseAndRender(configAttr, forceRender);
        } else if (!configAttr && this._currentConfigString !== null) {
            this.renderPlaceholder("等待配置 (attribute removed)...");
            this._currentConfigString = null;
        } else if (!configAttr) {
            this.renderPlaceholder("等待配置 (initial)...");
        }
    }

    birthDataToIzTroParams(birthData) {
        // ... (保持你原有的 birthDataToIzTroParams 邏輯，包括子時換日和插件)
        // 確保 lang 屬性也從 birthData 中正確獲取或設置默認值
        if (!birthData || !birthData.year || !birthData.month || !birthData.day || !birthData.hour || birthData.gender === undefined) {
            return null;
        }
        let { year, month, day, hour, minute = 0, gender, solarDate, lunarDate, timeZone, anH = false, lang = 'zh-CN', fixedLeap = false } = birthData;

        let targetYear = parseInt(year, 10);
        let targetMonth = parseInt(month, 10);
        let targetDay = parseInt(day, 10);
        let targetHour = parseInt(hour, 10);
        let targetMinute = parseInt(minute, 10);
        const originalHourForIztro = targetHour;

        if (targetHour === 23) {
            let dateToIncrement;
            if (solarDate && typeof solarDate === 'string' && solarDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
                const [sY, sM, sD] = solarDate.split('-').map(Number);
                dateToIncrement = new Date(sY, sM - 1, sD);
            } else {
                dateToIncrement = new Date(targetYear, targetMonth - 1, targetDay);
            }
            dateToIncrement.setDate(dateToIncrement.getDate() + 1);
            targetYear = dateToIncrement.getFullYear();
            targetMonth = dateToIncrement.getMonth() + 1;
            targetDay = dateToIncrement.getDate();
            solarDate = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`;
        }
        
        let birthdayForIztro;
        let birthdayType = 'solar';

        if (solarDate && typeof solarDate === 'string' && solarDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            birthdayForIztro = `${solarDate} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`;
        } else if (lunarDate && typeof lunarDate === 'object') { /* ... 農曆處理 ... */ 
            birthdayForIztro = { year: lunarDate.year, month: lunarDate.month, day: lunarDate.day, hour: originalHourForIztro, minute: targetMinute, isLeap: !!lunarDate.isLeapMonth };
            birthdayType = 'lunar';
        } else {
            birthdayForIztro = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')} ${String(originalHourForIztro).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}:00`;
        }
        
        const plugins = [];
        if (anH) { 
            if (typeof window.reactIztroPlugins !== 'undefined' && typeof window.reactIztroPlugins.darkHidedHeavenlyStems === 'function') {
                 plugins.push(window.reactIztroPlugins.darkHidedHeavenlyStems());
            } else { console.warn("暗合插件未找到。"); }
        }
        return {
            birthday: birthdayForIztro,
            gender: gender === 'male' ? '男' : (gender === 'female' ? '女' : undefined),
            birthdayType: birthdayType,
            timeZone: timeZone !== undefined ? parseInt(timeZone, 10) : undefined,
            fixedLeap: fixedLeap,
            plugins: plugins,
            language: lang
        };
    }

    _setupResizeObserver() {
        // ... (保持 resize observer 邏輯)
        if (this._resizeObserver) this._resizeObserver.disconnect();
        this._resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0 && (width !== this._currentWidth || height !== this._currentHeight)) {
                    this._currentWidth = width;
                    this._currentHeight = height;
                    this._render();
                }
            }
        });
        if (this._mountPoint) {
            this._resizeObserver.observe(this._mountPoint);
             // Force initial size detection
            const initialRect = this._mountPoint.getBoundingClientRect();
            if (initialRect.width > 0 && initialRect.height > 0) {
                this._currentWidth = initialRect.width;
                this._currentHeight = initialRect.height;
            }
        }
    }
    
    // attributeChangedCallback, _parseAndRender, _renderAstrolabeWithReact, 
    // renderPlaceholder, renderError, setters/getters
    // 請使用我上一個回覆中提供的這些方法的最新版本，它們包含了錯誤處理和更健壯的邏輯。
    // 確保 _renderAstrolabeWithReact 中 finalProps 的構建正確。
    disconnectedCallback() {
        if (this._isMounted && this._reactRoot) {
            this._reactRoot.unmount();
        }
        this._isMounted = false;
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // ... (使用我之前回覆中更新的 attributeChangedCallback 邏輯)
        console.log(`[ZiweiChart INSTANCE] attributeChangedCallback: ${name} from '${oldValue}' to '${newValue}'`);
        if (name === 'theme-override') {
            if (newValue !== this._currentThemeOverride) {
                this._currentThemeOverride = newValue;
                this._injectStyles();
                if (this._isMounted && this._currentConfigString) {
                    this._forceNextRender = true;
                    this._parseAndRender(this._currentConfigString, true);
                }
            }
        } else if (name === 'data-config') {
            if (newValue === this._currentConfigString && !this._forceNextRender) return;
            if (!this._isMounted) { // 如果尚未掛載，讓 connectedCallback 處理
                 console.log("[ZiweiChart] attributeChangedCallback: Not mounted, data-config will be handled by connectedCallback.");
                 return;
            }
            if (newValue === null || newValue === undefined) {
                this.renderPlaceholder("命盤配置已移除。");
                this._currentConfigString = null;
            } else {
                this._parseAndRender(newValue);
            }
            this._forceNextRender = false;
        }
    }

    _parseAndRender(configString, forceRender = false) {
        // ... (使用我之前回覆中更新的 _parseAndRender 邏輯)
        if (!forceRender && this._isRendering && configString === this._currentConfigString) return;
        if (!this._isMounted || !this._reactRoot) return;

        this._isRendering = true;
        this._currentConfigString = configString;

        if (!configString) {
            this.renderError('命盤配置數據為空。');
            this._isRendering = false; return;
        }
        try {
            const config = JSON.parse(configString);
            if (config?.type === 'RENDER_CHART' && config.payload) {
                this._renderAstrolabeWithReact(config.payload);
            } else {
                this.renderError('命盤配置格式無效。');
                this._isRendering = false;
            }
        } catch (error) {
            this.renderError(`解析配置錯誤: ${error.message}`);
            this._isRendering = false;
        }
    }
    
    _renderAstrolabeWithReact(payload) {
        // ... (使用我之前回覆中更新的 _renderAstrolabeWithReact 邏輯，關鍵是 finalProps 的構建)
        if (!this._isMounted || !this._reactRoot) { this._isRendering = false; return; }
        const iztroParams = this.birthDataToIzTroParams(payload);
        if (!iztroParams) { this.renderError('生辰數據轉換失敗。'); this._isRendering = false; return; }

        const AstrolabeComponent = iztro.Iztrolabe;
        if (typeof AstrolabeComponent === 'undefined') { this.renderError('Iztrolabe 組件未定義。'); this._isRendering = false; return; }

        const chartWidth = this._currentWidth > 10 ? this._currentWidth : 550;
        const chartHeight = this._currentHeight > 10 ? this._currentHeight : 650;
        const veloChartOptions = payload.chartOptions || this._data?.chartOptions || {};

        const finalOptions = {
            width: chartWidth,
            height: chartHeight,
            theme: veloChartOptions.theme || 'default',
            language: iztroParams.language || veloChartOptions.language || 'zh-CN',
            showPalaceName: veloChartOptions.showPalaceName !== undefined ? veloChartOptions.showPalaceName : true,
            showMutagens: veloChartOptions.showMutagens !== undefined ? veloChartOptions.showMutagens : true,
            showBrightness: veloChartOptions.showBrightness !== undefined ? veloChartOptions.showBrightness : true,
            showFiveElementsClass: veloChartOptions.showFiveElementsClass !== undefined ? veloChartOptions.showFiveElementsClass : true,
            showChineseDate: veloChartOptions.showChineseDate !== undefined ? veloChartOptions.showChineseDate : true,
            showDecadalScope: veloChartOptions.showDecadalScope !== undefined ? veloChartOptions.showDecadalScope : true,
            showYearlyScope: veloChartOptions.showYearlyScope !== undefined ? veloChartOptions.showYearlyScope : true,
            showMonthlyScope: veloChartOptions.showMonthlyScope !== undefined ? veloChartOptions.showMonthlyScope : true,
            showDailyScope: veloChartOptions.showDailyScope !== undefined ? veloChartOptions.showDailyScope : false,
            showHourlyScope: veloChartOptions.showHourlyScope !== undefined ? veloChartOptions.showHourlyScope : false,
            showTransNatal: veloChartOptions.showTransNatal !== undefined ? veloChartOptions.showTransNatal : true,
            astrolabe: { ...(veloChartOptions.astrolabe || {}), showMutableSigns: veloChartOptions.astrolabe?.showMutableSigns !== undefined ? veloChartOptions.astrolabe.showMutableSigns : true },
            plugins: [...(iztroParams.plugins || []), ...(veloChartOptions.plugins || [])],
            ...(veloChartOptions.directOptions || {})
        };

        const finalProps = {
            birthday: iztroParams.birthday,
            birthTime: parseInt(payload.birthTime, 10), // 確保 birthTime 是數字
            gender: iztroParams.gender,
            birthdayType: iztroParams.birthdayType,
            timeZone: iztroParams.timeZone,
            fixedLeap: payload.fixedLeap,
            options: finalOptions,
        };
        // 如果 language 或 plugins 是 Iztrolabe 的頂級 props，從 options 中移出
        if (Object.prototype.hasOwnProperty.call(finalOptions, 'language') && finalProps.options.language === finalOptions.language) {
             finalProps.language = finalOptions.language;
             delete finalProps.options.language;
        }
        if (Object.prototype.hasOwnProperty.call(finalOptions, 'plugins') && finalProps.options.plugins === finalOptions.plugins) {
            finalProps.plugins = finalOptions.plugins;
            delete finalProps.options.plugins;
        }
        
        console.log('[ZiweiChart FINAL PROPS]', JSON.stringify(finalProps, null, 2));
        this.renderPlaceholder("渲染中...");

        setTimeout(() => {
            if (!this._reactRoot) {this.renderError("React Root is null in timeout", true); this._isRendering = false; return; }
            try {
                this._reactRoot.render(React.createElement(AstrolabeComponent, finalProps));
            } catch (error) { this.renderError(`渲染異常: ${error.message}`); }
            finally { this._isRendering = false; }
        }, 50);
    }
    
    renderPlaceholder(message) {
        // ... (保持之前的 placeholder 邏輯)
        if (!this._reactRoot || !this._mountPoint) return;
        try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message)); }
        catch (e) { this._mountPoint.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React Err)</div>`; }
    }
    renderError(message, isCritical = false) {
        // ... (保持之前的 error 邏輯)
        if (!this._reactRoot || !this._mountPoint) {
            if(this.shadowRoot) this.shadowRoot.innerHTML = `<style>.error-message-in-shadow{...}</style><div class="message-display-in-shadow error-message-in-shadow">${message}</div>`;
            return;
        }
        try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message)); }
        catch (e) { this._mountPoint.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React Err)</div>`; }
    }

    set birthData(value) { /* ... 保持之前 set birthData 邏輯 ... */ 
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } catch (e) { this.renderError('birthData 格式錯誤。'); return; }
        }
        this._data = { ...this._data, birthData: parsedValue };
        if (this._isMounted) { this.renderChartFromAttributes(true); } // 強制渲染
    }
    get birthData() { return this._data?.birthData; }
    set chartOptions(value) { /* ... 保持之前 set chartOptions 邏輯 ... */ 
        let parsedValue = value;
        if (typeof value === 'string') {
            try { parsedValue = JSON.parse(value); } catch (e) { console.warn('chartOptions 解析失敗'); }
        }
        this._data = { ...this._data, chartOptions: parsedValue };
        if (this._isMounted) { this.renderChartFromAttributes(true); } // 強制渲染
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
    console.warn('[ZiweiChart CE SCRIPT] ziwei-chart already defined or customElements API issue.');
}