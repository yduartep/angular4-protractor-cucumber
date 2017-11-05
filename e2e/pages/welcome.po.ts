import {browser, by, element} from 'protractor';
import {CommonPage} from './common.po';

export class WelcomePage extends CommonPage {
  readonly title = element(by.className('title'));

  getElementRequired() {
    return element(by.id('welcomeContent'));
  }
}
