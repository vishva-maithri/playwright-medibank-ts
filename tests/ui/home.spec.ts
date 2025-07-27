import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TestDataManager } from '../data/TestDataManager';

test.describe('Home Page Tests', () => {
  let homePage: HomePage;
  let testData: TestDataManager;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testData = TestDataManager.getInstance();
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('should display home page correctly', async () => {
    await expect(homePage.homeContainer).toBeVisible();
    await expect(homePage.page.locator('h2')).toHaveText('Welcome to Home Page');
  });

  test('should load users and display count', async () => {
    await homePage.loadUsers();
    const userCount = await homePage.getUserCount();
    const expectedCount = testData.getTestData().ui.expectedUserCount;
    
    expect(userCount).toBeGreaterThan(0);
    // For development, we expect 10 users from JSONPlaceholder
    if (testData.getEnvironment() === 'development') {
      expect(userCount).toBe(10);
    }
  });

  test('should handle loading state correctly', async () => {
    // Click load users button
    await homePage.loadUsersButton.click();
    
    // Check if loading state appears (might be quick for local API)
    const loadingButton = homePage.page.getByText('Loading...');
    
    // Wait for loading to complete
    await expect(homePage.loadUsersButton).not.toHaveText('Loading...');
    await expect(homePage.loadUsersButton).toHaveText('Load Users');
  });

  test('should navigate between pages', async () => {
    await homePage.navigateToUsers();
    await expect(homePage.page).toHaveURL(/.*\/users/);

    await homePage.navigateToAbout();
    await expect(homePage.page).toHaveURL(/.*\/about/);

    await homePage.navigateToHome();
    await expect(homePage.page).toHaveURL(/.*\/home/);
  });
});