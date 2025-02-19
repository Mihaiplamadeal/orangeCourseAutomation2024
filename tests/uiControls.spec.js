const { test, expect } = require("@playwright/test");

test("UI Controls", async ({ page }) => {
  const radioButton = page.locator(".customradio");
  const dropdown = page.locator("select.form-control");
  const termsOfConditions = page.locator("#terms");
  const documentLink = page.locator("[href*='documents-request']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await dropdown.selectOption("consult");
  await radioButton.last().click();
  await page.locator("#okayBtn").click();
  console.log("este apăsat:" + (await radioButton.last().isChecked())); // returneaza true/false
  await expect(radioButton.last()).toBeChecked(); // asertie
  await termsOfConditions.click();
  await expect(termsOfConditions).toBeChecked(); //verificăm că este selectat
  await termsOfConditions.uncheck();
  await expect(termsOfConditions).not.toBeChecked(); // verificăm că este deselectat metoda nr 1
  expect(await termsOfConditions.isChecked()).toBeFalsy(); // verificăm că este deselectat metoda nr 2
  await expect(documentLink).toHaveAttribute("class", "blinkingTexts");
});
