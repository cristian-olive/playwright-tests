import { Locator, Page } from '@playwright/test';

export class PurchasePage {

    constructor(private page: Page) {}

    readonly addBackpack = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    readonly addTShirt = this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    readonly shoppingCartButton = this.page.locator('[data-test="shopping-cart-link"]');
    readonly checkoutButton = this.page.locator('[data-test="checkout"]');
    readonly firstNameCheckoutInput = this.page.locator('[data-test="firstName"]');
    readonly lastNameCheckoutInput = this.page.locator('[data-test="lastName"]');
    readonly postalCodeCheckoutInput = this.page.locator('[data-test="postalCode"]');
    readonly continueCheckoutButton = this.page.locator('[data-test="continue"]');
    readonly finishCheckoutButton = this.page.locator('[data-test="BAD-LOCATOR"]');
    readonly successMessage = this.page.locator('[data-test="complete-header"]');

    async addShoppingItems(items: Array<Locator | string>) {
        for (const item of items) {
            const locator = typeof item === 'string' ? this.page.locator(item) : item;
            await locator.click();
        }
    }

    async goToShoppingCart() {
        await this.shoppingCartButton.click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameCheckoutInput.fill(firstName);
        await this.lastNameCheckoutInput.fill(lastName);
        await this.postalCodeCheckoutInput.fill(postalCode);
        await this.continueCheckoutButton.click();
    }

    async completePurchase () {
        await this.finishCheckoutButton.click();
    }
}
