'use strict';
const config = require('./protractor.shared.conf').config;
const chrome = require('./e2e/config/browsers/chrome.config').config;
const firefox = require('./e2e/config/browsers/firefox.config').config;
const ie = require('./e2e/config/browsers/ie.config').config;

// NOTE: To run this tests the application must be running in localhost:4200 and
// Selenium hub must be running in localhost:4444.
config.baseUrl = 'http://localhost:4200/';
config.seleniumAddress = 'http://localhost:4444/wd/hub/';

config.multiCapabilities = [
  chrome,
  firefox
];

/**
 * multiple browser in parallel doesn't works
 * because some browser lost the focus and the tests fails
 * so set the number of browsers can run in parallel to just 1
 */
config.maxSessions = 1;

exports.config = config;
