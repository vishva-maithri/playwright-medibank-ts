import { test, expect } from '../fixtures/test-fixtures';

test.describe('Performance Tests', () => {
  test('page load performance', async ({ page, homePage }) => {
    // Start performance measurement
    await page.goto('/home', { waitUntil: 'networkidle' });
    
    // Measure performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });

    // Assert performance thresholds
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000); // 2 seconds
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(1500); // 1.5 seconds
    
    console.log('Performance Metrics:', performanceMetrics);
  });

  test('API response time', async ({ apiHelper }) => {
    const startTime = Date.now();
    await apiHelper.getUsers();
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(5000); // 5 seconds max
    
    console.log(`API Response Time: ${responseTime}ms`);
  });
});