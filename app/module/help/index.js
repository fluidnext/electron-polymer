import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './element/demo-element/demo-element';

/**
 * @customElement
 * @polymer
 */
class HelpIndex extends PolymerElement {
    static get template() {
        return html`
           <demo-element></demo-element>
        `;
    }
}
window.customElements.define('help-index', HelpIndex);

