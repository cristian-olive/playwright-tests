import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practice.qabrains.com/');
  await page.getByRole('textbox', { name: 'Email*' }).click();
  await page.getByRole('textbox', { name: 'Email*' }).fill('qa_testers@qabrains.com');
  await page.getByRole('textbox', { name: 'Password*' }).click();
  await page.getByRole('textbox', { name: 'Password*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password*' }).fill('P');
  await page.getByRole('textbox', { name: 'Password*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password*' }).fill('Password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Login Successful$/ }).nth(1).click();
});