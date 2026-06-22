import {test as base, expect } from './orangehrmLogin.fixture';
import { OrangeHRMAdminPage } from '../../pages/6-orangehrm-rbac/admin.page';
import { env } from '../../src/config/env';


type AdminFixture = {
    orangeHRMUserManager: OrangeHRMAdminPage;
}

export const test = base.extend<AdminFixture>({
    orangeHRMUserManager: async ({ orangeHRMLoginPage }, use) => {
        const orangeHRMUserManager = new OrangeHRMAdminPage(orangeHRMLoginPage.page);
        await orangeHRMLoginPage.login(env.admin.user, env.admin.password);
        await orangeHRMUserManager.adminTab.click();
        
        // Setup: Create all test users
        const createdUsernames: string[] = [];
        for (const testUser of env.testUsers) {
            await orangeHRMUserManager.addUser(
                testUser.role,
                testUser.status,
                testUser.username,
                testUser.password
            );
            await expect(orangeHRMUserManager.userCreationNotificationSuccess).toBeVisible();
            createdUsernames.push(testUser.username);
        }
        await orangeHRMLoginPage.logout();
        await use(orangeHRMUserManager);
        // Teardown: Delete all created test users
        await orangeHRMLoginPage.login(env.admin.user, env.admin.password);
        for (const username of createdUsernames) {
            await orangeHRMUserManager.deleteUser(username);
        }
        await orangeHRMLoginPage.logout();
    }
});

export {expect};