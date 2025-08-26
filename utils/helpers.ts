import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class TestHelpers {
  static async createTestFile(fileName: string, content: string = 'Test file content'): Promise<string> {
    const filePath = path.join(__dirname, '..', 'temp', fileName);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  static async cleanupTestFiles() {
    const tempDir = path.join(__dirname, '..', 'temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test${timestamp}@example.com`;
  }

  static generateRandomPhone(): string {
    return '+1' + Math.floor(Math.random() * 9000000000 + 1000000000);
  }

  static formatDate(date: Date, format: 'mm/dd/yyyy' | 'dd/mm/yyyy'): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return format === 'mm/dd/yyyy' ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
  }

  static async waitForNetworkIdle(page: Page, timeout: number = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }
}
