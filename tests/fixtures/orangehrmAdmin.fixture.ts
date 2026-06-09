import {test as base, expect } from './orangehrmLogin.fixture';
import { OrangeHRMAdminPage } from '../../pages/6-orangehrm-rbac/admin.page';
import { env } from '../../src/config/env';


type AdminFixture = {
    orangeHRMAdminPage: OrangeHRMAdminPage;
}

export const test = base.extend<AdminFixture>({
    orangeHRMAdminPage: async ({ orangeHRMLoginPage }, use) => {
        const orangeHRMAdminPage = new OrangeHRMAdminPage(orangeHRMLoginPage.page);
        await orangeHRMAdminPage.adminTab.click();
        
        // Setup: Create all test users
        const createdUsernames: string[] = [];
        for (const testUser of env.testUsers) {
            await orangeHRMAdminPage.addUser(
                testUser.role,
                testUser.status,
                testUser.username,
                testUser.password
            );
            await expect(orangeHRMAdminPage.userCreationNotificationSuccess).toBeVisible();
            createdUsernames.push(testUser.username);
        }
        await orangeHRMLoginPage.logout();
        await use(orangeHRMAdminPage);
        // Teardown: Delete all created test users
        await orangeHRMLoginPage.login(env.admin.user, env.admin.password);
        for (const username of createdUsernames) {
            await orangeHRMAdminPage.deleteUser(username);
        }
    }
});

export {expect};