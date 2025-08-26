import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  // Form Elements
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressTextarea: Locator;
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly submitButton: Locator;

  // Checkboxes
  readonly mondayCheckbox: Locator;
  readonly tuesdayCheckbox: Locator;
  readonly wednesdayCheckbox: Locator;
  readonly thursdayCheckbox: Locator;
  readonly fridayCheckbox: Locator;
  readonly saturdayCheckbox: Locator;
  readonly sundayCheckbox: Locator;

  // Dropdowns
  readonly countryDropdown: Locator;
  readonly colorDropdown: Locator;

  // Date Pickers
  readonly datePicker1: Locator;
  readonly datePicker2: Locator;

  // Table
  readonly dataTable: Locator;

  // File Upload
  readonly fileUpload: Locator;

  // Buttons
  readonly newBrowserWindowButton: Locator;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Form Elements
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.addressTextarea = page.locator('#textarea');
    this.maleRadio = page.locator('#male');
    this.femaleRadio = page.locator('#female');
    this.submitButton = page.locator('input[type="submit"]');

    // Checkboxes
    this.mondayCheckbox = page.locator('#monday');
    this.tuesdayCheckbox = page.locator('#tuesday');
    this.wednesdayCheckbox = page.locator('#wednesday');
    this.thursdayCheckbox = page.locator('#thursday');
    this.fridayCheckbox = page.locator('#friday');
    this.saturdayCheckbox = page.locator('#saturday');
    this.sundayCheckbox = page.locator('#sunday');

    // Dropdowns
    this.countryDropdown = page.locator('#country');
    this.colorDropdown = page.locator('#colors');

    // Date Pickers
    this.datePicker1 = page.locator('#datepicker');
    this.datePicker2 = page.locator('#datepicker2');

    // Table
    this.dataTable = page.locator('#productTable');

    // File Upload
    this.fileUpload = page.locator('#file');

    // Buttons
    this.newBrowserWindowButton = page.locator('button:has-text("New Browser Window")');
    this.alertButton = page.locator('button:has-text("Alert")');
    this.confirmButton = page.locator('button:has-text("Confirm Box")');
    this.promptButton = page.locator('button:has-text("Prompt")');
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    gender: 'male' | 'female';
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.addressTextarea.fill(data.address);
    
    if (data.gender === 'male') {
      await this.maleRadio.check();
    } else {
      await this.femaleRadio.check();
    }
  }

  async selectDaysOfWeek(days: string[]) {
    const dayCheckboxes = {
      'monday': this.mondayCheckbox,
      'tuesday': this.tuesdayCheckbox,
      'wednesday': this.wednesdayCheckbox,
      'thursday': this.thursdayCheckbox,
      'friday': this.fridayCheckbox,
      'saturday': this.saturdayCheckbox,
      'sunday': this.sundayCheckbox,
    };

    for (const day of days) {
      const checkbox = dayCheckboxes[day.toLowerCase()];
      if (checkbox) {
        await checkbox.check();
      }
    }
  }

  async selectCountry(country: string) {
    await this.countryDropdown.selectOption(country);
  }

  async selectColors(colors: string[]) {
    for (const color of colors) {
      await this.colorDropdown.selectOption(color);
    }
  }

  async setDate(datePickerNumber: 1 | 2, date: string) {
    const datePicker = datePickerNumber === 1 ? this.datePicker1 : this.datePicker2;
    await datePicker.fill(date);
  }

  async uploadFile(filePath: string) {
    await this.fileUpload.setInputFiles(filePath);
  }

  async getTableData() {
    const rows = await this.dataTable.locator('tr').count();
    const tableData: string[][] = [];
    
    for (let i = 1; i < rows; i++) { // Skip header row
      const row = this.dataTable.locator(`tr:nth-child(${i + 1})`);
      const cells = await row.locator('td').count();
      const rowData: string[] = [];
      
      for (let j = 0; j < cells; j++) {
        const cellText = await row.locator(`td:nth-child(${j + 1})`).textContent();
        rowData.push(cellText?.trim() || '');
      }
      
      tableData.push(rowData);
    }
    
    return tableData;
  }

  async selectTableRowByText(text: string) {
    const row = this.dataTable.locator(`tr:has-text("${text}")`);
    const checkbox = row.locator('input[type="checkbox"]');
    await checkbox.check();
  }

  async handleAlert() {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await this.alertButton.click();
  }

  async handleConfirm(accept: boolean = true) {
    this.page.on('dialog', async dialog => {
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    await this.confirmButton.click();
  }

  async handlePrompt(text: string) {
    this.page.on('dialog', async dialog => {
      await dialog.accept(text);
    });
    await this.promptButton.click();
  }

  async openNewWindow() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.newBrowserWindowButton.click()
    ]);
    return newPage;
  }
}
