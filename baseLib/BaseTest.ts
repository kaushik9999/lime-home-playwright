import { TestInfo,test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import {HomePage} from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { ProductPage } from "../pages/ProductPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";


const test = baseTest.extend<{
    loginPage:LoginPage;
    homePage:HomePage;
    searchPage:SearchPage;
    productPage:ProductPage;
    shoppingCartPage:ShoppingCartPage;
}>({
    loginPage :async ({page, context},use) => {
        await use(new LoginPage(page,context));
    },
    homePage:async({page,context},use)=>{
        await use(new HomePage(page,context));
    },
    searchPage:async({page,context},use)=>{
        await use(new SearchPage(page,context));
    },
    productPage:async({page,context},use)=>{
        await use(new ProductPage(page,context));
    },
    shoppingCartPage:async({page,context},use)=>{
        await use(new ShoppingCartPage(page,context));
    }
})

export default test;