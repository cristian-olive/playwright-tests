import { test, expect} from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username'}).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password'}).fill('secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.getByRole('heading', { name: 'Swag Labs'}).isVisible();
});