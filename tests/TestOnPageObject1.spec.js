const { test, expect } = require("@playwright/test");

const username = "alex@alex.com";
const password = "Alex!994";
const productName = "ZARA COAT 3";

test("Upload download excel validation", async ({ page }) => {
  const { LoginPage } = require("../PageObject/LoginPage");
  const { DashboardPage } = require("../PageObject/DashboardPage");
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();
});
