import { test, expect } from '@playwright/test';

test('Login on SauceDemo using auto-wait + waitForSelector', async ({ page }) => {
  
  // Navigate to the page
  await page.goto('https://www.saucedemo.com/');

  // Fill the form (AUTO-WAIT is applied automatically)
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  // Click login (AUTO-WAIT: visible, enabled, estable, etc.)
  await page.locator('#login-button').click();

  // Playwright automatically waits for the button to be interactable

  // Wait explicitly for the new page to load
  await page.waitForSelector('.inventory_list'); // 30 seconds by default

  // Best practice to Validate
  await expect(page.locator('.inventory_list')).toBeVisible(); // 5 seconds by default

});