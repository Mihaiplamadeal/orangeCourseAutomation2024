// const { test, expect } = require("@playwright/test");

// test.only("Prelucrarea alertelor", async ({ page }) => {
// await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await expect(page.locator("#alertbtn")).toBeVisible();

// page.on('dialog',dialog => dialog.accept()); //ii spunem ca va aparea o alerta si sa o accepte
// await page.locator("#alertbtn").click();
// //page.on('dialog',dialog => dialog.accept());
// await page.locator("#confirmbtn").click();



// await page.pause();
// });


const { test, expect } = require("@playwright/test");

test("drop down", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#alertbtn")).toBeVisible();
  await Promise.all([
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert"); 
      dialog.accept();
    }),
    page.locator("#alertbtn").click(),
  ]);
});
