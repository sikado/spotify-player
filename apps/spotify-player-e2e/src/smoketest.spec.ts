import { expect, test } from '@playwright/test';

test.describe('Smoke tests for spotify-player', () => {
  test('open the main page', async ({ page }) => {
    const response = await page.goto('/');

    // Test that the response did not fail
    expect(response.status()).toBeLessThan(400)

    // Take a screenshot
    await page.screenshot({ path: 'playwright/test-results/screenshot.jpg' })
  });
});
