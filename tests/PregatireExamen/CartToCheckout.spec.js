import { test, expect } from "@playwright/test";

test("Verify users can proceed to checkout from the cart", async ({ page }) => {
  // Definirea locaterelor ca variabile
  const loginEmailField = "input#userEmail";
  const loginPasswordField = "input#userPassword";
  const loginButton = "#login";
  const cartButton = ".btn.btn-custom[routerlink='/dashboard/cart']";
  const checkoutButton = "li[class='totalRow'] button[type='button']";
  const cartItem = ".btn.btn-custom[routerlink='/dashboard/cart']"; // Selector pentru un item în coș
  const checkoutHeader = "h1.hero-primary"; // Text header pe pagina de checkout ("Thank you for your order")

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

  // Pasul 5: Accesare pagina de checkout
  await page.click(checkoutButton);

  // Pasul 6: Validare că utilizatorul a ajuns pe pagina de checkout

  await expect(page.getByText("Place Order").first()).toBeVisible();
});
