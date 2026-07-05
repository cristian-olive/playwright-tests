import { Page } from '@playwright/test';
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

export class Screenshot {
  static async take(page: Page, nombre: string) {
    await page.screenshot({
      path: `artifacts/screenshots/${timestamp}/${nombre}.png`,
      fullPage: true,
    });
  }
}
