(function () {
    'use strict';

    // src/ziwei-chart/element.js (極簡測試版)
    class SimpleTestElement extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({
          mode: 'open'
        });
        console.log('SimpleTestElement constructor called!');
      }
      connectedCallback() {
        console.log('SimpleTestElement connected!');
        this.shadowRoot.innerHTML = `
            <style>
                div { padding: 20px; background-color: lightblue; border: 1px solid blue; }
            </style>
            <div>Hello from Simple Test Element! Attribute value: <span id="val"></span></div>
        `;
        this.updateContent(this.getAttribute('message'));
      }
      static get observedAttributes() {
        return ['message'];
      }
      attributeChangedCallback(name, oldValue, newValue) {
        console.log(`SimpleTestElement attribute ${name} changed to: ${newValue}`);
        if (name === 'message') {
          this.updateContent(newValue);
        }
      }
      updateContent(message) {
        if (this.shadowRoot.querySelector('#val')) {
          this.shadowRoot.querySelector('#val').textContent = message || 'not set';
        }
      }
    }
    if (!customElements.get('ziwei-chart-embed')) {
      // 保持標籤名一致，方便測試
      customElements.define('ziwei-chart-embed', SimpleTestElement);
      console.log('ziwei-chart-embed (SimpleTestElement) defined!');
    } else {
      console.log('ziwei-chart-embed (SimpleTestElement) already defined.');
    }

})();
//# sourceMappingURL=ziwei-chart.bundle.js.map
