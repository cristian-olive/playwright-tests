export class RegisterPage {

    constructor (private page: Page) {}

    readonly nameInput = this.page.getByRole('textbox', { name: 'Name*' });
    readonly countrySelect = this.page.getByRole('combobox', { name: 'Select Country*' });
    readonly accountTypeSelect = this.page.getByRole('combobox', {name: 'Account Type*'});
    readonly mailInput = this.page.getByRole('textbox', {name: 'Email*'});
    readonly passwordInput = this.page.getByRole('textbox', { name: 'Password*', exact: true });
    readonly confirmPasswordInput = this.page.getByRole('textbox', { name: 'Confirm Password*' })
    readonly signupButton = this.page.getByRole('button', { name: 'Signup' });
    readonly signupButtonPage = this.page.getByText('Registration')

    async goto() {
        await this.page.goto('https://practice.qabrains.com/');
        await this.signupButtonPage.click();
    }

    async register(name: string, mail: string, password: string) {
        await this.nameInput.fill(name);
        await this.countrySelect.selectOption('Colombia');
        await this.accountTypeSelect.selectOption('Engineer');
        await this.mailInput.fill(mail);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.signupButton.click();
    }
}