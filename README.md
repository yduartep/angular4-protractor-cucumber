# Angular 4 Protractor - Cucumber

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

# Get the Code
```
git clone https://github.com/yduartep/angular4-protractor-cucumber.git
cd angular4-protractor-cucumber
npm i
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
**Note**: Remember to start the server before to execute the e2e test (`ng serve`).

You can also specify the name of the feature(s) you want to execute separately using the following command:

`npm run e2e -- --features=playground,dashboard`

### E2E tests - multiple capabilities

If you desire to run e2e tests using multiple capabilites, you need to:
1. npm run **start**: start the application server.
2. npm run **webdriver:start**: start the selenium web driver server
3. npm run **e2e:hub**: execute the tests using multiple browsers on different versions and/or different operating system.

## Cucumber report
After execute the e2e tests, some html and json reports are generated in the forlder **reports**.
