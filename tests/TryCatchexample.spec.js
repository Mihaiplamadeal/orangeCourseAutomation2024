const { test, expect } = require("@playwright/test");
let webContext;

test.beforeAll(async ({ browser }) => {
  try {
    webContext = await browser.newContext({ storageState: "state.json" });
  } catch (error) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("miha@mailinator.com");
    await page.locator("#userPassword").fill("Moldov@1");
    await page.locator("[value='Login']").click();
    // Aici surpriza 
    await page.waitForLoadState("networkidle");
    await context.storageState({ path: "state.json" });
    webContext = await browser.newContext({ storageState: "state.json" });
  }
});

test("@QA Client App login", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
