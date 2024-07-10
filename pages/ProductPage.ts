import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import test from "../baseLib/BaseTest";

export class ProductPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly productLink: Locator;
    readonly prodAvailability: Locator;
    readonly addToCartBtn: Locator;
    readonly addToCartSucessMsg: Locator;
    readonly addToCartPopUpClose: Locator;
    readonly plusIconQuantity: Locator;
    readonly qtyTextBox:Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.productLink = page.locator('div[class="product-container"] a[class="product-name"]');
        this.prodAvailability = page.locator('span[id="availability_value"]');
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
        this.addToCartSucessMsg = page.locator('div[class*="layer_cart_product"] h2');
        this.addToCartPopUpClose = page.getByTitle('Close window');
        this.plusIconQuantity = page.locator('i[class="icon-plus"]');
        this.qtyTextBox = page.locator('input[id="quantity_wanted"]');
    }

    async clickOnFirstProduct(product: string): Promise<void> {
        await test.step('click on the product ' + product, async () => {
            await this.productLink.getByText(product).nth(0).click();
        });
    }

    async confirmProductAvailability(product: string): Promise<boolean> {
        let stockStatus = false;
        await test.step('Check the availability of ' + product, async () => {
            const availability = await this.prodAvailability.textContent();
            if (availability == 'In stock') {
                console.log('Available');
                stockStatus = true;
            }
            else {
                stockStatus = false;
            }

        });
        return stockStatus;
    }

    async selectSize(size: string): Promise<void> {
        await test.step('select size ' + size, async () => {
            await this.page.getByLabel('Size').selectOption(size);
        });
    }

    async increaseQuantityBy(quantity: number): Promise<void> {
        await test.step('select quantity ' + quantity, async () => {
            for(let i=0;i<quantity;i++){
                await this.plusIconQuantity.click({force:true});
            }
        });
    }
    async clickAddToCart(): Promise<void> {
        await test.step('click on Add to cart button ', async () => {
            await this.addToCartBtn.click({ force: true });
        });
    }

    async closeAddToCartSuccessAlert(): Promise<void> {
        await test.step('Close Add to cart success alert', async () => {
            await this.addToCartPopUpClose.click();
        });
    }
    async typeQtyWanted(qty:number): Promise<void> {
        await test.step('Enter quantity wanted '+ qty, async () => {
            await this.qtyTextBox.clear();
            await this.qtyTextBox.fill(qty.toString());
        });
    }
    
}
