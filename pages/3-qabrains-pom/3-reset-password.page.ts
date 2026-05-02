export class ResetPasswordPage{
    constructor(private page:Page) {}

    readonly mailInput = this.page.getByRole('textbox', { name: 'Email*' });
    readonly resetButton = this.page.getByRole('button', { name: 'Reset Password' });
    readonly resetPasswordButton = this.page.getByText('Forgot Password');

    async goto() {
        await this.page.goto('https://practice.qabrains.com/');
        await this.resetPasswordButton.click()
    }

    async resetPassword(email: string) {
        await this.resetButton.waitFor();
        await this.mailInput.fill(email);
        await this.resetButton.click();
    }
}
