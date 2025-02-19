import { test, expect } from "@playwright/test";
test.setTimeout(60000);

test("Verify users can proceed to checkout from the cart", async ({
  page,
}) => {
  // Definirea locaterelor ca variabile
  // Locatoare ca variabile
  const clickOnItem = "img[alt='Argus All-Weather Tank']";
  const selectSize = "#option-label-size-143-item-168";
  const selectColor = "#option-label-color-93-item-52";
  const addToCartButton = "button#product-addtocart-button span";
  const cartItem = ".action.showcart";
  const deleteItem = "a[title='Remove item']";
  const okButton = "button[class='action-primary action-accept'] span";
  const messageAfterDelete = ".subtitle.empty";
  const checkoutButton = "button[class='action primary checkout']"; // Butonul de checkout

  await page.goto("https://magento.softwaretestingboard.com/");

  // Pasul 2: Adăugarea unui produs în coș
  const element = page.locator(clickOnItem);
  await element.scrollIntoViewIfNeeded(); // Scroll pentru a face elementul vizibil
  await element.click(); // Click pe imaginea produsului
  await page.click(selectSize); // Selectarea mărimii
  await page.click(selectColor); // Selectarea culorii
  await page.click(addToCartButton); // Adăugarea în coș

  await page.getByRole("link", { name: " My Cart 1 1 items" }).click(); // Mergi în coșul de cumpărături

  // // Pasul 3: Validarea existenței unui articol în coș
  const cartItemCount = await page.locator(cartItem).count(); // Obține numărul de articole din coș
  expect(cartItemCount).toBeGreaterThan(0); // Verifică dacă există articole în coș

  await page.waitForTimeout(10000);

  await page.getByRole("button", { name: "Proceed to Checkout" }).click();

  await page.waitForTimeout(15000);

  await expect(page.getByText("Order Summary")).toBeVisible({
    timeout: 15000, // Timeout în milisecunde (10 secunde)
  });

  // await expect(page.getByText("Order Summary")).toBeVisible(); // Verificăm că header-ul "Place Order" este vizibil
  // await expect(await page.getByText("Shipping", { exact: true })).toBeVisible();
});
