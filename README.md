# Angular 4 Protractor - Cucumber

Protractor - Cucumber - Selenium integration using a Login page as a DEMO on Angular 4.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

![Cucumber Reporter](https://github.com/yduartep/angular4-protractor-cucumber/blob/master/docs/e2e%20-%20demo.gif)

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

Before to execute any functional test is necessary download and update the web drivers. 
So run, first of all, the command `npm run webdriver:update` that will download all the necessary drivers.

Now, if you have already started the server, run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

You can also specify the name of the feature(s) you want to execute separately using the following command:

`npm run e2e -- --features=playground,dashboard`

### E2E tests - multiple capabilities

If you desire to run e2e tests using multiple capabilites, you need to:
1. `npm run start`: start the application server.
2. `npm run webdriver:start`: start the selenium web driver server
3. `npm run e2e:hub`: execute the tests using multiple browsers or different versions and/or different operating system.

### E2E tests - webdriver commands

`npm run webdriver:clean` for remove all the web drivers downloaded or when you have EPERM errors during test execution.

`npm run webdriver:update` to download and update the web drivers of the different browsers you want to use.

`npm run webdriver:start` to start the webdriver manually in the case you want to use a different server for selenium.

## Cucumber report
After execute the e2e tests, some html and json reports are generated in the forlder **reports**.

- This report is generated in the file /reports/html/**cucumber_report.html**:

![Cucumber Report](https://github.com/yduartep/angular4-protractor-cucumber/blob/master/docs/cucumber_report.PNG)

- This report is generated in the file /reports/html/**cucumber_reporter.html**:

![Cucumber Reporter](https://github.com/yduartep/angular4-protractor-cucumber/blob/master/docs/cucumber_reporter.PNG)

## E2E - Project Structure
- **protractor.conf.js**: contains the protractor configuration used by angular-cli to execute the e2e tests throught the command `ng e2e` using chrome as browser by default.

- **protractor.shared.conf.js**: contains the shared configuration between all kinds of tests execution that use protractor.

- **protractor.hub.conf.js**: contains the configuration necessary to execute e2e test using multicapabilites.

- **e2e/config/browsers**: contains all the browser's configuration necessary to execute the tests.

- **e2e/config/helpers/chai-imports.ts**: This file is used to avoid repeating the import of chai library in any step.

- **e2e/features/step_definitions**: contains the steps to execute. The name must end always with **.e2e-spec.ts**.

- **e2e/features**: contains the gherkins definitions in **.feature** files.

- **e2e/pages**: Contains the page objects where are encapsulating the functionalities.

- **e2e/support/hooks.js** - used for setup and teardown the environment before and after each scenario.

- **e2e/support/reporter.js** - Is a class used to define the diferent formats that can be generated in report.
