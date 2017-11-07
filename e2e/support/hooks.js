"use strict";
const {browser, by, element} = require("protractor");
const {Cucumber, BeforeAll, After, Status} = require("cucumber");

/**
 * Go the angular starter page before to start eah test
 */
BeforeAll({timeout: 30 * 1000}, function (callback) {
  return browser.get('http://localhost:4200').then(()=> {
    callback();
  });
});

/**
 * Logout after finish the execution of each test to start from initial application state
 */
After(function (scenario, callback) {
  if (scenario.result.status === Status.FAILED) {
    const attach = this.attach; // cucumber's world object has attach function which should be used
    return browser.takeScreenshot().then(function (png) {
      const decodedImage = new Buffer(png, "base64");
      return attach(decodedImage, "image/png");
    });
  }
  else {
    // logout before to start the next test
    element(by.id('linkLogout')).click().then(() => {
      callback();
    });
  }
});


