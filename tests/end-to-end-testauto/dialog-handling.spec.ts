import { expect, test } from '@playwright/test';
import { MainPage } from '../../pages/MainPage'; // Changed from '../pages/MainPage'

test.describe('Dialog Handling', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToHome();
  });

  test('Handle alert dialog', async ({ page }) => {
    let alertMessage = '';
    
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    
    await mainPage.alertButton.click();
    expect(alertMessage).toBeTruthy();
  });

  test('Handle confirm dialog - accept', async ({ page }) => {
    let confirmMessage = '';
    
    page.on('dialog', async dialog => {
      confirmMessage = dialog.message();
      await dialog.accept();
    });
    
    await mainPage.confirmButton.click();
    expect(confirmMessage).toBeTruthy();
  });

  test('Handle confirm dialog - dismiss', async ({ page }) => {
    let confirmMessage = '';
    
    page.on('dialog', async dialog => {
      confirmMessage = dialog.message();
      await dialog.dismiss();
    });
    
    await mainPage.confirmButton.click();
    expect(confirmMessage).toBeTruthy();
  });

  test('Handle prompt dialog', async ({ page }) => {
    const inputText = 'Playwright Test';
    let promptMessage = '';
    
    page.on('dialog', async dialog => {
      promptMessage = dialog.message();
      await dialog.accept(inputText);
    });
    
    await mainPage.promptButton.click();
    expect(promptMessage).toBeTruthy();
  });
});
