import {html} from '@polymer/polymer/polymer-element.js';
import {FLUIDNEXTLocalizeElement} from "../../../elements/localize/fluidnext-localize";
import {lang} from './language/language.js';

/**
 * @customElement
 * @polymer
 */
class WelcomeElement extends FLUIDNEXTLocalizeElement {
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

