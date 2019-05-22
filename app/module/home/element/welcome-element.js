import {html} from '@polymer/polymer/polymer-element.js';
import {ApplicationLocalizeElement} from "../../../elements/localize/application-localize";
import {lang} from './language/language.js';

/**
 * @customElement
 * @polymer
 */
class WelcomeElement extends ApplicationLocalizeElement {
    static get template() {
        return html`
            <div class="container">
                {{localize('name', 'name', 'Mario')}}
            </div>
        `;
    }

    constructor() {
        super();
        this.resources = lang;
    }
}
window.customElements.define('welcome-element', WelcomeElement);

