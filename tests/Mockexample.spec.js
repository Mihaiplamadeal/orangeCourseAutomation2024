const { test, request, expect } = require("@playwright/test");
const { ApiUtils } = require("../tests/utils/apiUtils"); // importam clasa
const loginPayLoad = {
  userEmail: "testmp25@mailinator.com",
  userPassword: "Test123456",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }],
};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("@API Place the order", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  const fakePayLoadOrders = { data: [], message: "No Orders" };
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      await route.fulfill({
        response,
        body,
      }); //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    }
  );

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );
  console.log(await page.locator(".mt-4").textContent());
});
