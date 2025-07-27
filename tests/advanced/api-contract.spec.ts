import { test, expect } from '../fixtures/test-fixtures';

// JSON Schema for API response validation
const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email', 'username'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    username: { type: 'string' },
    address: { type: 'object' },
    phone: { type: 'string' },
    website: { type: 'string' },
    company: { type: 'object' }
  }
};

test.describe('API Contract Tests', () => {
  test('users API response schema validation', async ({ apiHelper }) => {
    const users = await apiHelper.getUsers();
    
    // Validate that response is an array
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    
    // Validate each user object structure
    for (const user of users.slice(0, 3)) { // Test first 3 users
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('username');
      
      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.username).toBe('string');
      
      // Email format validation
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }
  });

  test('API error handling', async ({ request, testData }) => {
    const apiUrl = testData.getApiUrl();
    
    // Test 404 error
    const notFoundResponse = await request.get(`${apiUrl}/users/99999`);
    expect(notFoundResponse.status()).toBe(404);
    
    // Test malformed request
    const badResponse = await request.post(`${apiUrl}/users`, {
      data: 'invalid json'
    });
    expect(badResponse.status()).toBeGreaterThanOrEqual(400);
  });

  test('API response times within SLA', async ({ apiHelper }) => {
    const endpoints = [
      () => apiHelper.getUsers(),
      () => apiHelper.getUserById(1),
      () => apiHelper.getPosts()
    ];
    
    for (const endpoint of endpoints) {
      const startTime = Date.now();
      await endpoint();
      const responseTime = Date.now() - startTime;
      
      // API should respond within 3 seconds
      expect(responseTime).toBeLessThan(3000);
    }
  });
});