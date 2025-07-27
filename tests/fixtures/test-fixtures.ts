import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ApiHelper } from '../utils/ApiHelper';
import { TestDataManager } from '../data/TestDataManager';

type TestFixtures = {
  homePage: HomePage;
  apiHelper: ApiHelper;
  testData: TestDataManager;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  apiHelper: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request);
    await use(apiHelper);
  },

  testData: async ({}, use) => {
    const testData = TestDataManager.getInstance();
    await use(testData);
  },
});

export { expect };