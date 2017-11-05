import {browser} from 'protractor';

export abstract class CommonPage {
  /**
   * Gets the elements should be displayed to guarantee the page was correctly loaded
   */
  abstract getElementRequired();

  setValue(element, value) {
    const action = browser.actions().mouseMove(element).click().sendKeys(value);
    return action.perform();
  }
}
