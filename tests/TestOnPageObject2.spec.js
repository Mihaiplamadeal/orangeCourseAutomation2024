const { test, expect } = require("@playwright/test");

const username = "alex@alex.com";
const password = "Alex!994";
const productName = "ZARA COAT 3";

test("Upload download excel validation", async ({ page }) => {
  const { POManager } = require("../PageObject/POManger");
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();
});
