const {defineSupportCode} = require('cucumber');
import {browser, ExpectedConditions} from 'protractor';

// pages
import {LoginPage} from '../../pages/login.po';
import {WelcomePage} from '../../pages/welcome.po';

const page = new LoginPage();

defineSupportCode(({Given, When, Then, After, Before}) => {

  Before(function (testCase, callback) {
    page.navigateTo().then(() => {
      callback();
    });
  });

  After(function (testCase, callback) {
    browser.wait(() => ExpectedConditions.presenceOf(page.logoutLink), 3000, 'waiting').then(() => {
      page.logout().then(() => {
        callback();
      });
    });
  });

  Given(/^the user is in the Login page$/, (done: any) => {
    browser.wait(() => ExpectedConditions.presenceOf(page.getElementRequired()), 3000, 'waiting').then(() => {
      done();
    });
  });

  Given(/^the user set the username '([^']*)'$/, (userId: string) => {
    return page.setUsername(userId);
  });

  Given(/^the user set the password '([^']*)'$/, (password: string) => {
    return page.setPassword(password);
  });

  When(/^the user logs in the application$/, (done: any) => {
    browser.wait(ExpectedConditions.presenceOf(page.loginButton), 3000, 'waiting').then(() => {
      page.submit().then(() => {
        done();
      });
    });
  });

  Then(/^the user is redirected to the '([^']*)' page$/, (pageId: string, done: any) => {
    if (pageId === 'Welcome') {
      const welcomePage = new WelcomePage();
      browser.wait(ExpectedConditions.presenceOf(welcomePage.getElementRequired()), 3000, 'waiting').then(() => {
        done();
      });
    } else {
      done();
    }
  });
});
