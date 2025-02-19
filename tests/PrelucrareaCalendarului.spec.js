const { test, expect } = require("@playwright/test");

test("Selectarea datei in calendar", async ({ page }) => {
  const monthNumber = "8";
  const date = "15";
  const year = "2025"

  
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page.locator(".react-calendar__tile.react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
  await page.locator("//abbr[text()='" + date + "']").click();


  await page.pause();


});