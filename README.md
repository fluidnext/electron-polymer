# FLUIDNEXT

FLUIDNEXT is a starter kit to start an electron project with [Polymer 3 ](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview)

The application are modular, before launch the [application](https://github.com/fluidnext/electron-polymer/blob/master/app/elements/layout/application-layout.js) all the modules are loaded,
this flow ensures that the services and web components are loaded before the application starts.

The structure of a module is:

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
