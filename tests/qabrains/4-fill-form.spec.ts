import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practice.qabrains.com/');
  await page.getByText('Form Submission').click();
  await page.getByRole('textbox', { name: 'Name*' }).click();
  await page.getByRole('textbox', { name: 'Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Name*' }).fill('C');
  await page.getByRole('textbox', { name: 'Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Name*' }).fill('Cristian ');
  await page.getByRole('textbox', { name: 'Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Name*' }).fill('Cristian T');
  await page.getByRole('textbox', { name: 'Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Name*' }).fill('Cristian Tester');
  await page.getByRole('textbox', { name: 'Email*' }).click();
  await page.getByRole('textbox', { name: 'Email*' }).fill('cristian.tester@mail.com');
  await page.getByRole('textbox', { name: 'Contact Number*' }).click();
  await page.getByRole('textbox', { name: 'Contact Number*' }).fill('12121212121');
  await page.getByRole('textbox', { name: 'Date' }).fill('2026-08-06');
  await page.getByRole('button', { name: 'Upload File*' }).setInputFiles('./fixtures/files/test.txt');
  await page.getByRole('radio', { name: 'Blue' }).check();
  await page.getByRole('checkbox', { name: 'Burger' }).check();
  await page.getByLabel('Select Country*').selectOption('Colombia');
  await page.locator('form').getByRole('button', { name: 'Submit' }).click();
  await page.locator('div').filter({ hasText: /^Form submit successfully\.$/ }).nth(1).click();
});