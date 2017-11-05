import {browser, by, element} from 'protractor';
import {CommonPage} from './commo.po';

export class WelcomePage extends CommonPage {
  readonly title = element(by.className('title'));

  getElementRequired() {
    return element(by.id('welcomeContent'));
  }
}
