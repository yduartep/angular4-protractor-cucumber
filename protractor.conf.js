// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const argv = require('yargs').argv;
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
  specs: getFeatureFiles(),
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',

  onPrepare: function () {
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
    require: ['./e2e/**/*.e2e-spec.ts', './e2e/support/*.js'],
    dryRun: false,        // invoke every formatter without executing steps
  },
  onComplete: function () {
    Reporter.createHTMLReport();
  },
  disableChecks: true,
  useAllAngular2AppRoots: true
};

/**
 * Get the feature files that need to be run based on an command line flag that
 * is passed, if nothing is passed all the feature files are run
 *
 * @example:
 *
 * <pre>
 *     // For 1 features
 *     npm run e2e -- --features=playground
 *
 *     // For multiple features
 *     npm run e2e -- --features=playground,dashboard,...
 *
 *     // Else
 *     npm run e2e
 * </pre>
 *
 * @return {Array<string>}
 */
function getFeatureFiles() {
  const featureArgs = argv.features || process.env['features'] || '';
  if (featureArgs && featureArgs.trim().length > 0) {
    console.log('... loading feature files by parameters. features=' + featureArgs);
    return featureArgs.split(',').map(feature => `${process.cwd()}/e2e/features/${feature}.feature`);
  } else {
    console.log('... loading ALL feature files.');
    return [`${process.cwd()}/e2e/features/*.feature`];
  }
}
