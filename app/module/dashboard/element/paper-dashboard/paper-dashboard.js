import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {ServiceInjectorMixin} from "../../../../elements/mixin/service/injector-mixin";
import {LocalizeMixin} from "../../../../elements/mixin/localize/localize-mixin";
import {lang} from './language/language.js';

/**
 * @customElement
 * @polymer
 */
class PaperDashboard extends LocalizeMixin(ServiceInjectorMixin(PolymerElement)) {
    static get template() {
        return html`
            <div class="container">
                {{localize('name', 'name', 'Mario')}}
            </div>
        `;
    }

    static get properties() {
        return {
            services : {
                value : {
                    _localizeService: 'Localize'
                }
            }
        };
    }

    constructor() {
        super();
        this.resources = lang;
    }
}
window.customElements.define('paper-dashboard', PaperDashboard);

