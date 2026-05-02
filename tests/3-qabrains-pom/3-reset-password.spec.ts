import {test, expect} from '@playwright/test';
import {ResetPasswordPage} from '../../pages/3-qabrains-pom/3-reset-password.page';

test('reset password test', async ({page}) => {
    const resetPassword = new ResetPasswordPage(page);

    await resetPassword.goto();
    await resetPassword.resetPassword('cristian.test@mail.com');
    await expect(
        page.locator('div').filter({ hasText: /^Password is reset successfully\.$/ }).nth(1)
    ).toBeVisible();
});
