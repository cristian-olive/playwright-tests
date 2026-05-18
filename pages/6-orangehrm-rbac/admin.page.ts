import  {Page} from '@playwright/test';

export class OrangeHRMAdminPage {
    constructor(private page: Page) {}

    readonly adminTab = this.page.getByRole('link', { name: 'Admin' })
    readonly addButton = this.page.getByRole('button', { name: ' Add' })
    readonly userRoleSelect = this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first();
    readonly userRoleOption = this.page.getByRole('listbox').getByText('Admin');
    readonly employeeNameInput = this.page.getByRole('textbox', { name: 'Type for hints...' });
    readonly usernameInput = this.page.getByRole('textbox').nth(2);
    readonly statusSelect = this.page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon');
    readonly statusOption = this.page.getByRole('option', { name: 'Enabled' });
    readonly passwordInput = this.page.getByRole('textbox').nth(3);
    readonly confirmPasswordInput = this.page.getByRole('textbox').nth(4);
    readonly saveButton = this.page.getByRole('button', { name: 'Save' });
    readonly loaderSearch = this.page.getByRole('option', { name: 'Searching....' });

    async goto() {
        await this.adminTab.click();
    }

    async addUser(employeeName: string, username: string, password: string) {
        await this.addButton.click();
        await this.userRoleSelect.click();
        await this.userRoleOption.click();
        await this.usernameInput.fill(username);
        await this.searchUser();
        await this.statusSelect.click();
        await this.statusOption.click();
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.saveButton.click();
    }

    async searchUser() {
        await this.employeeNameInput.fill('a');
        const tempUserName = await this.page.locator('.oxd-userdropdown-name').textContent()
        console.log(tempUserName);
        const options = this.page.getByRole('option');
        const optionCount = await options.count();

        await this.loaderSearch.waitFor({ state: 'hidden' });

        for (let i = 0; i < optionCount; i++) {
            const optionText = await options.nth(i).textContent();
            console.log(optionText);
            if (optionText !== tempUserName && optionText !== 'Searching....') {
                await options.nth(i).click();
                break;
            }
        }
    }
}