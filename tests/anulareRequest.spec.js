const { test, request, expect } = require("@playwright/test");
const { ApiUtils } = require("../tests/utils/apiUtils"); // importam clasa
const loginPayLoad = {
  userEmail: "alex@alex.com",
  userPassword: "Alex!994",
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

  page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status())
  );

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink*='myorders']").click();
  await page.pause();
});
