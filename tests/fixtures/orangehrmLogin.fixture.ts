import  { env } from '../../src/config/env';
import {test as base, expect} from '@playwright/test';
import { OrangeHRMLoginPage } from '../../pages/6-orangehrm-rbac/login.page';

type AuthFixture = {
    orangeHRMLoginPage: OrangeHRMLoginPage;
}

export const test = base.extend<AuthFixture>({
    orangeHRMLoginPage: async ({page}, use) => {
        const orangeHRMLoginPage = new OrangeHRMLoginPage(page);
        await orangeHRMLoginPage.goto(env.apiUrl);
        await orangeHRMLoginPage.login(env.admin.user, env.admin.password);
        await use(orangeHRMLoginPage);
        await orangeHRMLoginPage.logout();
    }
});

export {expect};
