import {expect} from "@playwright/test"
import {NavigationBar} from "./NavigationBar"
import {CheckoutPage} from "./CheckoutPage"
import {isDesktopViewport} from "../data/utils/isDesktop.js"

export class ProductsPage {
    constructor(page){
     this.page = page;
     this.addToBasketBtns = page.locator('[data-qa="product-button"]');
     this.itemPrice = page.locator("//div[contains(@class,'product-price')]");
     this.sortDropDown = page.locator("//select[contains(@class,'sort-dropdown')]");
    }
    visit = async () =>{
        await this.page.goto('/')
    }
    addProductToBasket = async(index)=>{
        // this.addToBasketBtn=this.page.locator(`(//button[contains(@data-qa,'product-button')])[${number}]`);
        const specificAddButton = this.addToBasketBtns.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        let navigationBar = new NavigationBar(this.page);
        let basketCountBeforeAdd;
        if (isDesktopViewport(this.page)){
        basketCountBeforeAdd = await navigationBar.getBasketCount()
        }
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        if (isDesktopViewport(this.page)){
        const basketCountAfterAdd = await navigationBar.getBasketCount()
        await expect(basketCountAfterAdd).toEqual(basketCountBeforeAdd+1)
        }
    }
    sortByCheapest = async()=>{
        const allPricesTextsBefore = await this.itemPrice.allInnerTexts();
        const allPricesNumbersBefore = allPricesTextsBefore.map((value)=>{
            let trimmed = value.substring(0,value.length-1)
            return parseInt(trimmed,10)
        });
        const allPricesNumbersExpected = allPricesNumbersBefore.sort(function(a, b) {
            return a - b;
          });
        const allPricesNumbersExpectedString = allPricesNumbersExpected.join();
        await this.sortDropDown.selectOption('Price ascending');
        await this.itemPrice.first().waitFor();
        const allPricesTextsAfter = await this.itemPrice.allInnerTexts();
        const allPricesNumbersAfter = allPricesTextsAfter.map((value)=>{
            let trimmed = value.substring(0,value.length-1)
            return parseInt(trimmed,10)
        });
        const allPricesNumbersAfterString = allPricesNumbersAfter.join();
        await expect(allPricesNumbersExpectedString).toEqual(allPricesNumbersAfterString)

    }
    sortByExpensive = async()=>{
        const allPricesTextsBefore = await this.itemPrice.allInnerTexts();
        const allPricesNumbersBefore = allPricesTextsBefore.map((value)=>{
            let trimmed = value.substring(0,value.length-1)
            return parseInt(trimmed,10)
        });
        const allPricesNumbersExpected = allPricesNumbersBefore.sort(function(a, b) {
            return b - a;
          });
        const allPricesNumbersExpectedString = allPricesNumbersExpected.join();
        await this.sortDropDown.selectOption('Price descending')
        await this.itemPrice.first().waitFor();
        const allPricesTextsAfter = await this.itemPrice.allInnerTexts();
        const allPricesNumbersAfter = allPricesTextsAfter.map((value)=>{
            let trimmed = value.substring(0,value.length-1)
            return parseInt(trimmed,10)
        });
        const allPricesNumbersAfterString = allPricesNumbersAfter.join();
        await expect(allPricesNumbersExpectedString).toEqual(allPricesNumbersAfterString)
    }
    
}