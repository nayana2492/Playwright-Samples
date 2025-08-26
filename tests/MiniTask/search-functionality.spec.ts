import { test, expect } from '@playwright/test';

test.describe('Wikipedia Search Functionality', () => {

  test('Search for Playwright on Wikipedia', async ({ page }) => {
    // Navigate to Wikipedia
    await page.goto('https://www.wikipedia.org');

    // Fill the search box and submit
    await page.fill('input[name="search"]', 'Playwright');
    await page.press('input[name="search"]', 'Enter');

    // Assertion: Check that the search results page contains "Playwright"
    await expect(page.locator('#firstHeading')).toContainText('Playwright');
  });

});
