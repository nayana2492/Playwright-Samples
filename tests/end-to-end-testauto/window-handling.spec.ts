import { expect, test } from '@playwright/test';
import { MainPage } from '../../pages/MainPage'; // Changed from '../pages/MainPage'

test.describe('Window Handling', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToHome();
  });

  test('Handle new browser window', async ({ context }) => {
    const newPage = await mainPage.openNewWindow();
    
    // Verify new window opened
    expect(context.pages()).toHaveLength(2);
    
    // Wait for new page to load
    await newPage.waitForLoadState();
    
    // Verify we can interact with both windows
    expect(await newPage.title()).toBeTruthy();
    expect(await mainPage.page.title()).toBeTruthy();
    
    // Close new window
    await newPage.close();
    expect(context.pages()).toHaveLength(1);
  });
});