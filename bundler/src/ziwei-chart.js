// bundler/src/ziwei-chart.js (Focus on logging keys of 'iztro' object)
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as iztro from 'react-iztro'; // <--- 改回 import *

console.log('[ZiweiChart CE SCRIPT] Top-level: Script execution started. React, ReactDOM, iztro imported.');
console.log('[ZiweiChart CE SCRIPT] Type of iztro (import *):', typeof iztro);
if (typeof iztro === 'object' && iztro !== null) {
    const initialIztroKeys = Object.keys(iztro);
    console.log('[ZiweiChart CE SCRIPT] Initial iztro object ACTUAL KEYS:', initialIztroKeys); // 打印鍵名數組
    initialIztroKeys.forEach(key => {
        console.log(`[ZiweiChart CE SCRIPT]   Key: "${key}", Type: ${typeof iztro[key]}`); // 打印每個鍵名和類型
        if (key === 'default' && typeof iztro[key] === 'object' && iztro[key] !== null) {
             console.log(`[ZiweiChart CE SCRIPT]     Properties of iztro.default:`, Object.keys(iztro[key]));
             console.log(`[ZiweiChart CE SCRIPT]     Type of iztro.default.Astrolabe:`, typeof iztro[key].Astrolabe);
        }
        if (key === 'Astrolabe') { // 直接檢查是否存在名為 Astrolabe 的鍵
            console.log('[ZiweiChart CE SCRIPT]   Found "Astrolabe" key directly on iztro object!');
        }
    });
    console.log('[ZiweiChart CE SCRIPT] Checking iztro.Astrolabe directly (after logging keys):', typeof iztro.Astrolabe);
    console.log('[ZiweiChart CE SCRIPT] Checking iztro.default?.Astrolabe (if default is an object):', typeof iztro.default?.Astrolabe);

} else {
    console.warn('[ZiweiChart CE SCRIPT] Initial iztro object is not an object or is null.');
}

