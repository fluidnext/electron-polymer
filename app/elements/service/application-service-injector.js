import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {timeOut} from '@polymer/polymer/lib/utils/async';

/**
 * @customElement
 * @polymer
 */
export class ApplicationServiceInjectorElement extends PolymerElement {

    static get properties () {
        return {
            services: {
                type: Object,
                observer: 'changeServices'
            }
        };
    }

    /**
     * @param newValue
     */
    changeServices(newValue) {
        if (!newValue) {
            return;
        }

        this._searchService(newValue);
    }

    /**
     * @param services
     * @param container
     * @private
     */
    _searchService(services, subContainer) {

        if (services === null || typeof services !== 'object') {
            return;
        }

        for (let property in services) {

            switch (true) {
                case typeof services[property] === 'object' && container.has(property):
                    this._searchService(services[property], container.get(property));
                    break;
                default:
                    if (container.has(services[property])) {
                        container.getAsync(services[property])
                            .then((service) => {
                                this[property] = service;
                            });
                    } else if (subContainer) {
                        subContainer.getAsync(services[property])
                            .then((service) => {
                                this[property] = service;
                            });
                    }
                    break;
            }
        }
    }
}
