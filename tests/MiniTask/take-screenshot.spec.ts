import { test } from '@playwright/test';

test.describe('Screenshot Capture Test', () => {

  test('Capture homepage screenshot', async ({ page }) => {
    // Go to Example.com
    await page.goto('https://example.com');

    // Take full-page screenshot
    await page.screenshot({ path: 'example-homepage.png', fullPage: true });

    // Log a message (not an assertion)
    console.log('Screenshot saved as example-homepage.png');
  });

});
