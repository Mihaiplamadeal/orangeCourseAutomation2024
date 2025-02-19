const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("Prelucrarea hover", async ({ page }) => {
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await expect(page.locator("a[href='#top']")).toBeHidden();//verificam ca elementele din hover nu sunt vizibile pina nu facem hover

await page.locator("#mousehover").hover();





await page.pause();
});
