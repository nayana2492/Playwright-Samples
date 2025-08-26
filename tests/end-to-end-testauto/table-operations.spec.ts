import { expect, test } from '@playwright/test';
import { MainPage } from '../../pages/MainPage'; // Changed from '../pages/MainPage'

test.describe('Table Operations', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToHome();
  });

  test('Read table data', async () => {
    const tableData = await mainPage.getTableData();
    expect(tableData.length).toBeGreaterThan(0);
    
    // Verify expected books exist
    const bookTitles = tableData.map(row => row[0]);
    expect(bookTitles).toContain('Learn Selenium');
    expect(bookTitles).toContain('Learn Java');
  });

  test('Select table rows', async () => {
    await mainPage.selectTableRowByText('Learn Selenium');
    await mainPage.selectTableRowByText('Master In Java');
    
    // Verify selections were made
    const selectedRows = await mainPage.dataTable.locator('input[type="checkbox"]:checked').count();
    expect(selectedRows).toBe(2);
  });

  test('Filter and validate table content', async () => {
    const tableData = await mainPage.getTableData();
    
    // Find Selenium books
    const seleniumBooks = tableData.filter(row => row[2]?.toLowerCase().includes('selenium'));
    expect(seleniumBooks.length).toBeGreaterThan(0);
    
    // Verify price format
    for (const row of tableData) {
      if (row[3]) { // Price column
        expect(row[3]).toMatch(/^\d+$/); // Should be numeric
      }
    }
  });
});