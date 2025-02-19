// const { test, expect,request } = require("@playwright/test");

// let loginResponseJson;
// let token;

// const orderPayLoad ={
//     orfers:[{country: "Cuba",productOrderId:"6581ca399fd99c85e8ee7f45"}]
// };

// const loginPayLoad = {
//     userEmail:  "miha@mailinator.com",
//     userPassword: "Moldov@1",
// };

// let orderId;
// const orderResponse = await apiContext.post(
// "https://rahulshettyacademy.com/api/ecom/order/create-order",

// )

// test.beforeAll(async() =>{

//     const apiContext = await request.newContext();
//     const loginResponse = await apiContext.post(
//         "https://rahulshettyacademy.com/api/ecom/auth/login",
//         {data: loginPayLoad}
//     );
//     expect(loginResponse.ok()).toBeTruthy(); //validam ca cerea noastra spre API e ok
//     loginResponseJson = await loginResponse.json();//convertim obiectul in format json

//     token = loginResponseJson.token; //Asignam tokenul unei variabile declarate mai sus sa o putem accesa mai tirziu

// });

// test.only('API', async ({ page }) => {

//     page.addInitScript((value) =>{
//         window.localStorage.setItem("token", value);},token);

//         await page.goto("https://rahulshettyacademy.com/client/")
//         // await page.locator("#userEmail").fill(email);
//         // await page.locator("#userPassword").fill("Moldov@1");
//         // await page.locator('[value = "Login"]').click();
//       await page.waitForLoadState("networkidle");
//       //await page.locator(".card-body b").first().waitFor();
//     const title =await page.locator(".card-body b").allTextContents();

//     console.log(title);
//     const products = page.locator('.card-body');
//     const count = await products.count();
//     const productName = 'ZARA COAT 3'
//     for (let i =0;i<count;i++){

//     if ((await products.nth(i).locator('b').textContent()) === productName){
//         await products.nth(i).locator("text= Add to cart").click();
//         break;

//     }
//     }

//     await page.pause()
//     }

//     )

const { test, expect, request } = require("@playwright/test");

let context;
let page;
let token;
let apiContext;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext({
    viewport: { height: 900, width: 1600 },
  });
  apiContext = await request.newContext();
  page = await context.newPage();

  const response = await page.request.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: {
        userEmail: "Stan61@gmail.com",
        userPassword: "!Q1matemugiriwelesaw",
      },
    }
  );
  token = await response.json();
  token = token.token;
});

test("6-5", async () => {
  console.log(token);

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");

  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: {
        orders: [
          {
            country: "Moldova, Republic of",
            productOrderedId: "6581ca399fd99c85e8ee7f45",
          },
        ],
      },
      headers: { Authorization: token, "Content-Type": "application/json" },
    }
  );

  const orderBody = await orderResponse.json();

  await page.locator("nav > ul > li:nth-child(3) > button").click();
  await expect(
    page.locator(".table > tbody > tr >th:nth-child(1)").first()
  ).toHaveText(orderBody.orders);
});
