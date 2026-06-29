import {test as base, expect } from '@playwright/test';
import { OrangeHRMLoginPage } from '../../pages/6-orangehrm-rbac/login.page';
import { OrangeHRMAdminPage } from '../../pages/6-orangehrm-rbac/admin.page';
import { OrangeHRMESSPage } from '../../pages/6-orangehrm-rbac/ess.page';

type AdminFixture = {
    orangeHRMLoginPage: OrangeHRMLoginPage;
    orangeHRMAdminPage: OrangeHRMAdminPage;
    orangeHRMESSPage: OrangeHRMESSPage;
}

export const test = base.extend<AdminFixture>({
    orangeHRMLoginPage: async ({page}, use) => {
        const orangeHRMLoginPage = new OrangeHRMLoginPage(page);
        await use(orangeHRMLoginPage);
    },
    orangeHRMAdminPage: async ({ orangeHRMLoginPage }, use) => {
        const orangeHRMAdminPage = new OrangeHRMAdminPage(orangeHRMLoginPage.page);
        await use(orangeHRMAdminPage);
    },
    orangeHRMESSPage: async ({ orangeHRMLoginPage }, use) => {
        const orangeHRMESSPage = new OrangeHRMESSPage(orangeHRMLoginPage.page);
        await use(orangeHRMESSPage);
    }
});

export {expect};

