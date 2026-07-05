import { test, expect } from '../fixtures/saucedemo.fixture';
import { Screenshot } from '../../utils/screenshot';

test('login', async ({ page, loginPage, purchasePage }) => {
    await loginPage.goto();
    await Screenshot.take(page, 'login-page');
    await loginPage.Login('standard_user', 'secret_sauce');
    await expect(
        loginPage.title
    ).toBeVisible();
    await Screenshot.take(page, 'login-success');

    await purchasePage.addShoppingItems([
        purchasePage.addBackpack,
        purchasePage.addTShirt
    ]);
    await Screenshot.take(page, 'items-added-to-cart');

    await purchasePage.goToShoppingCart();
    await Screenshot.take(page, 'shopping-cart');
    await purchasePage.goToCheckout();
    await purchasePage.fillCheckoutForm('John', 'Doe', '12345');
    await Screenshot.take(page, 'checkout-form-filled');
    await purchasePage.completePurchase();
});