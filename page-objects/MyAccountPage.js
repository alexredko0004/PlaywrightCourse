export class MyAccountPage {
    constructor(page){
     this.page = page;
     this.pageHeading = page.locator('(//h1)[1]')
     this.errorMessage = page.locator('[data-qa="error-message"]')
    }
    visit = async()=>{
        await this.page.goto('/my-account')
    }
    waitForPageHeading = async()=>{
        await this.pageHeading.waitFor()
    }
    waitForErrorMessage = async()=>{
        await this.errorMessage.waitFor()
    }
}