import {StepsUtil} from "../../features/utils/steps.util";
const Cucumber = require('cucumber');
const config = require('../../../protractor.e2e.conf').config;

import {browser} from 'protractor';
import * as fs from 'fs';
import {defineSupportCode} from 'cucumber';
import * as reporter from 'cucumber-html-reporter';
import {mkdirp} from 'mkdirp';

defineSupportCode(({registerHandler, registerListener, After, setDefaultTimeout}) => {
  setDefaultTimeout(10 * 1000);
  const jsonReports = process.cwd() + '/reports/json';
  const htmlReports = process.cwd() + '/reports/html';
  const targetJson = jsonReports + '/cucumber_report.json';

  registerHandler('BeforeFeature', (event, callback) => {
    browser.get(config.baseUrl);
    setTimeout(callback, 5000);
  });

  After(function (scenario) {
    let world = this;
    if (scenario.isFailed()) {
      return browser.takeScreenshot().then((screenShot) => {
        // screenShot is a base-64 encoded PNG
        //world.attach(screenShot, 'image/png');
      });
    }
    // TODO is not working
    // browser.getCurrentUrl().then((url) => {
    //   if (!StepsUtil.areSameUrl(url, '/login')) {
    //     new HeaderPage().logout().then(() => {
    //       done();
    //     });
    //   }
    // });
  });

  const cucumberReporterOptions = {
    theme: 'bootstrap',
    jsonFile: targetJson,
    output: htmlReports + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true
  };

  const logFn = string => {
    if (!fs.existsSync(jsonReports)) {
      mkdirp.sync(jsonReports);
    }
    try {
      fs.writeFileSync(targetJson, string);
      reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter
    } catch (err) {
      if (err) {
        console.log(`Failed to save cucumber test results to json file. 
                             Failed to create html report.
                             `);
        console.log(err);
      }
    }
  };

  const jsonFormatter = new Cucumber.JsonFormatter({
    log: logFn
  });
  registerListener(jsonFormatter);
});
