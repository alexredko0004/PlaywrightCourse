import { expect } from "playwright/test";

export class RegisterPage {
    constructor(page){
     this.page = page;
     this.emailField = page.locator("//input[contains(@placeholder,'E-Mail')]");
     this.passwordField = page.locator("//input[contains(@placeholder,'Password')]");
     this.registerBtn = page.locator('(//button)[1]');
    }
    signUpAsNewUser = async(email)=>{
        await this.emailField.fill(email);
        await this.passwordField.fill('Pass123');
        await this.registerBtn.click();
        await this.page.waitForURL("/delivery-details");
    }
}