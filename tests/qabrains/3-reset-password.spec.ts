import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practice.qabrains.com/');
  await page.getByText('Forgot Password').click();
  await page.getByRole('textbox', { name: 'Email*' }).click();
  await page.getByRole('textbox', { name: 'Email*' }).fill('cristian.tester@mail.com');
  await page.getByRole('button', { name: 'Reset Password' }).click();
  await page.locator('div').filter({ hasText: /^Password is reset successfully\.$/ }).nth(1).click();
});