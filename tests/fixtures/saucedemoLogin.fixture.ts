import  {LoginPage } from '../../pages/4-sauce-pom/4-login.page';
import {test as base, expect} from '@playwright/test';

type MyFixtures = {
    loginPage: LoginPage;
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    }
});

export {expect};