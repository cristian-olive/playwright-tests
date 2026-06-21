import {test as base, expect } from './orangehrmLogin.fixture';
import { OrangeHRMAdminPage } from '../../pages/6-orangehrm-rbac/admin.page';
import { env } from '../../src/config/env';


type AdminFixture = {
    userManagement: OrangeHRMAdminPage;
}

export const test = base.extend<AdminFixture>({
    userManagement: async ({ orangeHRMLoginPage }, use) => {
        const userManagement = new OrangeHRMAdminPage(orangeHRMLoginPage.page);
        await orangeHRMLoginPage.login(env.admin.user, env.admin.password);
        await userManagement.adminTab.click();
        
        // Setup: Create all test users
        const createdUsernames: string[] = [];
        for (const testUser of env.testUsers) {
            await userManagement.addUser(
                testUser.role,
                testUser.status,
                testUser.username,
                testUser.password
            );
            await expect(userManagement.userCreationNotificationSuccess).toBeVisible();
            createdUsernames.push(testUser.username);
        }
        await orangeHRMLoginPage.logout();
        await use(userManagement);
        // Teardown: Delete all created test users
        await orangeHRMLoginPage.login(env.admin.user, env.admin.password);
        for (const username of createdUsernames) {
            await userManagement.deleteUser(username);
        }
        await orangeHRMLoginPage.logout();
    }
});

export {expect};