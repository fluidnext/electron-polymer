import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './element/paper-demo/paper-demo';

/**
 * @customElement
 * @polymer
 */
class DemoIndex extends PolymerElement {
    static get template() {
        return html`
           <paper-demo></paper-demo>
        `;
    }
}
window.customElements.define('demo-index', DemoIndex);

