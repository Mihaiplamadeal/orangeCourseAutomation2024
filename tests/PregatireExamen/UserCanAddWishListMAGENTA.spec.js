import { test, expect } from "@playwright/test";

test.setTimeout(60000);

// Locatoare ca variabile
const clickOnItem = "img[alt='Argus All-Weather Tank']";
const selectSize = "#option-label-size-143-item-168";
const selectColor = "#option-label-color-93-item-52";
const addToCartButton = "button#product-addtocart-button span";
const cartItem = ".action.showcart";
const okButton = "button[class='action-primary action-accept'] span";
const messageAfterDelete = ".subtitle.empty";
const signInButton = "div[class='panel header'] li[data-label='or'] a";
const emailField = "#email";
const passwordField = "input[type='password']";
const signInButtonRegistration = "fieldset.fieldset.login div.primary span";

test.describe("Cart functionality", () => {
  test("Verify users can add to wishlist", async ({ page }) => {
    // Pasul 1: Accesarea paginii
    await page.goto("https://magento.softwaretestingboard.com/");

    await page.getByRole("link", { name: "Sign In" }).click();

    // await page.click(signInButton);
    await page.locator(emailField).fill("mihai@mailinator.com");
    await page.getByLabel("Password").fill("No Password");
    await page.click(signInButtonRegistration);

    // Pasul 2: Adăugarea unui produs în coș
    const element = page.locator(clickOnItem);
    await element.scrollIntoViewIfNeeded(); // Scroll pentru a face elementul vizibil
    await element.click(); // Click pe imaginea produsului
    await page.click(selectSize); // Selectarea mărimii
    await page.click(selectColor); // Selectarea culorii

    await page.getByRole("link", { name: " Add to Wish List" }).click();
    await expect(
      page.locator("span").filter({ hasText: "My Wish List" })
    ).toBeVisible();
    await expect(
      page.locator("#item_13197").getByText("Argus All-Weather Tank")
    ).toBeVisible();

    await page.getByLabel("store logo").click();

    await page
      .getByRole("banner")
      .locator("button")
      .filter({ hasText: "Change" })
      .click();
    await page.getByRole("link", { name: "My Wish List (2 items)" }).click();

    await expect(
      page.locator("#item_13197").getByText("Argus All-Weather Tank")
    ).toBeVisible();
  });
});
