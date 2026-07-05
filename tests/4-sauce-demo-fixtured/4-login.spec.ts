import {test, expect} from '../fixtures/saucedemo.fixture';

test('login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.Login('standard_user', 'secret_sauce');
    await expect(
        loginPage.title
    ).toBeVisible();
});