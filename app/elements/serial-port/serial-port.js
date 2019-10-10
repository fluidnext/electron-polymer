import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-card/paper-card';
import {lang} from "./language/language.js";
import {ServiceInjectorMixin} from "../mixin/service/injector-mixin"
import {LocalizeMixin} from "../mixin/localize/localize-mixin";

/**
 * @customElement
 * @polymer
 */
export class SerialPort extends LocalizeMixin(ServiceInjectorMixin(PolymerElement)) {

    static get template() {
        return html`
            <style>
                paper-card {
                    width: 100%;
                    padding: 8px;
                }
                
                .title {
                    font-size: 22px;
                    padding-bottom: 10px;
                }
                
                .port {
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 6px;
                    justify-content: space-between;
                }
                
                .port div {
                    padding-right: 6px;
                }
                
            </style>
            <paper-card>
                <div class="title">{{localize('list-port')}}</div>
                <template is="dom-repeat" items="[[ports]]" as="port">
                    <div class="port">
                        <div>{{port.comName}}</div>
                        <div>{{port.manufacturer}}</div>
                        <div>{{port.productId}}</div>
                        <div>{{port.serialNumber}}</div>
                        <div>{{port.vendorId}}</div>
                    </div>
                </template>
                <template is="dom-if"  if="{{error}}">
                    {{error}}
                </template>
            </paper-card>
        `;
    }

    static get properties() {
        return {
            services : {
                value : {
                    _localizeService: 'Localize'
                }
            },

            serialport: {
                readOnly: true
            },

            error: {
                type: String
            }
        };
    }

    constructor() {
        super();
        this.resources = lang;
    }

    ready() {
        super.ready();
        this._setSerialport(require('serialport'));
        this.serialport.list((err, ports) => {
            console.log('ports', ports);
            if (err) {
                this.error = err.message
                return
            }
            this.ports = ports;
        });
    }


}

window.customElements.define('serial-port', SerialPort);