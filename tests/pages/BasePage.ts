import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly homeLink: Locator;
  readonly usersLink: Locator;
  readonly aboutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.homeLink = page.getByTestId('home-link');
    this.usersLink = page.getByTestId('users-link');
    this.aboutLink = page.getByTestId('about-link');
  }

  async navigateToHome() {
    await this.homeLink.click();
  }

  async navigateToUsers() {
    await this.usersLink.click();
  }

  async navigateToAbout() {
    await this.aboutLink.click();
  }
}