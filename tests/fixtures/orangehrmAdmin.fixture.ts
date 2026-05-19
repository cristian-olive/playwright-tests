import {test as base, expect } from './orangehrmLogin.fixture';
import { OrangeHRMAdminPage } from '../../pages/6-orangehrm-rbac/admin.page';


type AdminFixture = {
    orangeHRMAdminPage: OrangeHRMAdminPage;
}

export const test = base.extend<AdminFixture>({
    orangeHRMAdminPage: async ({ orangeHRMLoginPage }, use) => {
        const orangeHRMAdminPage = new OrangeHRMAdminPage(orangeHRMLoginPage.page);
        await orangeHRMAdminPage.adminTab.click();
        await orangeHRMAdminPage.addUser('Admin', 'Enabled', 'johndoe', 'Password123');
        await expect(orangeHRMAdminPage.userCreationNotificationSuccess).toBeVisible();
        await use(orangeHRMAdminPage);
        await orangeHRMAdminPage.deleteUser('johndoe');
    }
});

export {expect};