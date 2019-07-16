import {Application} from '@fluidnext/library/src/core/Application';
import {Module} from '@fluidnext/library/src/core/module/Module';
import {WebComponent} from '@fluidnext/library/src/core/webcomponent/WebComponent';
import {PropertyHydrator} from '@fluidnext/library/src/hydrator/index';
import {HydratorStrategy, PathStrategy} from '@fluidnext/library/src/hydrator/strategy/value/index';
import {Container} from  '@fluidnext/library/src/container/Container';
import {Localize} from '@fluidnext/library/src/localize/Localize';

process.env.APP_ENVIRONMENT = process.env.APP_ENVIRONMENT === undefined ? 'production' : process.env.APP_ENVIRONMENT;

const fs = require('fs');
const path = require('path');
const back = process.env.APP_ENVIRONMENT === 'development' ? '/../../../' : '/../../';

const basePath = path.normalize(`${__dirname}${back}`);
const modulePath = path.normalize(`${__dirname}${back}module${path.sep}`);
const resourcePath = path.normalize(`${__dirname}${back}storage${path.sep}`);

/**
 * Container service of application
 *
 * @type {Container}
 */
const container = new Container();

const config =  JSON.parse(
    fs.readFileSync(`${basePath}config${path.sep}config-${process.env.APP_ENVIRONMENT}.json`).toString()
);
/***********************************************************************************************************************
                                               CONFIG SERVICE
***********************************************************************************************************************/
container.set('Config', config);

/***********************************************************************************************************************
                                              LOCALIZE SERVICE
 ***********************************************************************************************************************/
container.set('Localize', new Localize(
    config.localize.defaultLanguage,
    config.localize.languages
));

/***********************************************************************************************************************
                                                GLOBAL SERVICE
 **********************************************************************************************************************/
class GlobalService {

    globalInterface() {
        return 'globalInterface';
    }
}

container.set('GlobalService', new GlobalService());

/***********************************************************************************************************************
                                             APPLICATION SERVICE
 **********************************************************************************************************************/

let hydratorWebComponent = new PropertyHydrator(new WebComponent());
hydratorWebComponent.addValueStrategy('path',  new PathStrategy());

let hydratorModule = new PropertyHydrator(new Module());
hydratorModule.addValueStrategy('autoloadsWc', new HydratorStrategy(hydratorWebComponent));
hydratorModule.addValueStrategy('entryPoint', new HydratorStrategy(hydratorWebComponent));

let modules = JSON.parse(fs.readFileSync(`${basePath}${path.sep}config${path.sep}module.json`).toString());
let modulesHydrate = [];

for (let cont = 0; modules.length > cont; cont++) {
    modulesHydrate.push(hydratorModule.hydrate(modules[cont]));
}

const application = new Application();

application.setBasePath(basePath)
    .setModulePath(modulePath)
    .setResourcePath(resourcePath)
    .loadModules(modulesHydrate, container);

container.set('Application', application);

application.getEventManager().on(
    Application.BOOTSTRAP_MODULE,
    (evt) => {

        let applicationElement = document.createElement('application-layout');
        applicationElement.section = 'dashboard';
        if (document.body) {
            document.body.appendChild(applicationElement);
        } else {
            window.addEventListener('DOMContentLoaded', (event) => {
                document.body.appendChild(applicationElement);
            });
        }
    }
);

/**
 * Load application in global scope
 */
switch (true) {
    case  typeof window !== 'undefined':

        Object.defineProperty(window, 'container', {
            value: container,
            writable: false
        });

        break;
    case  typeof global !== 'undefined':

        Object.defineProperty(global, 'container', {
            value: container,
            writable: false
        });

        break;
    default:
        throw 'wrong context';
}
