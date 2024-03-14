import {test} from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
import {MyAccountPage} from "../page-objects/MyAccountPage"
import {getLoginToken} from "../data/utils/getLoginToken"
import {adminDetails} from '../data/userDetails'

// test ('My account using cookie injection', async({page})=>{
//     const token = await getLoginToken(adminDetails.username,adminDetails.password);
//     console.log({token})
//     const myAccount = new MyAccountPage(page);
//     await myAccount.visit();
//     await page.evaluate((tokenInsideFunction) => {
//         document.cookie="token="+tokenInsideFunction
//     }, token);
//     await myAccount.visit();
//     await myAccount.waitForPageHeading()
//})

test ('My account using cookie injection and mocking network request', async({page})=>{
    const token = await getLoginToken(adminDetails.username,adminDetails.password);
    console.log({token})
    await page.route('**/api/user**', async(route,request)=>{
       await route.fulfill({
         status: 500,
         contentType: "application/json",
         body: JSON.stringify({message: 'Error from MOCKING'})  //this body structure depends on app implementation. Nice to ask devs beforehand about it
       })
    })
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
    await page.evaluate((tokenInsideFunction) => {
        document.cookie="token="+tokenInsideFunction
    }, token);
    await myAccount.visit();
    await myAccount.waitForPageHeading();
    await myAccount.waitForErrorMessage();
    await page.close()
})