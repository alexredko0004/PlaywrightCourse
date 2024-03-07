import { expect } from "playwright/test";

export class LoginPage {
    constructor(page){
     this.page = page;
     this.emailField = page.locator("//input[contains(@placeholder,'E-Mail')]");
     this.passwordField = page.locator("//input[contains(@placeholder,'Password')]");
     this.loginBtn = page.locator('(//button)[1]');
     this.registerBtn = page.locator('(//button)[2]');
    }
    gotoRegisterPage = async()=>{
        await this.registerBtn.waitFor();
        await this.registerBtn.click();
        await this.page.waitForURL(/\/signup/,{timeout:3000});
    }
}