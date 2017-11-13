import {browser} from 'protractor';
import {expect} from '../../config/helpers/chai-imports';

// pages
import {LoginPage} from '../../pages/login.po';
import {WelcomePage} from '../../pages/welcome.po';

const page = new LoginPage();
const welcome = new WelcomePage();
const {defineSupportCode} = require('cucumber');

defineSupportCode(({Given, When, Then}) => {

  Given(/^the user is in the Login page$/, (done: any) => {
    browser.wait(page.getElementRequired().isPresent(), 5000).then(() => {
      done();
    });
  });

  Given(/^the user set the username '([^']*)'$/, (userId: string) => {
    return page.setUsername(userId);
  });

  Given(/^the user set the password '([^']*)'$/, (password: string) => {
    return page.setPassword(password);
  });

  When(/^the user logs in the application$/, () => {
    return page.submit();
  });

  Then(/^the user is redirected to the Welcome page$/, (done: any) => {
    browser.wait(welcome.getElementRequired().isPresent(), 5000).then(() => {
      expect(welcome.title.getText()).to.be.eventually.equal('Welcome Guest!');
      done();
    });
  });

  Then(/^a cookie with name '([^']*)' is created with the value '([^']*)'$/, (cookieId: string, cookieValue: string, done: any) => {
    browser.wait(welcome.getElementRequired().isPresent(), 5000).then(() => {
      browser.manage().getCookie(cookieId).then(cookie => {
        expect(cookie.name).to.equals(cookieId);
        expect(cookie.value).to.equals(cookieValue);
        done();
      });
    });
  });
});
