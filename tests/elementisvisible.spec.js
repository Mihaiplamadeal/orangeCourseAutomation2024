const { test, expect } = require("@playwright/test");

test("Verificare prezenta sau absenta text pe pagina", async ({ page }) => {
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible(); //verificam ca elementul este vizibil pe pagina
await page.locator("#hide-textbox").click(); //apasam butonul hide
await expect (page.locator("#displayed-text")).toBeHidden; //Verificam ca campul nu este vizibil 



await page.pause();
});