import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practice.qabrains.com/');
  await page.getByText('Drag and Drop List').click();
  const source = page.getByText('Drag Me');
  const target = page.getByText('Drop Here');

  await source.hover();
  await page.mouse.down();

  await target.hover();
  await page.mouse.up();
  await expect(page.getByRole('heading', { name: 'Dropped!' })).toBeVisible();
});