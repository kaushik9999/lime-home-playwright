import test from "../baseLib/BaseTest";
import { expect } from "@playwright/test"
import ENV from "../utils/env";

test.describe('Shopping Cart Tests', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goToWebsite(ENV.BASE_URL);
    });

    test.afterEach(async ({ page }) => {
        page.close();
    });

    test('User can add a single product to the cart ', async ({ page, searchPage, productPage, shoppingCartPage }) => {
        const product = "Blouse";
        await searchPage.searchProduct(product);
        await productPage.clickOnFirstProduct(product);
        await productPage.selectSize('L');
        await productPage.clickAddToCart();
        await test.step('Assert success alert visibility on add to cart', async () => {
            expect(await productPage.addToCartSucessMsg.textContent()).toContain('Product successfully added to your shopping cart');
        });
        await productPage.closeAddToCartSuccessAlert();
        await test.step('Validate the product title in the cart', async () => {
            expect(await shoppingCartPage.itemNameInTheCart.textContent()).toContain(product);
        });
        await test.step('Validate product quantity in the cart', async () => {
            expect(await shoppingCartPage.cartQuantity.textContent()).toBe('1');
        });
    })
    test('User can add multiple quantities of the same product to the cart', async ({ page, searchPage, productPage, shoppingCartPage }) => {
        const product = "Blouse";
        await searchPage.searchProduct(product);
        await productPage.clickOnFirstProduct(product);
        await productPage.selectSize('L');
        await productPage.increaseQuantityBy(2);
        await productPage.clickAddToCart();
        await test.step('Assert success alert visibility on add to cart', async () => {
            expect(await productPage.addToCartSucessMsg.textContent()).toContain('Product successfully added to your shopping cart');
        });
        await productPage.closeAddToCartSuccessAlert();
        await test.step('Validate the product title in the cart', async () => {
            expect(await shoppingCartPage.itemNameInTheCart.textContent()).toContain(product);
        });
        await test.step('Validate product quantity in the cart', async () => {
            expect(await shoppingCartPage.cartQuantity.textContent()).toBe('3');
        });

    })
    test('User can add multiple different products to the cart', async ({ page, searchPage, productPage, shoppingCartPage }) => {
        const product1 = "Blouse";
        const product2 = "Printed Dress"
        await searchPage.searchProduct(product1);
        await productPage.clickOnFirstProduct(product1);
        await productPage.selectSize('L');
        await productPage.increaseQuantityBy(2);
        await productPage.clickAddToCart();
        await productPage.closeAddToCartSuccessAlert();
        await searchPage.searchProduct(product2);
        await productPage.clickOnFirstProduct(product2);
        await productPage.selectSize('L');
        await productPage.increaseQuantityBy(2);
        await productPage.clickAddToCart();
        await productPage.closeAddToCartSuccessAlert();
        await test.step('Validate the first product title in the cart', async () => {
            expect(await shoppingCartPage.itemNameInTheCart.nth(0).textContent()).toContain(product1);
        });
        await test.step('Validate the second product title in the cart', async () => {
            expect(await shoppingCartPage.itemNameInTheCart.nth(1).textContent()).toContain('Printed Dr...');
        });
        await test.step('Validate first product quantity in the cart', async () => {
            expect(await shoppingCartPage.cartQuantity.nth(0).textContent()).toBe('3');
        });
        await test.step('Validate second product quantity in the cart', async () => {
            expect(await shoppingCartPage.cartQuantity.nth(1).textContent()).toBe('3');
        });

    })

    test('User can notice that the cart total = (cost of items + the shipping cost)', async ({ page, searchPage, productPage, shoppingCartPage }) => {
        const product = "Blouse";
        const expectedCartTotal = "$88";
        await searchPage.searchProduct(product);
        await productPage.clickOnFirstProduct(product);
        await productPage.selectSize('L');
        await productPage.increaseQuantityBy(2);
        await productPage.clickAddToCart();
        await productPage.closeAddToCartSuccessAlert();
        await test.step('Validate the cart total', async () => {
            expect(await shoppingCartPage.cartTotal.textContent()).toBe(expectedCartTotal);
        });
    })

    test('User can delete an item from the cart', async ({ page, searchPage, productPage, shoppingCartPage }) => {
        const product = "Blouse";
        await searchPage.searchProduct(product);
        await productPage.clickOnFirstProduct(product);
        await productPage.selectSize('L');
        await productPage.clickAddToCart();
        await productPage.closeAddToCartSuccessAlert();
        await shoppingCartPage.cartIcon.hover();
        await shoppingCartPage.removeItemFromCart();
        await test.step('Validate if the cart is empty after deleting the item', async () => {
            expect(await shoppingCartPage.cartEmpty.textContent()).toBe('(empty)');
        });
    })
    test('User should see a message indicating items which are not in stock', async ({ page, searchPage, productPage, shoppingCartPage }) => {
        const product = "Faded Short Sleeve T-shirts";
        await searchPage.searchProduct(product);
        await productPage.clickOnFirstProduct(product);
        await test.step('Validate item not instock warning message', async () => {
            expect(await productPage.prodAvailability.textContent()).toBe('This product is no longer in stock');
        });
    })

    test('User should not be able to add more than the items available in stock to the cart', async ({ page, searchPage, productPage, shoppingCartPage }) => {
        const product = "Blouse";
        await searchPage.searchProduct(product);
        await productPage.clickOnFirstProduct(product);
        await productPage.selectSize('L');
        await productPage.typeQtyWanted(100000);
        await productPage.clickAddToCart();
        await test.step('Validate the if the error is displayed', async () => {
            expect(await page.locator('p[class="fancybox-error"]').textContent()).toContain("There isn't enough product in stock.");
        });
    })
    test('User should be navigated to SHOPPING-CART SUMMARY on clicking the check-out button from the cart', async ({ page, searchPage, productPage, shoppingCartPage }) => {
        const product = "Blouse";
        await searchPage.searchProduct(product);
        await productPage.clickOnFirstProduct(product);
        await productPage.selectSize('L');
        await productPage.clickAddToCart();
        await productPage.closeAddToCartSuccessAlert();
        await shoppingCartPage.cartIcon.hover();
        await shoppingCartPage.clickOnCheckoutButton();
        await test.step('Validate navigation to Shopping-cart summary page', async () => {
            expect(await page.locator('h1[id="cart_title"]').textContent()).toContain('Shopping-cart summary');
        });
    })
})