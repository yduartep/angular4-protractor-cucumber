const {defineSupportCode} = require('cucumber');
import {browser, ExpectedConditions} from 'protractor';
import {expect} from '../../config/helpers/chai-imports';

// pages
import {LoginPage} from '../../pages/login.po';
import {WelcomePage} from '../../pages/welcome.po';

const page = new LoginPage();

/**
 * Get page object from the page id written in the gherkin
 * @param pageId page id
 * @returns {any} the page object instance
 */
function getPageById(pageId) {
  switch (pageId) {
    case 'Login':
      return new LoginPage();
    case 'Welcome':
      return new WelcomePage();
    default:
      return new LoginPage();
  }
}

defineSupportCode(({Given, When, Then}) => {

  Given(/^the user is in the Login page$/, (done: any) => {
    browser.wait(() => ExpectedConditions.presenceOf(page.getElementRequired()), 3000, 'waiting').then(() => {
      done();
    });
  });

  Given(/^the user set the username '([^']*)'$/, (userId: string, done: any) => {
    page.setUsername(userId).then(() => {
      done();
    });
  });

  Given(/^the user set the password '([^']*)'$/, (password: string, done: any) => {
    page.setPassword(password).then(() => {
      done();
    });
  });

  When(/^the user logs in the application$/, (done: any) => {
    browser.ignoreSynchronization = false;
    browser.wait(ExpectedConditions.presenceOf(page.loginButton), 3000, 'waiting').then(() => {
      page.submit().then(() => {
        done();
      });
    });
  });

  Then(/^the user is redirected to the '([^']*)' page$/, (pageId: string, done: any) => {
    browser.ignoreSynchronization = false;
    browser.wait(ExpectedConditions.presenceOf(getPageById(pageId).getElementRequired()), 3000, 'waiting').then(() => {
      done();
    });
  });

  Then(/^a cookie with name '([^']*)' is created with the value '([^']*)'$/, (cookieId: string, cookieValue: string, done: any) => {
    browser.manage().getCookie(cookieId).then(cookie => {
      expect(cookie.value).to.equals(cookieValue);
      done();
    });
  });

  Then(/^a cookie with name '([^']*)' is present$/, (cookieId: string, done: any) => {
    browser.manage().getCookie(cookieId).then(cookie => {
      expect(cookie.value).to.not.be.empty.notify(done);
    });
  });
});
