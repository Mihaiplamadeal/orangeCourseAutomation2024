const { test, expect } = require("@playwright/test");

const dataset = JSON.parse(
  JSON.stringify(require("../utils/placeordersTestData.json"))
);

test("Upload download excel validation", async ({ page }) => {
  const { POManager } = require("../../pageobjects/POManager");
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  await loginPage.goTo();
  await loginPage.validLogin(dataset.username, dataset.password);
  await dashboardPage.searchProductAddCart(dataset.productName);
  await dashboardPage.navigateToCart();
});


