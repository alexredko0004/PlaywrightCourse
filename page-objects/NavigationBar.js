import {isDesktopViewport} from "../data/utils/isDesktop.js"

export class NavigationBar {
    constructor(page){
     this.page = page;
     this.basketCounter = page.locator('[data-qa="header-basket-count"]');
     this.checkoutLink = page.getByRole('link',{name:'Checkout'});
     this.burgerButton = page.locator('[data-qa="burger-button"]');
    }
    getBasketCount = async()=>{
        const text = await this.basketCounter.innerText()
        return parseInt(text,10)
    }
    gotoBasket = async()=>{
        if (!isDesktopViewport(this.page)){
        await this.burgerButton.click();
        }
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket");
    }
}