import { test, expect, chromium } from '@playwright/test';
import {isDesktopViewport} from "../data/utils/isDesktop.js"
 
 //Test_1
 test.only('add to cart', async ({ page }) => {
    await page.goto('/');
    await page.pause()
    const addToBasketButton = page.locator('[data-qa="product-button"]').first();
    const basketCounter = page.locator('[data-qa="header-basket-count"]');
    // const checkoutLink = page.getByRole('link',{name:'Checkout'})
    let checkoutLink = page.locator("(//a[contains(@href,'basket')])[2]");
    const burgerButton = page.locator('[data-qa="burger-button"]');
    await addToBasketButton.waitFor();
    await addToBasketButton.click();
    await expect(addToBasketButton).toHaveText("Remove from Basket");
    await expect(basketCounter).toHaveText("1");
    if (!isDesktopViewport(page)){
      await burgerButton.click();
      checkoutLink = page.locator("(//a[contains(@href,'basket')])[1]");
      }
    await checkoutLink.click();
    await page.waitForURL('/basket');
    await expect(page.locator('h1')).toHaveText('Basket');
    await page.close();
  });