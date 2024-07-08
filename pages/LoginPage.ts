import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import ENV from "../utils/env";

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly userName: Locator;
    readonly password: Locator;
    readonly signInBtn: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
      
        this.userName = page.locator('form[id="login_form"] input[name="email"]');
        this.password = page.locator('input[name="passwd"]');
        this.signInBtn = page.locator('button[name="SubmitLogin"]');
    }
    async login(): Promise<void> {
        await this.userName.fill(ENV.USERNAME);
        await this.password.fill(ENV.PASSWORD);
        await this.signInBtn.click();
    }

}