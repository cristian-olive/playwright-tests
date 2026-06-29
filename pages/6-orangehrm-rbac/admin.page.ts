import  {expect, Page} from '@playwright/test';

export class OrangeHRMAdminPage {
    constructor(private page: Page) {}

    readonly adminTab = this.page.getByRole('link', { name: 'Admin' })
    readonly addButton = this.page.getByRole('button', { name: ' Add' })
    readonly userRoleSelect = this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first();
    readonly userRoleAdminOption = this.page.getByRole('listbox').getByText('Admin');
    readonly userRoleESSOption = this.page.getByRole('listbox').getByText('ESS');
    readonly employeeNameInput = this.page.getByRole('textbox', { name: 'Type for hints...' });
    readonly usernameInput = this.page.getByRole('textbox').nth(2);
    readonly statusSelect = this.page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon');
    readonly statusOptionEnabled = this.page.getByRole('option', { name: 'Enabled' });
    readonly passwordInput = this.page.getByRole('textbox').nth(3);
    readonly confirmPasswordInput = this.page.getByRole('textbox').nth(4);
    readonly saveButton = this.page.getByRole('button', { name: 'Save' });
    readonly loaderSearch = this.page.getByRole('option', { name: 'Searching....' });
    readonly statusOptionDisabled = this.page.getByRole('option', { name: 'Disabled' });
    readonly userCreationNotificationSuccess = this.page.getByText('SuccessSuccessfully Saved×');
    readonly usernameInputSearch = this.page.getByRole('textbox').nth(1);
    readonly searchUserButton = this.page.getByRole('button', { name: 'Search' });
    readonly checkboxSelectUser = this.page.locator('.oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon');
    readonly counterRecordElement = this.page.getByText('(1) Record Found');
    readonly deleteUsersButton = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3);
    readonly confirmDeleteButton = this.page.getByRole('button', { name: ' Yes, Delete' })
    readonly noRecordFoundElement = this.page.getByText('SuccessSuccessfully Deleted×');

    async goto() {
        await this.adminTab.click();
    }

    async addUser(role: string, status: string, username: string, password: string) {
        await this.addButton.click();
        await this.userRoleSelect.click();
        await this.selectRole(role);
        await this.statusSelect.click();
        await this.selectStatus(status);
        await this.searchUser();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.saveButton.click();
    }

    async searchUser() {
        await this.employeeNameInput.fill('a');
        const currentNameUser = await this.page.locator('.oxd-userdropdown-name').textContent()
        const options = this.page.getByRole('option');
        const optionCount = await options.count();

        await this.loaderSearch.waitFor({ state: 'hidden' });

        for (let i = 0; i < optionCount; i++) {
            const optionText = await options.nth(i).textContent();
            if (optionText !== currentNameUser && optionText !== 'Searching....') {
                await options.nth(i).click();
                break;
            }
        }
    }

    async selectRole(role: string) {
        try {
            if (role === 'Admin') {
                await this.userRoleAdminOption.click();
            } else if (role === 'ESS') {
                await this.userRoleESSOption.click();
            }
        } catch (error) {
            console.log('Role option not found, defaulting to Admin');
             await this.userRoleAdminOption.click();
        }
    }

        async selectStatus(status: string) {
        try {
            if (status === 'Enabled') {
                await this.statusOptionEnabled.click();
            } else if (status === 'Disabled') {
                await this.statusOptionDisabled.click();
            }
        } catch (error) {
            console.log('Status option not found, defaulting to Enabled');
             await this.statusOptionEnabled.click();
        }
    }

    async deleteUser(username: string) {
        await this.adminTab.click();
        await this.usernameInputSearch.fill(username);
        await this.searchUserButton.click();
        await this.counterRecordElement.waitFor({ state: 'visible', timeout: 10000 });
        await this.checkboxSelectUser.click();
        await this.deleteUsersButton.click();
        await this.confirmDeleteButton.click();
        await expect(this.noRecordFoundElement).toBeVisible();
    }
}