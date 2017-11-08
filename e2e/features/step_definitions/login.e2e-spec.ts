import {isNullOrUndefined} from 'util';

const {defineSupportCode} = require('cucumber');
import {browser, by, element, ExpectedConditions} from 'protractor';
import {expect} from '../../config/helpers/chai-imports';

// pages
import {LoginPage} from '../../pages/login.po';
import {WelcomePage} from '../../pages/welcome.po';

const page = new LoginPage();
const welcome = new WelcomePage();

defineSupportCode(({Given, When, Then}) => {

  Given(/^the user is in the Login page$/, (done: any) => {
    browser.wait(function () {
      return page.getElementRequired().isPresent();
    }, 5000).then(function () {
      done();
    });
  });

  Given(/^the user set the username '([^']*)'$/, (userId: string, done: any) => {
    browser.wait(function () {
      return page.username.isPresent();
    }, 5000).then(function () {
      page.setUsername(userId).then(function () {
        done();
      });
    });
  });

  Given(/^the user set the password '([^']*)'$/, (password: string, done: any) => {
    browser.wait(function () {
      return page.password.isPresent();
    }, 5000).then(function () {
      page.setPassword(password).then(function () {
        done();
      });
    });
  });

  When(/^the user logs in the application$/, (done: any) => {
    browser.wait(function () {
      return page.loginButton.isPresent();
    }, 5000).then(function () {
      page.submit().then(function () {
        done();
      });
    });
  });

  Then(/^the user is redirected to the Welcome page$/, (done: any) => {
    browser.wait(function () {
      return welcome.getElementRequired().isPresent();
    }, 5000).then(function () {
      expect(welcome.title.getText()).to.be.eventually.equal('Welcome Guest!');
      done();
    });
  });
});
