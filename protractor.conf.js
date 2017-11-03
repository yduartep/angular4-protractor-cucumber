// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const jsonReports = process.cwd() + '/reports/json';
const Reporter = require('./e2e/support/reporter');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  getPageTimeout: 60000,
  allScriptsTimeout: 11000,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: ["./e2e/features/*.feature"],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',

  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
    global.expect = chai.expect;
    Reporter.createDirectory(jsonReports);
  },
  cucumberOpts: {
    compiler: ['ts:ts-node/register'],
    monochrome: true,
    strict: true,
    format: 'json:./reports/json/cucumber_report.json',
    require: ['./e2e/**/*.e2e-spec.ts', './e2e/support/*.js']
  },
  onComplete: function () {
    Reporter.createHTMLReport();
  },
  disableChecks: true,
  useAllAngular2AppRoots: true
};
