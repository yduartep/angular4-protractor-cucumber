import {browser, by, element} from 'protractor';

export class WelcomePage {
  readonly title = element(by.className('title'));

  getElementRequired() {
    return element(by.id('welcomeContent'));
  }
}
