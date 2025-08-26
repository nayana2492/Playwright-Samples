import { test, expect } from '@playwright/test';

test.describe('Login Tests - The Internet Herokuapp', () => {
  
  const baseURL = 'https://the-internet.herokuapp.com/login';

  test('Valid Login', async ({ page }) => {
    await page.goto(baseURL);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    // Assertion: Success message
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('Invalid Login', async ({ page }) => {
    await page.goto(baseURL);

    await page.fill('#username', 'invalidUser');
    await page.fill('#password', 'wrongPassword');
    await page.click('button[type="submit"]');

    // Assertion: Error message
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

});

