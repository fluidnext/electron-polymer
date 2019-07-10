# FLUIDNEXT

FLUIDNEXT is a starter kit to start an electron project with [Polymer 3 ](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview)

The application are modular, before launch the [application](https://github.com/fluidnext/electron-polymer/blob/master/app/elements/layout/application-layout.js) all the modules are loaded.

This flow ensures that the services and web components are loaded before the application starts.

The structure of a Module is:

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
    "autoloadsWs": [
        {
            "name": "dashboard-icons",
            "path": "element/icons/icons.js"
        }
    ]
}

```

- TITLE

    The title of the module use to view in the application.

- NAME

    The name of the module  **MUST BE** unique.

- ICON

    The name of the iron icon use in the menu.

- CONFIGENTRYPOINT

    The name of the file that load al services for this module.  **MUST BE** implements the method init().

- ENTRYPOINT

    The object that contain the information (name and path) of the webcomponent use to entrypoint of the module.

- AUTOLOADS

    Array of the ES6 path file that are load global in the application by their name class.

- AUTOLOADSWS

    Array of object (name and path) of the web component that are load to the browser.

The flow of loading a module is as follows (the steps are loaded synchronously):

1. load entrypoint
2. load autoloads
3. load autoloads
3. load configentrypoint

After the load of all module are loaded the application. To help the developers you can use the [cli](https://github.com/fluidnext/electron-polymer-cli)

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
