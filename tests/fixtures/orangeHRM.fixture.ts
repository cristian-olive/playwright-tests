import {test as base, expect } from '@playwright/test';
import { OrangeHRMAdminPage } from '../../pages/6-orangehrm-rbac/admin.page';
import { OrangeHRMLoginPage } from '../../pages/6-orangehrm-rbac/login.page';

type AdminFixture = {
    orangeHRMLoginPage: OrangeHRMLoginPage;
    orangeHRMAdminPage: OrangeHRMAdminPage;
}

export const test = base.extend<AdminFixture>({
    orangeHRMLoginPage: async ({page}, use) => {
        const orangeHRMLoginPage = new OrangeHRMLoginPage(page);
        await use(orangeHRMLoginPage);
    },
    orangeHRMAdminPage: async ({ orangeHRMLoginPage }, use) => {
        const orangeHRMAdminPage = new OrangeHRMAdminPage(orangeHRMLoginPage.page);
        await use(orangeHRMAdminPage);
    }
});

export {expect};

