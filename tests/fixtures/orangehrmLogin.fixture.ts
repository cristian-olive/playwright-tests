import  { env } from '../../src/config/env';
import {test as base, expect} from '@playwright/test';

type AuthFixtures = {
    envOrangeHRM: {
        url: string;
        user: string;
        password: string;
    }
}

export const test = base.extend<AuthFixtures>({
    envOrangeHRM: async ({}, use) => {
        await use({
            url: env.baseUrl,
            user: env.admin.user,
            password: env.admin.password
        });
    }
});

export {expect};
