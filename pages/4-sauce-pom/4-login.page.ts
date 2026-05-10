import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    readonly emailInput = this.page.locator('[data-test="username"]');
    readonly passwordInput = this.page.locator('[data-test="password"]');
    readonly loginButton = this.page.locator('[data-test="login-button"]');

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async Login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}