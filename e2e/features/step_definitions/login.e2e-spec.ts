import {isNullOrUndefined} from "util";

const {defineSupportCode} = require('cucumber');
import {browser, by, element, ExpectedConditions} from 'protractor';
import {expect} from '../../config/helpers/chai-imports';

// pages
import {CommonPage} from '../../pages/common.po';
import {LoginPage} from '../../pages/login.po';
import {WelcomePage} from '../../pages/welcome.po';

const page = new LoginPage();
const welcome = new WelcomePage();

/**
 * Get page object from the page id written in the gherkin
 * @param pageId page id
 * @returns {any} the page object instance
 */
function getPageById(pageId) {
  if (isNullOrUndefined(pageId)) {
    return page;
  }
  switch (pageId) {
    case 'Login':
      return page;
    case 'Welcome':
      return welcome;
    default:
      return page;
  }
}

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

  Then(/^the user is redirected to the 'Welcome' page$/, (done: any) => {
    browser.wait(function () {
      return welcome.getElementRequired().isPresent();
    }, 5000).then(function () {
	  expect(welcome.title.getText()).to.be.eventually.equal('Welcome Guest!');
	  done();
    });
  });

  Then(/^a cookie with name '([^']*)' is created with the value '([^']*)'$/, (cookieId: string, cookieValue: string, done: any) => {
    browser.wait(function () {
      return welcome.getElementRequired().isPresent();
    }, 5000).then(function () {
      browser.manage().getCookie(cookieId).then(cookie => {
        expect(cookie.value).to.equals(cookieValue);
		done();
      });
    });
  });

  Then(/^a cookie with name '([^']*)' is present$/, (cookieId: string, done: any) => {
    browser.wait(function () {
      return welcome.getElementRequired().isPresent();
    }, 5000).then(function () {
      browser.manage().getCookie(cookieId).then(cookie => {
        expect(cookie.value).to.not.be.empty.notify(done);
      });
    });
  });
});
