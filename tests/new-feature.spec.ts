import { test, expect } from './fixtures/test-fixtures';

test('new feature test', async ({ homePage, apiHelper, testData }) => {
  await homePage.goto();
  const users = await apiHelper.getUsers();
  expect(users.length).toBe(testData.getTestData().ui.expectedUserCount);
});

test('API endpoint test', async ({ apiHelper }) => {
  const user = await apiHelper.createUser({
    name: 'Test User',
    email: 'test@example.com',
    username: 'testuser'
  });
  
  expect(user.id).toBeDefined();
  expect(user.name).toBe('Test User');
});