# ElectronPolymer

ElectronPolymer is a starter kit that allows the creation of an [Electron](https://github.com/fluidnext/electron-polymer/blob/master/app/elements/layout/application-layout.js) 
project with [Polymer 3 ](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview).
The core of the application uses [fluid library](https://github.com/fluidnext/library).

The application is modular, before launching the [application](https://github.com/fluidnext/electron-polymer/blob/master/app/elements/layout/application-layout.js) 
all the modules are loaded. This flow ensures that the services and web components are loaded before the application starts.
The entry point of the application is [boot.js](https://github.com/fluidnext/electron-polymer/blob/master/app/entrypoint/dashboard/src/boot.js) where all the services are located

![application life cicle](https://raw.githubusercontent.com/fluidnext/electron-polymer/master/doc/image/life-cicle.png)

The structure of a Module is as seen below:

![module structure](https://raw.githubusercontent.com/fluidnext/electron-polymer/master/doc/image/module-strucure.png)

This structure is respected in the relative package.json

```javascript
{
    "title": "Dashboard",
    "name": "dashboard",
    "icon": "dashboard:menu",
    "configEntryPoint": "config.js",
    "entryPoint": {
        "name": "dashboard-index",
        "path": "index.js"
    },
    "autoloads": [
        "src/DashboardService.js"
    ],
    "autoloadsWc": [
        {
            "name": "dashboard-icons",
            "path": "element/icons/icons.js"
        }
    ]
}

```

- *TITLE*

    The module label.

- *NAME*

    The label of the module  **MUST BE** unique.

- *ICON*

    The label of the iron icon used in the menu.

- *CONFIGENTRYPOINT*

    The label of the class (file) that loads all the services for this module. The class **MUST IMPLEMENT** the method init().

- *ENTRYPOINT*

    The object that contains the information (name and path) of the webcomponent. The webcomponent is used as the entrypoint of the module.

- *AUTOLOADS*

    Array of the ES6 class that are loaded globally in the application by their name class (you can call the class from the developer tool writing the name of the class on the command line).

- *AUTOLOADSWS*

    Array of objects (name and path) of the web component that are loaded to the browser.

The flow of loading a module is as follows (the steps are loaded synchronously):

1. load wc entry point
2. load ES6 object
3. load web components
3. load config

After all the modules have loaded the application triggers the event ***bootstrap-module***.
The application listens to the event and creates the [applicationt-layout](https://github.com/fluidnext/electron-polymer/blob/master/app/elements/layout/application-layout.js) 
which is attacted to the DOM.
 
To help the developers you can use the [cli](https://github.com/fluidnext/electron-polymer-cli).

## Install

[Npm](https://www.npmjs.com/get-npm) is required to install the project, once the repository has been cloned run:
```bash
npm install
```

## Run
```bash
npm start
```

## Run Test
```bash
npm run test
```

## Build Electron Bundle
To bundle the application you first need to modify the app/config/config.json file to set the env to prod, then the application MUST BE built with polymer-cli, run this command:
```bash
npm run build-polymer
```

Once the build process has finished, the build folder will be created, then the application can be packaged with the following command:

```bash
npm run dist
```

you can also run the pre build bundle:

```bash
npm run start-pre-build
```
