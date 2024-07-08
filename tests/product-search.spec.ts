import test from "../baseLib/BaseTest";
import { expect } from "@playwright/test"
import ENV from "../utils/env";

test.describe('Product Search Tests', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goToWebsite(ENV.BASE_URL);
    });

    test.afterEach(async ({ page }) => {
        page.close();
    });

    test('User should be able to navigate to the homepage - validate title', async ({ page }) => {
        let title = await page.title();
        expect(title).toBe("My Shop");
    })

    test('User should be able to search for product "Faded Short Sleeve T-shirts" and notice the retrived products', async ({ searchPage }) => {
        const searchString = "Faded Short Sleeve T-shirts";
        await searchPage.searchProduct(searchString);
        await searchPage.assertNumberOfPopulatedProducts(1); // Assert the number of products loaded
        await searchPage.assertAllSearchedProducts(searchString); // Assert that all the products title contains searched string
    })

    test('User should be able to search for product "Blouse" and notice the retrived products', async ({ searchPage }) => {
        const searchString = "Blouse";
        await searchPage.searchProduct(searchString);
        await searchPage.assertNumberOfPopulatedProducts(1); // Assert that the product title contains searched string
        await searchPage.assertAllSearchedProducts(searchString); // Assert that all the products title contains searched string
    })

    // This test is expected to fail because the search is displaying products that do not match the search query.  
    test('User should not be able to find products which does not match the search criteria', async ({ searchPage }) => {
        const searchString = "Printed Summer Dress";
        await searchPage.searchProduct(searchString);
        await searchPage.assertNumberOfPopulatedProducts(2); // Assert the number of products loaded
        await searchPage.assertAllSearchedProducts(searchString); // Assert that all the products title contains searched string
    })

    //This is a negative test that validates searching for unavailable products. It should retrieve zero products and display an error message.
    test('User should find no results for searching a product that is not listed', async ({ page, searchPage }) => {
        const searchString = "XXXXYYYYZZZZ";
        await searchPage.searchProduct(searchString);
        await searchPage.assertNumberOfPopulatedProducts(0); // Assert the number of products loaded to be zero
        const warningMessage = page.locator('p[class="alert alert-warning"]');
        await test.step('Assert if the warning is displayed', async () => {
            await expect(warningMessage).toBeVisible(); // Assert if the warning is displayed 
        });
        await test.step('Assert the warning message content', async () => {
            expect(await warningMessage.textContent()).toContain('No results were found for your search'); // Assert the warning message
        });
       
    })

})