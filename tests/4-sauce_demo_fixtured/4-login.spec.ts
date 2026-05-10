import {test, expect} from '../fixtures/saucedemoLogin.fixture';

test('login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.Login('standard_user', 'secret_sauce');
    await expect(
        loginPage.page.locator('[data-test="title"]')
    ).toBeVisible();
});