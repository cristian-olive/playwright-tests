import { Page } from '@playwright/test';

export class OrangeHRMLoginPage {
    constructor(readonly page: Page) {}

    readonly usernameInput = this.page.locator('input[name="username"]');
    readonly passwordInput = this.page.locator('input[name="password"]');
    readonly loginButton = this.page.locator('button[type="submit"]');
    readonly dashboardLink = this.page.getByRole('link', { name: 'Dashboard' });
    readonly logoutModal = this.page.locator('.oxd-userdropdown-tab');
    readonly logoutButton = this.page.getByRole('menuitem', { name: 'Logout' });

    async goto(url: string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.logoutModal.click();
        await this.logoutButton.click();
    }
}