import { test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/3-qabrains-pom/3-login.page'

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('qa_testers@qabrains.com', 'Password123');
  await expect(
    page.locator('div').filter({ hasText: /^Login Successful$/ }).nth(1)
  ).toBeVisible();
});