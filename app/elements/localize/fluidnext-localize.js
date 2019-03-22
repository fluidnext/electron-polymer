import {FLUIDNEXTServiceInjectorElement} from '../service/fluidnext-service-injector';
import {AppLocalizeBehavior} from '@polymer/app-localize-behavior/app-localize-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Localize} from '@fluidnext/library/src/localize/Localize';
import {Listener} from '@fluidnext/library/src/event/Listener';

/**
 * @customElement
 * @polymer
 */
export class FLUIDNEXTLocalizeElement extends mixinBehaviors([AppLocalizeBehavior], FLUIDNEXTServiceInjectorElement) {

    static get properties () {
        return {
            localizeService: {
                type: Object,
                readOnly: true,
                observer: 'changeLocalizeService'
            }
        };
    }

    ready() {
        super.ready();

        if (window.container) {
            window.container.get('Localize').then(function (service) {
                this._setLocalizeService(service)
            }.bind(this));
        }
    }

    /**
     * @param changeLocalizeService
     */
    changeLocalizeService(changeLocalizeService) {
        this.language = this.localizeService.getDefaultLang();
        this._evtListener = new Listener(this.changeLanguage.bind(this));
        this.localizeService.getEventManager().on(Localize.CHANGE_LANGUAGE, this._evtListener)
    }

    /**
     * @param evt
     */
    changeLanguage(evt) {
        this.language = evt.data.language;
    }
}