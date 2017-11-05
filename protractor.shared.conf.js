const chai = require('chai').use(require('chai-as-promised'));
const path = require('path');
const jsonReports = process.cwd() + '/reports/json';
const Reporter = require('./e2e/support/reporter');

exports.config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: ["./e2e/features/*.feature"],
  // resultJsonOutputFile: './reports/json/protractor_report.json',
  onPrepare: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    browser.manage().window().maximize();
    Reporter.createDirectory(jsonReports);
  },
  cucumberOpts: {
    compiler: ['ts:ts-node/register'],
    require: [  // require step definition files before executing features
      path.resolve(process.cwd(), './e2e/stepDefinitions/**/*.steps.ts')
    ],
    strict: true,
    format: ['pretty'],   // specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    require: ['./e2e/stepDefinitions/*.ts', './e2e/support/*.ts'],
    dryRun: false,        // invoke every formatter without executing steps
    tags: ["~@ignore"]    // only execute the features or scenarios with tags matching the expression
  },
  onComplete: function () {
    Reporter.createHTMLReport();
  },
  allScriptsTimeout: 11000,
  disableChecks: true,
  useAllAngular2AppRoots: true
};

/**
 * Get the features files that need to be run based on an command line flag that
 * is passed, if nothing is passed all the features files are run
 *
 * @example:
 *
 * <pre>
 *     // For 1 feature
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
    console.log('... loading feature files by parameters.');
    return featureArgs.split(',').map(feature => `${process.cwd()}/e2e/features/${feature}.feature`);
  }
  console.log('... loading ALL feature files.');
  return [`${process.cwd()}/e2e/features/*.feature`];
}
