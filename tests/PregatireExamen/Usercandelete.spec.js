import { test, expect } from "@playwright/test";

// Locatoare ca variabile
const loginEmailField = 'input[type="email"]';
const loginPasswordField = 'input[type="password"]';
const loginButton = "#login";
const cartButton = 'button[routerlink="/dashboard/cart"]';
const deleteItemButton = ".btn.btn-danger";
const cartItem = ".btn.btn-custom[routerlink='/dashboard/cart']";
const emptyCartMessage = ".cart h1";

test.describe("Cart functionality", () => {
  test("Verify users can delete items from the cart", async ({ page }) => {
    // Pasul 1: Accesarea paginii și autentificarea
    await page.goto("https://rahulshettyacademy.com/client");
    await page.fill(loginEmailField, "miha@mailinator.com");
    await page.fill(loginPasswordField, "Moldov@1");
    await page.click(loginButton);
    await expect(page).toHaveURL(/.*dashboard/);

    //Pasul 2: Adaugare un produs in cos

    await page.getByRole("button", { name: " Add To Cart" }).first().click();

    // Pasul 3: Navigarea în coșul de cumpărături
    await page.click(cartButton);
    await expect(page).toHaveURL(/.*cart/);

    // Pasul 4: Validarea existenței unui articol în coș
    const itemsInCart = await page.locator(cartItem).count();
    expect(itemsInCart).toBeGreaterThan(0);

    // Pasul 5: Ștergerea unui articol din coș
    await page.click(deleteItemButton);

    // Pasul 6: Validarea că articolul a fost șters

    await expect(
      page.getByRole("heading", { name: "No Products in Your Cart !" }).first()
    ).toBeVisible();

    // Pasul 7: Finalizarea testului
    console.log("Test passed: Item successfully deleted from the cart.");
  });
});
