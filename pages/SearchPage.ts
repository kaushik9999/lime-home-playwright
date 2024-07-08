import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import test from "../baseLib/BaseTest";

export class SearchPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly searchTextbox: Locator;
    readonly searchIcon: Locator;
    readonly noOfProductsDisplyed: Locator;
    readonly arrOfProductTitles: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.searchTextbox = page.getByPlaceholder('Search');
        this.searchIcon = page.locator("button[name='submit_search']");
        this.noOfProductsDisplyed = page.locator('div[class="product-container"]');
        this.arrOfProductTitles = page.locator('ul[class="product_list grid row"] a[class="product-name"]');
    }
    async searchProduct(product: string): Promise<void> {
        await test.step('Search for the product ' + product, async () => {
            await this.searchTextbox.fill(product);
        });
        await test.step('Click on the search Icon', async () => {
            await this.searchIcon.click();
        });
    }

    async assertNumberOfPopulatedProducts(noOfProducts: number): Promise<void> {
        await test.step('Assert the number of products retrived', async () => {
            const noOfPopulatedProducts = await this.noOfProductsDisplyed.all();
            expect(noOfPopulatedProducts.length).toEqual(noOfProducts);
        });

    }

    async assertAllSearchedProducts(product: string): Promise<void> {
        await test.step('Assert all the retrived product titles contains the search string - ' + product, async () => {
            const noOfPopulatedProducts = await this.noOfProductsDisplyed.all();
            for (let i = 0; i < noOfPopulatedProducts.length; i++) {
                let productName = await this.arrOfProductTitles.nth(i).textContent();
                expect(productName).toContain(product);
            }
        });

    }
}