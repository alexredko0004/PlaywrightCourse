import { expect } from "playwright/test";

export class DeliveryDetailsPage {
    constructor(page){
     this.page = page;
     this.fnInput = page.locator('[data-qa="delivery-first-name"]');
     this.lnInput = page.locator('[data-qa="delivery-last-name"]');
     this.streetInput = page.locator('[data-qa="delivery-address-street"]');
     this.postcodeInput = page.locator('[data-qa="delivery-postcode"]');
     this.cityInput = page.locator('[data-qa="delivery-city"]');
     this.countryDropDown = page.locator('[data-qa="country-dropdown"]');
     this.saveAddressBtn = page.locator('[data-qa="save-address-button"]');
     this.savedAddresses = page.locator('[data-qa="saved-address-container"]');
     this.fnSaved = page.locator('[data-qa="saved-address-firstName"]');
     this.lnSaved = page.locator('[data-qa="saved-address-lastName"]');
     this.streetSaved = page.locator('[data-qa="saved-address-street"]');
     this.postcodeSaved = page.locator('[data-qa="saved-address-postcode"]');
     this.citySaved = page.locator('[data-qa="saved-address-city"]');
     this.countrySaved = page.locator('[data-qa="saved-address-country"]');
     this.continueToPaymentBtn = page.locator('//button[contains(@class,"payment")]');
    }
    fillDeliveryDetails = async(userAddress)=>{
        const {fn,ln,street,postcode,city,country} = userAddress;
        await this.fnInput.fill(fn);
        await this.lnInput.fill(ln);
        await this.streetInput.fill(street);
        await this.postcodeInput.fill(postcode);
        await this.cityInput.fill(city);
        await this.countryDropDown.selectOption(country);
    }
    saveDetails = async()=>{
        const addressCountBeforeSaving = await this.savedAddresses.count();
        await this.saveAddressBtn.click();
        await expect(this.savedAddresses).toHaveCount(addressCountBeforeSaving+1);
        expect(await this.fnSaved.first().innerText()).toBe(await this.fnInput.inputValue());
        expect(await this.lnSaved.first().innerText()).toBe(await this.lnInput.inputValue());
        expect(await this.streetSaved.first().innerText()).toBe(await this.streetInput.inputValue());
        expect(await this.postcodeSaved.first().innerText()).toBe(await this.postcodeInput.inputValue());
        expect(await this.citySaved.first().innerText()).toBe(await this.cityInput.inputValue());
        expect(await this.countrySaved.first().innerText()).toBe(await this.countryDropDown.inputValue());
    }
    continueToPayment = async()=>{
        await this.continueToPaymentBtn.click()
        await this.page.waitForURL(/\/payment/, {timeout:3000})
    }
}