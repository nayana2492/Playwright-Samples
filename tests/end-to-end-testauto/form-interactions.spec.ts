import { expect, test } from '@playwright/test';
import { testData } from '../../data/testData'; // Changed from '../data/testData'
import { MainPage } from '../../pages/MainPage'; // Changed from '../pages/MainPage'
import { TestHelpers } from '../../utils/helpers'; // Changed from '../utils/helpers'

test.describe('Form Interactions', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToHome();
  });

  test('Fill and submit contact form', async () => {
    const userData = {
      ...testData.users[0],
      email: TestHelpers.generateRandomEmail(),
      phone: TestHelpers.generateRandomPhone(),
    };

    await mainPage.fillContactForm(userData);
    await mainPage.submitButton.click();

    // Verify form was submitted (you might need to adjust based on actual behavior)
    await expect(mainPage.nameInput).toHaveValue(userData.name);
  });

  test('Select multiple checkboxes', async () => {
    await mainPage.selectDaysOfWeek(['Monday', 'Wednesday', 'Friday']);
    
    await expect(mainPage.mondayCheckbox).toBeChecked();
    await expect(mainPage.wednesdayCheckbox).toBeChecked();
    await expect(mainPage.fridayCheckbox).toBeChecked();
    await expect(mainPage.tuesdayCheckbox).not.toBeChecked();
  });

  test('Work with dropdowns', async () => {
    await mainPage.selectCountry('India');
    await expect(mainPage.countryDropdown).toHaveValue('india');

    await mainPage.selectColors(['Red', 'Blue']);
    // Verify color selection (adjust selector based on actual implementation)
  });

  test('Date picker interactions', async () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    
    await mainPage.setDate(1, TestHelpers.formatDate(today, 'mm/dd/yyyy'));
    await mainPage.setDate(2, TestHelpers.formatDate(futureDate, 'dd/mm/yyyy'));
    
    await expect(mainPage.datePicker1).toHaveValue(TestHelpers.formatDate(today, 'mm/dd/yyyy'));
    await expect(mainPage.datePicker2).toHaveValue(TestHelpers.formatDate(futureDate, 'dd/mm/yyyy'));
  });
});
