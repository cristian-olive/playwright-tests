import {test, expect} from '../fixtures/saucedemo.fixture';

test.beforeEach(async ({loginPage}) => {
    console.log('This will run before each test in this file');
    loginPage.goto();
});

test('login successfully', async ({ loginPage }) => {
    await loginPage.Login('standard_user', 'secret_sauce');
    await expect(
        loginPage.title
    ).toBeVisible();
});

test('login unsuccessfully', async ({loginPage}) => {
    await loginPage.Login('standard_user', 'wrong_password');
    await expect(
        loginPage.errorMessage
    ).toBeVisible();
    await expect(
        loginPage.errorMessage
    ).toHaveText('Epic sadface: Username and password do not match any user in this service');
});