import {browser, by, element} from 'protractor';

export class LoginPage {

  readonly title = element(by.className('title'));
  readonly username = element(by.id('username'));
  readonly password = element(by.id('password'));
  readonly loginButton = element(by.id('btnLogin'));
  readonly logoutLink = element(by.id('linkLogout'));
  readonly pathUrl = '/#/login';

  getElementRequired() {
    return element(by.id('loginContent'));
  }

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

  setUsername(value: string) {
    return this.username.sendKeys(value);
  }

  setPassword(value: string) {
    return this.password.sendKeys(value);
  }

  submit() {
    return this.loginButton.click();
  }

  logout() {
    return this.logoutLink.click();
  }

  navigateTo() {
    return browser.get('http://localhost:4200/' + this.pathUrl);
  }
}
