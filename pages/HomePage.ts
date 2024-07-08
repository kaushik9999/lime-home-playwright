import { Page, BrowserContext } from "@playwright/test";
import test from "../baseLib/BaseTest";

export class HomePage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async goToWebsite(url: string): Promise<void> {
        await test.step('Go to the Website', async () => {
            await this.page.goto(url);
        });
    }

}