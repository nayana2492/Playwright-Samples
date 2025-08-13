import { test, expect } from '@playwright/test';

test('TestAutomationPractice has title', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveTitle(/Automation Testing Practice/);
});


