import { test, expect } from "@playwright/test";

test.setTimeout(60000);

// Locatoare ca variabile
const clickOnItem = "img[alt='Argus All-Weather Tank']"; // Selector pentru produs
const selectSize = "#option-label-size-143-item-168"; // Selector pentru mărime
const selectColor = "#option-label-color-93-item-52"; // Selector pentru culoare
const addToCartButton = "button#product-addtocart-button span"; // Buton de adăugare în coș
const cartItem = ".action.showcart"; // Coșul de cumpărături
const updateButton = "#update-cart-item-472197"; // Buton de actualizare a cantității
const quantityField = "#cart-item-474216-qty"; // Câmp pentru cantitate

test.describe("Cart functionality", () => {
  test("Verify cart updates correctly when the quantity of a product is changed.", async ({
    page,
  }) => {
    // Pasul 1: Accesarea paginii
    await page.goto("https://magento.softwaretestingboard.com/"); // Navigare către pagina de test

    // Pasul 2: Adăugarea unui produs în coș
    const element = page.locator(clickOnItem);
    await element.scrollIntoViewIfNeeded(); // Scroll pentru a face elementul vizibil
    await element.click(); // Click pe imaginea produsului
    await page.click(selectSize); // Selectarea mărimii produsului
    await page.click(selectColor); // Selectarea culorii produsului
    await page.click(addToCartButton); // Adăugarea produsului în coș

    // Pasul 3: Validarea existenței unui articol în coș
    const cartItemCount = await page.locator(cartItem).count(); // Obține numărul de articole din coș
    expect(cartItemCount).toBeGreaterThan(0); // Verifică dacă există articole în coș

    await page.getByRole("link", { name: " My Cart 1 1 items" }).click(); // Mergi în coșul de cumpărături

    // Pasul 4: Actualizarea cantității
    await page.locator(quantityField).fill("2"); // Actualizarea cantității produsului la 2
    await page.click(updateButton); // Click pe butonul de actualizare

    // Pasul 5: Verificarea cantității actualizate
    const updatedQuantity = await page.locator(quantityField).inputValue(); // Obține valoarea cantității
    expect(updatedQuantity).toBe("2"); // Verifică dacă cantitatea este corectă

    // Pasul 6: Verificarea prețului actualizat
    await expect(page.getByText("$44.00")).toBeVisible(); // Verifică dacă prețul actualizat este afișat corect

    // Pasul 7: Validarea numelui și atributelor produsului
    await expect(page.locator(".product-item-name")).toHaveText("Argus All-Weather Tank"); // Verifică numele produsului
    await expect(page.locator(".selected-item [data-option-label='Size']")).toHaveText("M"); // Verifică mărimea produsului
    await expect(page.locator(".selected-item [data-option-label='Color']")).toHaveText("Blue"); // Verifică culoarea produsului

    // Pasul 8: Finalizarea testului
    console.log(
      "Test passed: Cart updates correctly when the quantity is changed."
    );
  });
});
