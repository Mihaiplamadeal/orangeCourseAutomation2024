const { test, expect } = require("@playwright/test");
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("alex@alex.com");
  await page.locator("#userPassword").fill("Alex!994");
  await page.locator("[value='Login']").click();
  // Aici surpriza 
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor({ state: "visible" });
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("@QA Client App login", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
