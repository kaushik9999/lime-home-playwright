import test from "../baseLib/BaseTest";
import { expect } from "@playwright/test"
import ENV from "../utils/env";

test.describe('Shopping Cart Tests', () => {

    test.beforeEach(async ({ homePage, searchPage, productPage, shoppingCartPage,loginPage }) => {
        await homePage.goToWebsite(ENV.BASE_URL);
        const product = "Blouse";
        await searchPage.searchProduct(product);
        await productPage.clickOnFirstProduct(product);
        await productPage.selectSize('L');
        await productPage.clickAddToCart();
        await productPage.closeAddToCartSuccessAlert();
        await shoppingCartPage.cartIcon.hover();
        await shoppingCartPage.clickOnCheckoutButton();
    });

    test.afterEach(async ({ page }) => {
        page.close();
    });

    test('User should be able to check-out successfully', async ({ shoppingCartPage ,loginPage}) => {
        await shoppingCartPage.clickOnCheckoutOnSummaryPage();
        await loginPage.login();
        await shoppingCartPage.enterAMessageDuringCheckOut("Leave it at the door");
        await shoppingCartPage.clickOnCheckoutOnAddressPage();
        await shoppingCartPage.agreeToTermsAndConditions();
        await shoppingCartPage.clickOnCheckoutOnAddressPage();
        await shoppingCartPage.clickPayByCheck();
        await shoppingCartPage.clickConfirmOrder();
        await test.step('Assert order complete success message', async () => {
            expect(await shoppingCartPage.generalAlert.textContent()).toContain('Your order on My Shop is complete.')
        });
    })
    test('User should not be able to check-out with out accepting the terms and conditions', async ({shoppingCartPage , loginPage}) => {
        await shoppingCartPage.clickOnCheckoutOnSummaryPage();
        await loginPage.login();
        await shoppingCartPage.enterAMessageDuringCheckOut("Leave it at the door");
        await shoppingCartPage.clickOnCheckoutOnAddressPage();
        await shoppingCartPage.clickOnCheckoutOnAddressPage();
        await test.step('Assert the alert indicating to agree to the terms and conditions', async () => {
            expect(await shoppingCartPage.errorAlert.textContent()).toContain('You must agree to the terms of service before continuing.')
        });
    })

})