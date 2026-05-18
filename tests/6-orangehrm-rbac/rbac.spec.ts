import { test, expect } from '../fixtures/orangehrmLogin.fixture';

test('login successfully', async ({ page, envOrangeHRM }) => {
    await page.goto(envOrangeHRM.url);
});