// antdResetCSS 和 reactIztroDefaultCSS 的定義保持不變 (從您上次提供的代碼複製)
const antdResetCSS = `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; } *, *::before, *::after { box-sizing: border-box; } html { font-family: sans-serif; line-height: 1.15; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -ms-overflow-style: scrollbar; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; line-height: 1.5715; color: rgba(0,0,0,.85); background-color: #fff; }`;
const reactIztroDefaultCSS = `.iztro-astrolabe-theme-default { --iztro-star-font-size-big: 13px; --iztro-star-font-size-small: 12px; --iztro-color-major: #531dab; --iztro-color-focus: #000; --iztro-color-quan: #2f54eb; --iztro-color-tough: #612500; --iztro-color-awesome: #d4380d; --iztro-color-active: #1890ff; --iztro-color-happy: #c41d7f; --iztro-color-nice: #237804; --iztro-color-decorator-1: #90983c; --iztro-color-decorator-2: #813359; --iztro-color-text: #8c8c8c; --iztro-color-border: #00152912; --iztro-color-decadal: var(--iztro-color-active); --iztro-color-yearly: var(--iztro-color-decorator-2); --iztro-color-monthly: var(--iztro-color-nice); --iztro-color-daily: var(--iztro-color-decorator-1); --iztro-color-hourly: var(--iztro-color-text); } .iztro-astrolabe { text-align: left; } .iztro-palace { border: 1px solid var(--iztro-color-border); } .iztro-star-soft, .iztro-star-tough, .iztro-star-adjective, .iztro-star-flower, .iztro-star-helper, .iztro-palace-fate, .iztro-palace-horo-star, .iztro-palace-scope, .iztro-palace-dynamic-name, .iztro-palace-lft24, .iztro-palace-rgt24 { font-size: var(--iztro-star-font-size-small); font-weight: normal; text-wrap: nowrap; } .iztro-palace-scope-age { text-wrap: balance; } .iztro-palace-scope-age, .iztro-palace-scope-decadal { color: var(--iztro-color-text); } .iztro-palace-lft24 { color: var(--iztro-color-decorator-1); } .iztro-palace-rgt24 { color: var(--iztro-color-decorator-2); text-wrap: nowrap; } .iztro-star-major, .iztro-star-tianma, .iztro-star-lucun, .iztro-palace-name, .iztro-palace-gz { font-size: var(--iztro-star-font-size-big); font-weight: bold; } .iztro-star-tianma { color: var(--iztro-color-active); } .iztro-star-lucun { color: var(--iztro-color-awesome); } .iztro-palace-horo-star .iztro-star { opacity: 0.75; } .iztro-palace-horo-star .iztro-star-tianma, .iztro-palace-horo-star .iztro-star-lucun { font-weight: normal; font-size: var(--iztro-star-font-size-small); } .iztro-star-brightness, .iztro-star-adjective { font-style: normal; font-weight: normal; color: var(--iztro-color-text); } .iztro-star-brightness { opacity: 0.5; } .iztro-star-major, .iztro-star-soft, .iztro-palace-name { color: var(--iztro-color-major); } .iztro-star-tough { color: var(--iztro-color-tough); } .iztro-star-flower { color: var(--iztro-color-happy); } .iztro-star-helper, .iztro-palace-gz { color: var(--iztro-color-nice); } .iztro-star-mutagen.mutagen-0 { background-color: var(--iztro-color-awesome); } .iztro-star-mutagen.mutagen-1 { background-color: var(--iztro-color-quan); } .iztro-star-mutagen.mutagen-2 { background-color: var(--iztro-color-nice); } .iztro-star-mutagen.mutagen-3 { background-color: var(--iztro-color-focus); } .iztro-star-mutagen.mutagen-decadal { background-color: var(--iztro-color-decadal); opacity: 0.6; } .iztro-star-mutagen.mutagen-yearly { background-color: var(--iztro-color-yearly); opacity: 0.6; } .iztro-star-mutagen.mutagen-monthly { background-color: var(--iztro-color-monthly); opacity: 0.6; } .iztro-star-mutagen.mutagen-daily { background-color: var(--iztro-color-daily); opacity: 0.6; } .iztro-star-mutagen.mutagen-hourly { background-color: var(--iztro-color-hourly); opacity: 0.6; } .iztro-palace-gz .iztro-palace-gz-active { background-color: var(--iztro-color-nice); color: #fff; font-weight: normal; } .iztro-star-mutagen-0 { background-color: var(--iztro-color-awesome); color: #fff; font-weight: normal; } .iztro-star-mutagen-1 { background-color: var(--iztro-color-quan); color: #fff; font-weight: normal; } .iztro-star-mutagen-2 { background-color: var(--iztro-color-nice); color: #fff; font-weight: normal; } .iztro-star-mutagen-3 { background-color: var(--iztro-color-focus); color: #fff; font-weight: normal; } .iztro-star-self-mutagen-0::before { background-color: var(--iztro-color-awesome); } .iztro-star-self-mutagen-1::before { background-color: var(--iztro-color-quan); } .iztro-star-self-mutagen-2::before { background-color: var(--iztro-color-nice); } .iztro-star-self-mutagen-3::before { background-color: var(--iztro-color-focus); } .iztro-star-hover-mutagen-0::after { background-color: var(--iztro-color-awesome); } .iztro-star-hover-mutagen-1::after { background-color: var(--iztro-color-quan); } .iztro-star-hover-mutagen-2::after { background-color: var(--iztro-color-nice); } .iztro-star-hover-mutagen-3::after { background-color: var(--iztro-color-focus); } .iztro-palace-name-body { font-size: var(--iztro-star-font-size-small); font-weight: normal; position: absolute; margin-top: 2px; } .iztro-palace-fate span { display: block; padding: 0 3px; border-radius: 4px; color: #fff; background-color: var(--iztro-color-major); cursor: pointer; } .iztro-palace-center-item { font-size: var(--iztro-star-font-size-small); line-height: 22px; } .iztro-palace-center-item label { color: var(--iztro-color-text); } .iztro-palace-center-item span { color: var(--iztro-color-decorator-1); } .gender { display: inline-block; margin-right: 5px; } .gender.gender-male { color: var(--iztro-color-quan); } .gender.gender-female { color: var(--iztro-color-happy); }`;

