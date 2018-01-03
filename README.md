# Nextbooking Web Application

The web application for the **Nextbooking** system developed using Angular2.
This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

[![build status](http://gitlab.softence.com/next-group/nextbooking-angular2/badges/master/build.svg)](http://gitlab.softence.com/next-group/nextbooking-angular2/commits/master)
[![coverage report](http://gitlab.softence.com/next-group/nextbooking-angular2/badges/master/coverage.svg)](http://gitlab.softence.com/next-group/nextbooking-angular2/commits/master)


# Getting Started

Follow the following in order to get started with development on this project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deployment

As it is evident from the deploy jobs in the `.gitlab-ci.yml` file, you must run the following sequence of commands in order to deploy an i18n version of this application.

```bash
$ npm run build:da -- --env=<staging|prod>
$ npm run build:en -- --env=<staging|prod>
$ cp src/index.html.dist dist/index.html
$ firebase deploy --only hosting
```

where `env` must be one of `staging` or `prod`. Please note that is vital to remember `cp src/index.html.dist dist/index.html` before deploying the built app. Please also not that above build commands only build the application for `da` and `en` languages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Internationalization (i18n)

This project supports **i18n** and has been translated to many languages. The following documentation is intented to help with maintaining i18n.

## Extraction and Translation

Run the following command in order to extract the strings for translations:

```bash
$ npm run xi18n
```

The above command will extract all the strings that has to be translated to `src/locale/messages.xlf` and also create/update the messages file for each language supported by the project.

## New Language

In order to add support for a new language, the following files must be changed:

- **xliffmerge.json**: extend the `languages` list with the new language code, e.g. `da`
- **src/index.html.dist**: extend the `languages` list with the new languages code, e.g. `da`
- **firebase.json**: add a rewrite rule for the language
- **package.json**: add a build script, e.g. `build:en`, for the new language
- **.gitlab-ci.yml**: add the build command for the new language to the deployment jobs `deploy_to_staging` and `deploy_to_production`.
- **index.html**: make sure to add the locale file for the new language under the FullCalendar (v3.5.1).
