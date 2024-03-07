import { expect } from "playwright/test";
import {NavigationBar, getBasketCount} from "./NavigationBar"

export class PaymentPage {
    constructor(page){
     this.page = page;
     this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
     this.discountText = page.frameLocator('[data-qa="active-discount-container"]').locator('(//div/p)[1]');
     this.discountInput = page.locator('[data-qa="discount-code-input"]');
     this.submitDiscountBtn = page.locator('[data-qa="submit-discount-button"]');
     this.discountActivationMessage = page.locator('[data-qa="discount-active-message"]');
     this.priceBeforeDiscount = page.locator('[data-qa="total-value"]');
     this.priceAfterDiscount = page.locator('[data-qa="total-with-discount-value"]');
     this.cardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
     this.cardNumberInput = page.locator('[data-qa="credit-card-number"]');
     this.validUntilInput = page.locator('[data-qa="valid-until"]');
     this.cvcInput = page.locator('[data-qa="credit-card-cvc"]');
     this.payBtn = page.locator('[data-qa="pay-button"]');
    }

    activateDiscount = async()=>{
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        //Option1 for laggy input: using .fill() with await expect
        await this.discountInput.fill(code);
        await expect (this.discountInput).toHaveValue(code);   //Used with inputs because this method has retries. toHaveText doesn't work in this case because at the time of assertion happens the field is yet empty
        
        //Option2 for laggy input: slow typing
        // await this.discountInput.focus();
        // await this.page.keyboard.type(code, {delay:1000})
        // expect (await this.discountInput.inputValue()).toBe(code)
        expect(await this.priceAfterDiscount.isVisible()).toBe(false)
        expect(await this.discountActivationMessage.isVisible()).toBeFalsy()
        await this.submitDiscountBtn.click();
        await this.discountActivationMessage.waitFor();
        expect (this.discountActivationMessage).toHaveText('Discount activated!');

        const text = await this.discountText.innerText();
        const regex = /\b\d+(?=% reduction)/;
        const match = text.match(regex);
        const percent = match ? parseInt(match[0]) : null;
        const price1 = await this.priceBeforeDiscount.innerText();
        const price2 = await this.priceAfterDiscount.innerText();
        const totalPrice = parseInt(price1);
        const offPrice = parseInt(price2);
        expect(offPrice).toEqual(parseInt(totalPrice-((totalPrice*percent)/100)),10)
    }

    fillPaymentDetails = async(paymentDetails)=>{
        const {cardNumber, cardOwner, cvc, validUntil} = paymentDetails;
        await this.cardOwnerInput.fill(cardOwner);
        await this.cardNumberInput.fill(cardNumber);
        await this.validUntilInput.fill(validUntil);
        await this.cvcInput.fill(cvc)
    }

    completePayment = async()=>{
        await this.payBtn.click()
        await this.page.waitForURL(/\/thank-you/,{timeout:3000})
    }
}