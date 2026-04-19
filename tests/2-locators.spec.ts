import { test, expect} from '@playwright/test';

test('testing all selectors', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


  // getByRole locates an element based on ARIA roles and the accesible name
  await page.getByRole('heading', { name: 'Swag Labs'}).isVisible();

  // getByText locates an element based on its visible text content
  await page.getByText('Swag Labs').isVisible();

  // getByLabel locates an element based on its associated label text (aria-label or label element)
  await page.getByLabel('Swag Labs').isVisible();

  // getByTestId locates an element based on a custom data-testid attribute
  await page.getByTestId('heading').isVisible();

  // locates an element based on a CSS selector and text content
  await page.locator('div:has-text("Swag Labs")').nth(5).isVisible();

  // locates an element based on a CSS selector and text content
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5).isVisible();
  await expect(page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5)).toHaveText('Swag Labs');

  // locates an element based on a CSS selector and visible text content
  await page.locator('div').getByText('Swag Labs').isVisible();
  await expect(page.locator('div').getByText('Swag Labs')).toHaveText('Swag Labs');

  // locates an element based on a CSS selector and ARIA role with accessible name
  await page.locator('div').getByRole('heading', { name: 'Swag Labs'}).isVisible();
});