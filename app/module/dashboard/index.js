import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './element/paper-dashboard/paper-dashboard';

/**
 * @customElement
 * @polymer
 */
class DashboardIndex extends PolymerElement {
    static get template() {
        return html`
           <paper-dashboard></paper-dashboard>
        `;
    }
}
window.customElements.define('dashboard-index', DashboardIndex);

