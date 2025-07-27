import { test, expect } from '@playwright/test';
import { ApiHelper, User } from '../utils/ApiHelper';
import { TestDataManager } from '../data/TestDataManager';

test.describe('Users API Tests', () => {
  let apiHelper: ApiHelper;
  let testData: TestDataManager;

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
    testData = TestDataManager.getInstance();
  });

  test('should get all users', async () => {
    const users = await apiHelper.getUsers();
    
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
    
    // Verify user structure
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('username');
  });

  test('should get user by id', async () => {
    const user = await apiHelper.getUserById(1);
    
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('username');
  });

  test('should create a new user', async () => {
    const newUser = testData.getTestData().users.validUser;
    const createdUser = await apiHelper.createUser(newUser);
    
    expect(createdUser).toHaveProperty('id');
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.username).toBe(newUser.username);
  });

  test('should update user', async () => {
    const updateData = { name: 'Updated Name' };
    const updatedUser = await apiHelper.updateUser(1, updateData);
    
    expect(updatedUser.name).toBe(updateData.name);
    expect(updatedUser).toHaveProperty('id', 1);
  });

  test('should delete user', async () => {
    await apiHelper.deleteUser(1);
    // Note: JSONPlaceholder doesn't actually delete, but returns 200
  });

  test('should handle invalid user creation', async ({ request }) => {
    const invalidUser = testData.getTestData().users.invalidUser;
    
    const response = await request.post(`${testData.getApiUrl()}/users`, {
      data: invalidUser
    });
    
    // JSONPlaceholder will still create the user, but in a real API this might fail
    // Adjust expectations based on your actual API behavior
    expect(response.status()).toBe(201);
  });
});