class ZiweiChart extends HTMLElement {
    // ... (static get observedAttributes, constructor, connectedCallback, disconnectedCallback, attributeChangedCallback, _parseAndRender, renderPlaceholder, renderError 保持與我上次提供的【完整帶日誌版本】一致)

    // 只需要修改 _renderAstrolabeWithReact 函數，如下：
    _renderAstrolabeWithReact(payload) {
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact CALLED. Payload:', JSON.stringify(payload));
        console.log('[ZiweiChart INSTANCE] Current iztro object in _renderAstrolabeWithReact:', iztro); 
        if (typeof iztro === 'object' && iztro !== null) {
            const runtimeIztroKeys = Object.keys(iztro);
            console.log('[ZiweiChart INSTANCE] iztro object keys in _renderAstrolabeWithReact ARRAY:', runtimeIztroKeys);
            runtimeIztroKeys.forEach(key => {
                console.log(`[ZiweiChart INSTANCE]   Runtime iztro key: "${key}", value type: ${typeof iztro[key]}`);
                 // 如果鍵是 'default'，並且它是一個對象，嘗試查看它是否有 Astrolabe 屬性
                if (key === 'default' && typeof iztro[key] === 'object' && iztro[key] !== null) {
                    console.log(`[ZiweiChart INSTANCE]     Properties of iztro.default:`, Object.keys(iztro[key]));
                    console.log(`[ZiweiChart INSTANCE]     Type of iztro.default.Astrolabe:`, typeof iztro[key].Astrolabe);
                }
                // 直接檢查 iztro 對象自身是否有一個名為 Astrolabe 的屬性
                if (key === 'Astrolabe') {
                     console.log('[ZiweiChart INSTANCE]   Found "Astrolabe" key directly on iztro object during iteration!');
                }
            });
            console.log('[ZiweiChart INSTANCE] iztro.Astrolabe type (direct access):', typeof iztro.Astrolabe);
            console.log('[ZiweiChart INSTANCE] iztro.Astrolabe value (direct access):', iztro.Astrolabe);
            console.log('[ZiweiChart INSTANCE] iztro.default?.Astrolabe type (optional chaining):', typeof iztro.default?.Astrolabe);

        } else {
             console.error('[ZiweiChart INSTANCE] iztro is not an object or is null in _renderAstrolabeWithReact');
        }

        if (!this._reactRoot) {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React root is NOT INITIALIZED!');
            this.renderError('渲染引擎錯誤 (React Root丢失)。', true);
            return;
        }
        if (!payload) {
            console.warn('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Payload is empty.');
            this.renderError('命盤核心數據 (payload) 為空。');
            return;
        }

        // 決定使用哪個 Astrolabe 組件
        let AstrolabeComponentToUse = undefined;
        if (typeof iztro.Astrolabe !== 'undefined') {
            AstrolabeComponentToUse = iztro.Astrolabe;
            console.log('[ZiweiChart INSTANCE] Using iztro.Astrolabe');
        } else if (iztro.default && typeof iztro.default.Astrolabe !== 'undefined') {
            AstrolabeComponentToUse = iztro.default.Astrolabe;
            console.log('[ZiweiChart INSTANCE] Using iztro.default.Astrolabe');
        } else if (iztro.default && typeof iztro.default === 'function' && iztro.default.name === 'Astrolabe') {
            // 這種情況比較少見，但如果 default 導出本身就是 Astrolabe 組件
            AstrolabeComponentToUse = iztro.default;
            console.log('[ZiweiChart INSTANCE] Using iztro.default as Astrolabe component');
        }


        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Checking determined AstrolabeComponentToUse availability...');
        if (typeof AstrolabeComponentToUse === 'undefined') {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: CRITICAL - Astrolabe component is STILL UNDEFINED after checking iztro and iztro.default!');
            this.renderError('命盤核心組件 (Astrolabe) 未能從iztro庫中正確獲取。');
            return;
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: AstrolabeComponentToUse IS AVAILABLE.');

        const { birthDate, birthTime, gender, solar, lang } = payload;
        const iztroBirthTimeNum = parseInt(birthTime, 10);

        if (isNaN(iztroBirthTimeNum)) {
            console.error(`[ZiweiChart INSTANCE] _renderAstrolabeWithReact: birthTime "${birthTime}" is NaN.`);
            this.renderError(`時辰數據錯誤: "${birthTime}".`);
            return;
        }

        const iztroInputOptions = {
            birthday: birthDate,
            birthTime: iztroBirthTimeNum,
            gender: gender === 'M' ? 'male' : 'female',
            birthdayType: solar ? 'solar' : 'lunar',
            language: lang === 'zh' ? 'zh-TW' : (lang === 'en' ? 'en' : 'zh-TW'),
        };
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Final options for Astrolabe:', JSON.stringify(iztroInputOptions));

        try {
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Attempting React.createElement(AstrolabeComponentToUse)...');
            const astrolabeElement = React.createElement(AstrolabeComponentToUse, iztroInputOptions);
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React.createElement result:', astrolabeElement ? 'Element created' : 'Element creation FAILED');

            if (!astrolabeElement) {
                 console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React.createElement(AstrolabeComponentToUse) returned null/undefined.');
                 this.renderError('無法創建命盤圖表實例。');
                 return;
            }

            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: Attempting this._reactRoot.render()...');
            this._reactRoot.render(astrolabeElement);
            console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: React render() call executed.');

        } catch (error) {
            console.error('[ZiweiChart INSTANCE] _renderAstrolabeWithReact: >>> EXCEPTION during React rendering <<<', error);
            console.error('  Error Name:', error.name);
            console.error('  Error Message:', error.message);
            if (error.stack) {
                console.error('  Error Stack:', error.stack);
            }
            this.renderError(`渲染命盤時發生內部錯誤: ${error.message}.`);
        }
        console.log('[ZiweiChart INSTANCE] _renderAstrolabeWithReact FINISHED.');
    }

    // renderPlaceholder 和 renderError 函數保持與我上次提供的【完整帶日誌版本】一致
    renderPlaceholder(message) { 
        console.log(`[ZiweiChart INSTANCE] renderPlaceholder CALLED. Message: "${message}"`);
        const target = this.shadowRoot.getElementById('chart-render-target');
        if (!target) { console.error('Placeholder: Target not found'); return; }
        if (this._reactRoot) { try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow loading-message-in-shadow' }, message)); } catch (e) { target.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (React err)</div>`;}
        } else { target.innerHTML = `<div class="message-display-in-shadow loading-message-in-shadow">${message} (No React root)</div>`; }
    }

    renderError(message, isCritical = false) { 
        console.error(`[ZiweiChart INSTANCE] renderError CALLED. Message: "${message}", isCritical: ${isCritical}`);
        const target = this.shadowRoot.getElementById('chart-render-target');
        if (!target) { console.error('ErrorMsg: Target not found'); if(isCritical) this.shadowRoot.innerHTML = `<div style="color:red;">FATAL: ${message}</div>`; return; }
        if (this._reactRoot && !isCritical) { try { this._reactRoot.render(React.createElement('div', { className: 'message-display-in-shadow error-message-in-shadow' }, message)); } catch (e) { target.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (React err)</div>`; }
        } else { target.innerHTML = `<div class="message-display-in-shadow error-message-in-shadow">${message} (No React root or critical)</div>`; }
    }
} // class ZiweiChart 結束

console.log('[ZiweiChart CE SCRIPT] Class ZiweiChart defined. Attempting customElements.define...');
if (!customElements.get('ziwei-chart')) {
    try {
        customElements.define('ziwei-chart', ZiweiChart);
        console.log('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" DEFINED SUCCESSFULLY.');
    } catch (e) {
        console.error('[ZiweiChart CE SCRIPT] CRITICAL ERROR defining custom element "ziwei-chart":', e);
    }
} else {
    console.warn('[ZiweiChart CE SCRIPT] Custom element "ziwei-chart" was ALREADY DEFINED.');
}
console.log('[ZiweiChart CE SCRIPT] Top-level script execution FINISHED.');