const { test, expect } = require("@playwright/test");

test("Selectarea datei in calendar", async ({ page }) => {
  const monthNumber = "8";
  const date = "15";
  const year = "2025";

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page
    .locator(".react-calendar__tile.react-calendar__year-view__months__month")
    .nth(Number(monthNumber) - 1)
    .click();
  await page.locator("//abbr[text()='" + date + "']").click();

  await page.pause();
});

test("raziob", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.waitForSelector("#root", { state: "visible", timeout: 10000 }); // Added timeout

  // More robust way to wait for the table (important!)
  await page.locator(".products").waitFor({ state: "visible", timeout: 10000 });

  await page.locator(".products").screenshot({ path: "unsorted.png" });
  const rowData = await page
    .locator("tbody tr td:first-child")
    .allTextContents();

  // More specific locator for the column header (important!)
  // await page.getByRole("columnheader", { name: "Veg/fruit name" }).click(); // Or more specific if possible

  // Wait for the table to update after sorting (very important!)
  await page.locator(".products").waitFor({ state: "visible", timeout: 10000 });

  await page.locator(".products").screenshot({ path: "sorted.png" });
  const rowData1 = await page
    .locator("tbody tr td:first-child")
    .allTextContents();

  await expect(rowData).not.toEqual(rowData1);

  // Consider removing or conditionally using pause in production code
  // await page.pause();
});
