import { expect, test } from '@playwright/test';
import { MainPage } from '../../pages/MainPage'; // Changed from '../pages/MainPage'
import { TestHelpers } from '../../utils/helpers'; // Changed from '../utils/helpers'

test.describe('File Upload', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToHome();
  });

  test.afterAll(async () => {
    await TestHelpers.cleanupTestFiles();
  });

  test('Upload text file', async () => {
    const filePath = await TestHelpers.createTestFile('test.txt', 'Sample test file content');
    
    await mainPage.uploadFile(filePath);
    
    // Verify file was selected (adjust based on actual behavior)
    const uploadedFileName = await mainPage.fileUpload.inputValue();
    expect(uploadedFileName).toContain('test.txt');
  });

  test('Upload image file', async () => {
    // Create a simple test image file (base64 encoded 1x1 pixel PNG)
    const imageContent = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64');
    const filePath = await TestHelpers.createTestFile('test.png');
    require('fs').writeFileSync(filePath, imageContent);
    
    await mainPage.uploadFile(filePath);
    
    const uploadedFileName = await mainPage.fileUpload.inputValue();
    expect(uploadedFileName).toContain('test.png');
  });
});
