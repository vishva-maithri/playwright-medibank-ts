import { test, expect } from '../fixtures/test-fixtures';
import { TestHelpers } from '../utils/TestHelpers';

test.describe('Visual Regression Tests', () => {
  test('home page visual comparison', async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Wait for all content to load
    await TestHelpers.waitForNetworkIdle(page);
    
    // Take screenshot and compare
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      threshold: 0.2, // Allow 20% difference
    });
  });

  test('responsive design test', async ({ page, homePage }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop-large' },
      { width: 1366, height: 768, name: 'desktop-medium' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await homePage.goto();
      await homePage.waitForPageLoad();
      
      await expect(page).toHaveScreenshot(`home-page-${viewport.name}.png`, {
        fullPage: false,
        threshold: 0.3,
      });
    }
  });
});