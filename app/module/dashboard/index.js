import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './element/paper-dashboard/paper-dashboard';
import '../../elements/serial-port/serial-port';

/**
 * @customElement
 * @polymer
 */
class DashboardIndex extends PolymerElement {
    static get template() {
        return html`
            <style>
                paper-dashboard {
                    display: block;
                    margin-bottom: 10px;
                }
            </style>
           <paper-dashboard></paper-dashboard>
           <serial-port></serial-port>
        `;
    }
}
window.customElements.define('dashboard-index', DashboardIndex);

