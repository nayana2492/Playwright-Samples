import { test, expect } from '@playwright/test';

test('TestAutomationPractice', async ({ page }) => {
  // Go to Automation Practice page
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Type into the wikipedia search box
  await page.fill('#Wikipedia1_wikipedia-search-input', 'Playwright testing');

  // Click the search button
  await page.click('.wikipedia-search-button');

  // Wait for results
  await page.waitForSelector('#links');

  // Check that results are shown
  const results = await page.$$('#Wikipedia1_wikipedia-search-results');
  expect(results.length).toBeGreaterThan(0);
});
