import { test, expect } from "@playwright/test";

test.setTimeout(60000);

// Locatoare ca variabile
const clickOnItem = "img[alt='Argus All-Weather Tank']";
const selectSize = "#option-label-size-143-item-168";
const selectColor = "#option-label-color-93-item-52";
const addToCartButton = "button#product-addtocart-button span";
const cartItem = ".action.showcart";
const deleteItem = "a[title='Remove item']";
const okButton = "button[class='action-primary action-accept'] span";
const messageAfterDelete = ".subtitle.empty";

test.describe("Cart functionality", () => {
  test("Verify users can delete items from the cart", async ({ page }) => {
    // Pasul 1: Accesarea paginii
    await page.goto("https://magento.softwaretestingboard.com/");

    // Pasul 2: Adăugarea unui produs în coș
    const element = page.locator(clickOnItem);
    await element.scrollIntoViewIfNeeded(); // Scroll pentru a face elementul vizibil
    await element.click(); // Click pe imaginea produsului
    await page.click(selectSize); // Selectarea mărimii
    await page.click(selectColor); // Selectarea culorii
    await page.click(addToCartButton); // Adăugarea în coș

    // Pasul 3: Validarea existenței unui articol în coș
    const cartItemCount = await page.locator(cartItem).count(); // Obține numărul de articole din coș
    expect(cartItemCount).toBeGreaterThan(0); // Verifică dacă există articole în coș

    console.log("Test passed: Item successfully added to the cart.");

    await page.getByRole("link", { name: " My Cart 1 1 items" }).click(); // Mergi în coșul de cumpărături
    await page.getByRole("link", { name: " Remove" }).click(); // Șterge articolul
    await page.getByRole("button", { name: "OK" }).click(); // Confirmă ștergerea

    // Așteaptă ca mesajul să fie vizibil
    await expect(page.locator(messageAfterDelete)).toBeVisible(); // Verifică mesajul că coșul este gol

    // Pasul 7: Finalizarea testului
    console.log("Test passed: Item successfully deleted from the cart.");
  });
});
