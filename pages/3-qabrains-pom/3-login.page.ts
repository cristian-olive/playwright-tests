export class LoginPage {
    
    constructor(private page: Page) {}

    readonly emailInput = this.page.getByRole('textbox', { name: 'Email*' });
    readonly passwordInput = this.page.getByRole('textbox', { name: 'Password*' });
    readonly loginButton = this.page.getByRole('button', { name: 'Login' });

    async goto() {
        await this.page.goto('https://practice.qabrains.com/');
    }

    async login(email: string, password:string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
