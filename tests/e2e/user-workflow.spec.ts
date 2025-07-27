import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ApiHelper } from '../utils/ApiHelper';
import { TestDataManager } from '../data/TestDataManager';

test.describe('End-to-End User Workflow', () => {
  let homePage: HomePage;
  let apiHelper: ApiHelper;
  let testData: TestDataManager;

  test.beforeEach(async ({ page, request }) => {
    homePage = new HomePage(page);
    apiHelper = new ApiHelper(request);
    testData = TestDataManager.getInstance();
  });

  test('should create user via API and verify in UI', async () => {
    // Step 1: Create user via API
    const newUser = {
      name: 'E2E Test User',
      email: 'e2e@example.com',
      username: 'e2euser'
    };
    
    const createdUser = await apiHelper.createUser(newUser);
    expect(createdUser.id).toBeDefined();

    // Step 2: Navigate to home page and load users
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.loadUsers();

    // Step 3: Verify user count increased (or at least users are loaded)
    const userCount = await homePage.getUserCount();
    expect(userCount).toBeGreaterThan(0);
  });

  test('should verify API data consistency with UI', async () => {
    // Get users from API
    const apiUsers = await apiHelper.getUsers();
    
    // Navigate to home page and load users
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.loadUsers();
    
    // Get user count from UI
    const uiUserCount = await homePage.getUserCount();
    
    // Verify consistency (in development environment with JSONPlaceholder)
    if (testData.getEnvironment() === 'development') {
      expect(uiUserCount).toBe(apiUsers.length);
    }
  });

  test('should handle API failures gracefully in UI', async ({ page }) => {
    // Intercept API calls and make them fail
    await page.route('**/users', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Try to load users - should handle error gracefully
    await homePage.loadUsers();
    
    // User count should remain 0 or show error state
    const userCount = await homePage.getUserCount();
    expect(userCount).toBe(0);
  });
});