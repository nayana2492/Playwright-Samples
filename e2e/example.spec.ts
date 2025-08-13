import { test, expect } from '@playwright/test';

test('has title and search on wikepedia', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Testing Practice/);
 
  // Type into the wikipedia search box
  await page.fill('#Wikipedia1_wikipedia-search-input', 'Playwright ');
 // Click the search button
   await page.click('.wikipedia-search-button');
 // Wait for results
    //await page.waitForSelector('Wikipedia1_wikipedia-search-results-header');
 // Check that results are shown
  //const results = await page.$$('#Wikipedia1_wikipedia-search-results');
  // Expect at least one result to be present 
 //expect(results.length).toBeGreaterThan(0);
 
 //fill the form
 await page.fill('#name', 'Nayana Menon');
 await page.fill('#email', 'nayanamenon24@gmail.com');
 await page.fill('#phone', '223806684');
 await page.fill('#textarea', '11 Lucina rise');
//select gender
const radioResult = page.locator('#male');
await page.locator('input[value="male"][name="gender"]').check();
//select days checkbox
const checkboxResult = page.locator('.checkbox');
//await expect(checkboxResult).toBeChecked('monday');
await page.locator('input[type="checkbox"][value="monday"]').check();
//select country from dropdown
const dropdownResult = page.locator('.country');
await dropdownResult.selectOption({ value: 'India' });
//select colour from list
await page.selectOption('#color', 'Red');
//select date from datepicker
await page.fill('#datepicker', '01/05/2025');
 });