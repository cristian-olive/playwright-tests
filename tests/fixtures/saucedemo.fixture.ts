import  { LoginPage } from '../../pages/4-sauce-pom/4-login.page';
import { PurchasePage } from '../../pages/7-troubleshooting/7-purchase.page';
import {Screenshot} from '../../utils/screenshot';
import {test as base, expect} from '@playwright/test';

type MyFixtures = {
    loginPage: LoginPage;
    purchasePage: PurchasePage;
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },

    purchasePage: async ({page}, use) => {
        await use(new PurchasePage(page));
    }
});

export {expect};