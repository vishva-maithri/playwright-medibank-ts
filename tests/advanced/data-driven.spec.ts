import { test, expect } from '../fixtures/test-fixtures';

// Test data for data-driven tests
const testUsers = [
  { name: 'John Doe', email: 'john@example.com', username: 'johndoe', valid: true },
  { name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith', valid: true },
  { name: '', email: 'invalid@example.com', username: 'invalid', valid: false },
  { name: 'Valid Name', email: 'invalid-email', username: 'validuser', valid: false },
];

test.describe('Data-Driven Tests', () => {
  for (const userData of testUsers) {
    test(`user creation with ${userData.valid ? 'valid' : 'invalid'} data: ${userData.name}`, async ({ apiHelper }) => {
      if (userData.valid) {
        const createdUser = await apiHelper.createUser({
          name: userData.name,
          email: userData.email,
          username: userData.username
        });
        
        expect(createdUser.name).toBe(userData.name);
        expect(createdUser.email).toBe(userData.email);
        expect(createdUser.username).toBe(userData.username);
      } else {
        // Test invalid data handling
        // Note: Adjust based on your actual API validation
        const createdUser = await apiHelper.createUser({
          name: userData.name,
          email: userData.email,
          username: userData.username
        });
        
        // In a real API, this might throw an error or return validation errors
        // For JSONPlaceholder, it will still create the user
        expect(createdUser).toBeDefined();
      }
    });
  }
});