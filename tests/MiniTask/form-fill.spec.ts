import { test, expect } from '@playwright/test';

test.describe('DemoQA Form Fill Test', () => {

  test('Fill out the text box form and verify submission', async ({ page }) => {
    // Navigate to the form page
    await page.goto('https://demoqa.com/text-box');

    // Fill in the form fields
    await page.fill('#userName', 'Nayana Menon');
    await page.fill('#userEmail', 'nayana@example.com');
    await page.fill('#currentAddress', '123 QA Street, Auckland, NZ');
    await page.fill('#permanentAddress', '456 Automation Lane, Wellington, NZ');

    // Click the submit button
    await page.click('#submit');

    // Assertions: Verify that the output section contains the submitted values
    await expect(page.locator('#name')).toContainText('Nayana Menon');
    await expect(page.locator('#email')).toContainText('nayana@example.com');
    await expect(page.locator('p#currentAddress')).toContainText('123 QA Street, Auckland, NZ');
    await expect(page.locator('p#permanentAddress')).toContainText('456 Automation Lane, Wellington, NZ');
  });

});
