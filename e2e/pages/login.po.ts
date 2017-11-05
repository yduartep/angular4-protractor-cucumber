import {browser, by, element} from 'protractor';
import {CommonPage} from './commo.po';

export class LoginPage extends CommonPage {

  readonly title = element(by.className('title'));
  readonly username = element(by.id('username'));
  readonly password = element(by.id('password'));
  readonly loginButton = element(by.id('btnLogin'));
  readonly logoutLink = element(by.id('linkLogout'));
  readonly pathUrl = '/#/login';

  getElementRequired() {
    return element(by.id('loginContent'));
  }

  /**
   * Log in into the application
   * @param {string} username the username
   * @param {string} password the password
   * @param done the callback function
   * @returns {Promise<any[]>}
   */
  login(username: string = 'guest', password: string = 'guest123', done: any) {
    const usernameValue = this.setUsername(username);
    const passwordValue = this.setPassword(password);
    const promises = [usernameValue, passwordValue];
    return Promise.all(promises).then(result => {
      return this.submit().then(() => {
        done();
      });
    });
  }

  /**
   * Set the username in the field
   * @param {string} value the value
   * @returns {any} the promise
   */
  setUsername(value: string) {
    return this.username.sendKeys(value);
  }

  /**
   * Set the password in the field
   * @param {string} value the value
   * @returns {any} the promise
   */
  setPassword(value: string) {
    return this.password.sendKeys(value);
  }

  /**
   * Login action when submit
   * @returns {any} the promise
   */
  submit() {
    return this.loginButton.click();
  }

  /**
   * Logout action
   * @returns {any} the promise
   */
  logout() {
    return this.logoutLink.click();
  }

  /**
   * Go to the login page
   * @returns {wdpromise.Promise<any>} the promise
   */
  navigateTo() {
    return browser.get('http://localhost:4200/' + this.pathUrl);
  }
}
