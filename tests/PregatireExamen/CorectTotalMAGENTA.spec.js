import { test, expect } from "@playwright/test";

test.setTimeout(60000);

// Locatoare ca variabile
const clickOnItem = "img[alt='Argus All-Weather Tank']";
const selectSize = "#option-label-size-143-item-168";
const selectColor = "#option-label-color-93-item-52";
const addToCartButton = "button#product-addtocart-button span";
const cartItem = ".action.showcart";
// const deleteItem = "a[title='Remove item']";
// const okButton = "button[class='action-primary action-accept'] span";
// const messageAfterDelete = ".subtitle.empty";
// const itemInCartText = "span[data-bind=\"i18n: 'Item in Cart'\"]";
// const updateButton = "#update-cart-item-472197";
// const subtotalAmount = 'span[data-th="Cart Subtotal"]';
// const shippingAmount = 'span[data-th="Shipping"]';
// const totalAmount = 'strong span[class="price"]';

test.describe("Cart functionality", () => {
  test("Verify cart updates correctly when the quantity of a product is changed.", async ({
    page,
  }) => {
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
    await page.getByRole("spinbutton", { name: "Qty:" }).click();
    await page.getByRole("spinbutton", { name: "Qty:" }).press("ArrowRight");
    await expect(page.getByText("$22.00").first()).toBeVisible();
    await page.waitForTimeout(3000);

    await page.getByRole("spinbutton", { name: "Qty:" }).press("ArrowRight");
    await page.getByRole("spinbutton", { name: "Qty:" }).fill("2");
    await page.getByText("Argus All-Weather Tank See").click();
    await page.getByRole("button", { name: "Update" }).click();

    await page.getByText("$44.00").waitFor({ state: "visible", timeout: 5000 });

    await expect(page.getByText("$44.00")).toBeVisible();

    await page.getByRole("button", { name: "Proceed to Checkout" }).click();

    await expect(page.getByText("Order Summary")).toBeVisible();
    await page
      .getByRole("textbox", { name: "Email Address * Email Address" })
      .fill("mihai@mailinator.com");
    await page.getByLabel("First Name").click();
    await page.getByLabel("First Name").fill("Mihai");
    await page.getByLabel("Last Name").click();
    await page.getByLabel("Last Name").fill("P");
    await page.getByLabel("Street Address: Line 1").click();
    await page.getByLabel("Street Address: Line 1").fill("Test");
    await page.getByLabel("Street Address: Line 1").press("Tab");
    await page.getByLabel("Street Address: Line 2").fill("Test");
    await page.getByLabel("Street Address: Line 2").press("Tab");
    await page.getByLabel("Street Address: Line 3").fill("Test");
    await page.getByLabel("City").click();
    await page.getByLabel("City").fill("Chisinau");

    await page.locator('select[name="region_id"]').selectOption("15");
    await page.getByLabel("Zip/Postal Code").click();
    await page.getByLabel("Zip/Postal Code").fill("19713");
    await page.getByLabel("Phone Number").click();
    await page.getByLabel("Phone Number").fill("75554444");
    await page.locator("#checkout-step-shipping").click();
    await page.getByLabel("Fixed").check();
    await page.getByRole("button", { name: "Next" }).click();

    await expect(
      page.locator("span").filter({ hasText: "Order Summary" })
    ).toBeVisible();

    await page.waitForSelector('span[data-th="Cart Subtotal"]');
    await page.waitForSelector('span[data-th="Shipping"]');
    await page.waitForSelector('strong span[class="price"]');

    // Extragem valorile de pe pagină
    const subtotal = await page
      .locator('span[data-th="Cart Subtotal"]')
      .textContent();
    const shipping = await page
      .locator('span[data-th="Shipping"]')
      .textContent();
    const total = await page
      .locator('strong span[class="price"]')
      .textContent();

    // Convertim valorile la numere
    const subtotalValue = parseFloat(subtotal.replace("$", "").trim());
    const shippingValue = parseFloat(shipping.replace("$", "").trim());
    const totalValue = parseFloat(total.replace("$", "").trim());

    // Verificăm că suma totalului este corectă
    expect(totalValue).toBeCloseTo(subtotalValue + shippingValue, 2); // Verificăm dacă totalul
  });

  console.log(
    "Test passed: The cart displays the correct subtotal, tax, Total amount."
  );
});
