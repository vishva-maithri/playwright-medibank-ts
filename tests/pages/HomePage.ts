import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly homeContainer: Locator;
  readonly userCount: Locator;
  readonly loadUsersButton: Locator;

  constructor(page: Page) {
    super(page);
    this.homeContainer = page.getByTestId('home-container');
    this.userCount = page.getByTestId('user-count');
    this.loadUsersButton = page.getByTestId('load-users-btn');
  }

  async goto() {
    await this.page.goto('/home');
  }

  async waitForPageLoad() {
    await this.homeContainer.waitFor();
  }

  async loadUsers() {
    await this.loadUsersButton.click();
    await expect(this.loadUsersButton).not.toHaveText('Loading...');
  }

  async getUserCount(): Promise<number> {
    const text = await this.userCount.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}