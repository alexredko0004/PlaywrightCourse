import {test} from "@playwright/test"
import { v4 as uuidv4 } from 'uuid';
import {ProductsPage} from "../page-objects/ProductsPage"
import {NavigationBar} from "../page-objects/NavigationBar"
import {CheckoutPage} from "../page-objects/CheckoutPage"
import {LoginPage} from "../page-objects/LoginPage"
import {RegisterPage} from "../page-objects/RegisterPage"
import {DeliveryDetailsPage} from "../page-objects/DeliveryDetailsPage"
import {PaymentPage} from "../page-objects/PaymentPage"
import {deliveryDetails as userAddress} from "../data/deliveryDetails"
import {paymentDetails} from "../data/paymentDetails"

test("New user e2e test", async({page})=>{
      let productsPage = new ProductsPage(page);
      await productsPage.visit();
      await productsPage.sortByCheapest();
      await productsPage.sortByExpensive();
      await productsPage.addProductToBasket(1);
      await productsPage.addProductToBasket(3);
      await productsPage.addProductToBasket(2);
      
      let navBar = new NavigationBar(page);
      await navBar.gotoBasket();
      
      let checkout = new CheckoutPage(page);
      await checkout.removeCheapestProduct();
      await checkout.continueToCheckout();
      
      let login = new LoginPage(page);
      await login.gotoRegisterPage();
      
      let regPage = new RegisterPage(page);
      const emailID = uuidv4();
      const email = emailID + '@test.com';
      await regPage.signUpAsNewUser(email);

      let deliveryDetails = new DeliveryDetailsPage(page);
      await deliveryDetails.fillDeliveryDetails(userAddress);
      await deliveryDetails.saveDetails();
      await deliveryDetails.continueToPayment();

      let paymentPage = new PaymentPage(page);
      await paymentPage.activateDiscount();
      await paymentPage.fillPaymentDetails(paymentDetails);
      await paymentPage.completePayment()
})