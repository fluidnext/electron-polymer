import {Application} from '@fluidnext/library/src/core/Application';
import {Module} from '@fluidnext/library/src/core/module/Module';
import {Container} from  '@fluidnext/library/src/container/Container';
import {Localize} from '@fluidnext/library/src/localize/Localize';

process.env.APP_ENVIRONMENT = process.env.APP_ENVIRONMENT === undefined ? 'production' : process.env.APP_ENVIRONMENT;

const fs = require('fs');
const path = require('path');
const back = process.env.APP_ENVIRONMENT === 'development' ? '/../../../' : '/../../';
const slash = window.navigator.appVersion.indexOf('Win') != -1 ? '\\' : '/';

const basePath = path.normalize(`${__dirname}${back}`);
const modulePath = path.normalize(`${__dirname}${back}module${slash}`);
const resourcePath = path.normalize(`${__dirname}${back}storage${slash}`);

/**
 * Container service of application
 *
 * @type {Container}
 */
const container = new Container();

const config =  JSON.parse(
    fs.readFileSync(`${basePath}config${slash}config-${process.env.APP_ENVIRONMENT}.json`).toString()
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
                                                TEST SERVICE
 **********************************************************************************************************************/
container.set('Test', {'name': 'test'});

/***********************************************************************************************************************
                                             APPLICATION SERVICE
 **********************************************************************************************************************/
let modules = JSON.parse(fs.readFileSync(`${basePath}config${slash}module.json`).toString());
// TODO refactor after the introduction of the hydrator module
let modulesHydrate = [];
for (let cont = 0; modules.length > cont; cont++) {
    let module = new Module();
    for (var property in modules[cont]) {
        module[property] = modules[cont][property];
    }
    modulesHydrate.push(module);
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

        if (document.body) {
            let applicationElement = document.createElement('application-layout');
            document.body.appendChild(applicationElement);
        } else {
            window.addEventListener('DOMContentLoaded', (event) => {
                let applicationElement = document.createElement('application-layout');
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
