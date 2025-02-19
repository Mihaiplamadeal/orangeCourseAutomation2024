const { test, expect } = require("@playwright/test");

test("Go back and go forward", async ({ page }) => {
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.goto("https://www.google.com/");
await page.goBack();
await page.goForward();
await page.pause();
});