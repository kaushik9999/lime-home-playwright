import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import test from "../baseLib/BaseTest";

export class ShoppingCartPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly itemNameInTheCart: Locator;
    readonly cartQuantity: Locator;
    readonly cartTotal:Locator;
    readonly removeItem: Locator;
    readonly cartIcon:Locator;
    readonly cartEmpty: Locator;
    readonly checkoutBtn:Locator;
    readonly orderComment: Locator;
    readonly checkOutLinkOnSummaryPage : Locator;
    readonly checkOutBtnOnAddressPage : Locator;
    readonly termsAndConditions: Locator;
    readonly payByCheck: Locator;
    readonly confirmOrder: Locator;
    readonly generalAlert: Locator;
    readonly errorAlert: Locator;
    

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.itemNameInTheCart = page.locator('div[class="cart-info"] div[class="product-name"] a');
        this.cartQuantity = page.locator('span[class="quantity"]');
        this.cartTotal = page.locator('span[class*="price cart_block_total"]');
        this.removeItem = page.locator('span[class="remove_link"] a');
        this.cartIcon = page.locator('a[title="View my shopping cart"]');
        this.cartEmpty = page.locator('a[title="View my shopping cart"] span').nth(4);
        this.checkoutBtn = page.locator('a[title="Check out"]');
        this.orderComment = page.locator('textarea[name="message"]');
        this.checkOutLinkOnSummaryPage = page.getByRole('link', { name: 'Proceed to checkout' });
        this.checkOutBtnOnAddressPage = page.getByRole('button', { name: 'Proceed to checkout' });
        this.termsAndConditions = page.locator('input[name="cgv"]');
        this.payByCheck = page.locator('a[title="Pay by check."]');
        this.confirmOrder = page.getByRole('button', { name: 'I confirm my order' });
        this.generalAlert = page.locator('p[class="alert alert-success"]');
        this.errorAlert = page.locator('p[class="fancybox-error"]');
    }

    async removeItemFromCart(): Promise<void> {
        await test.step('Remove item from the cart', async () => {
            await this.removeItem.click({force:true});
        });
    }
    async clickOnCheckoutButton(): Promise<void> {
        await test.step('Click check out button', async () => {
            await this.checkoutBtn.click({force:true});
        });
    }
    async enterAMessageDuringCheckOut(msg:string): Promise<void> {
        await test.step('Enter checkout message', async () => {
            await this.orderComment.fill(msg);
        });
    }
    async clickOnCheckoutOnSummaryPage(): Promise<void> {
        await test.step('Click check out on summary page', async () => {
            await this.checkOutLinkOnSummaryPage.click();
        });
    }
    async clickOnCheckoutOnAddressPage(): Promise<void> {
        await test.step('Click check out on address page', async () => {
            await this.checkOutBtnOnAddressPage.click();
        });
    }
    async agreeToTermsAndConditions():Promise<void>{
        await test.step('Agree to the terms and conditions', async () => {
            await this.termsAndConditions.check();
        });
    }

    async clickPayByCheck():Promise<void>{
        await test.step('Click pay by check', async () => {
            await this.payByCheck.click();
        });
    }

    async clickConfirmOrder():Promise<void>{
        await test.step('Click confirm order', async () => {
            await this.confirmOrder.click();
        });
    }
    
}