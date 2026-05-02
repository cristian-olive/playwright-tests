import { test, expect } from '@playwright/test';
import {RegisterPage} from '../../pages/3-qabrains-pom/3-register.page'

test('register test', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register('Cristian', 'cristian@example.com', 'password123');
    await expect(
        page.locator('span').filter({ hasText: 'Registration Successful' })
    ).toBeVisible();
});