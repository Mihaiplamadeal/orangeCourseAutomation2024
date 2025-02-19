import { test, expect } from "@playwright/test";

test.setTimeout(60000);

// Locatoare ca variabile
const clickOnItem = "img[alt='Argus All-Weather Tank']";
const selectSize = "#option-label-size-143-item-168";
const selectColor = "#option-label-color-93-item-52";
const addToCartButton = "button#product-addtocart-button span";
const cartItem = ".action.showcart";
const updateButton = "#update-cart-item-472197";
const quantityField = "#cart-item-474216-qty";

test.describe("Cart functionality", () => {
  test.only("Verify cart updates correctly when the quantity of a product is changed.", async ({
    page,
  }) => {
    //  Accesarea paginii
    await page.goto("https://magento.softwaretestingboard.com/");

    //  Adăugarea unui produs în coș
    const element = page.locator(clickOnItem);
    await element.scrollIntoViewIfNeeded(); // Scroll pentru a face elementul vizibil
    await element.click(); // Click pe imaginea produsului
    await page.click(selectSize); // Selectarea mărimii
    await page.click(selectColor); // Selectarea culorii
    await page.click(addToCartButton); // Adăugarea în coș

    //  Validarea existenței unui articol în coș
    const cartItemCount = await page.locator(cartItem).count(); // Obține numărul de articole din coș
    expect(cartItemCount).toBeGreaterThan(0); // Verifică dacă există articole în coș

    await page.getByRole("link", { name: " My Cart 1 1 items" }).click(); // Mergi în coșul de cumpărături
    await page.getByRole("spinbutton", { name: "Qty:" }).click();
    await page.getByRole("spinbutton", { name: "Qty:" }).press("ArrowRight");
    await expect(page.getByText("$22.00").first()).toBeVisible();

    await page.getByRole("spinbutton", { name: "Qty:" }).press("ArrowRight");
    await page.getByRole("spinbutton", { name: "Qty:" }).fill("2");
    await page.getByText("Argus All-Weather Tank See").click();
    await page.getByRole("button", { name: "Update" }).click();

    await page.getByText("$44.00").waitFor({ state: "visible", timeout: 5000 }); // Așteaptă până când prețul actualizat ($44.00) devine vizibil pe pagină, timp de maxim 5 secunde.

    // Validari finale

    await expect(page.getByText("$44.00")).toBeVisible();
    await expect(page.getByText("2", { exact: true }).nth(2)).toBeVisible();

    //  Finalizarea testului
    console.log(
      "Test passed: Cart updates correctly when the quantity is changed."
    );
  });
});
