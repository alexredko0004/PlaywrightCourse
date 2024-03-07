import { expect } from "playwright/test";
import {NavigationBar, getBasketCount} from "./NavigationBar"

export class CheckoutPage {
    constructor(page){
     this.page = page;
     this.basketCards = page.locator('[data-qa="basket-card"]');
     this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
     this.removeFromBasketBtns = page.locator('[data-qa="basket-card-remove-item"]');
     this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]');
    }
    removeCheapestProduct = async()=>{
        await this.basketCards.first().waitFor();
        const itemsBeforeRemoval = await this.basketCards.count();
        await this.basketItemPrice.first().waitFor();
        const allPricesTexts = await this.basketItemPrice.allInnerTexts();
        const allPricesNumbers = allPricesTexts.map((value)=>{
            let trimmed = value.substring(0,value.length-1)
            return parseInt(trimmed,10)
        });
        const cheapestItem = allPricesNumbers.reduce((acc,curr)=>{
                if (acc>curr) acc=curr
                return acc
        });
        const indexOfCheapestItem = allPricesNumbers.indexOf(cheapestItem);
        await this.removeFromBasketBtns.nth(indexOfCheapestItem).waitFor();
        await this.removeFromBasketBtns.nth(indexOfCheapestItem).click();
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval-1);
        const pagge = new NavigationBar(this.page);                                 //Added from myself
        await expect(await pagge.getBasketCount()).toEqual(itemsBeforeRemoval-1)    //Added from myself
    }

    continueToCheckout = async ()=>{
        await this.continueToCheckoutBtn.waitFor();
        await this.continueToCheckoutBtn.click();
        await this.page.waitForURL(/\/login/,{timeout:3000});
    }
}