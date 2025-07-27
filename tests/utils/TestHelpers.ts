import { Page, expect } from '@playwright/test';

export class TestHelpers {
  static async waitForNetworkIdle(page: Page, timeout = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async takeScreenshot(page: Page, name: string) {
    await page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  static async mockApiResponse(page: Page, endpoint: string, response: any) {
    await page.route(`**${endpoint}`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response)
      });
    });
  }

  static async mockApiError(page: Page, endpoint: string, status = 500) {
    await page.route(`**${endpoint}`, route => {
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Mocked API Error' })
      });
    });
  }

  static generateRandomEmail(): string {
    return `test-${Date.now()}@example.com`;
  }

  static generateRandomString(length = 8): string {
    return Math.random().toString(36).substring(2, length + 2);
  }
}