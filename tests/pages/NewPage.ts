import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  readonly specificElement: Locator;

  constructor(page: Page) {
    super(page);
    this.specificElement = page.getByTestId('specific-element');
  }

  async performAction() {
    await this.specificElement.click();
  }
}