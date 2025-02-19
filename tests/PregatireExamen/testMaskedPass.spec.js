import { test, expect } from "@playwright/test";

test("Verify password is masked", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  // Localizează câmpul de parolă
  const passwordInput = await page.locator('input[name="password"]');

  // Introduce o parolă pentru test
  await passwordInput.fill("Admin1234");

  // Verifică că textul introdus este mascat ca asteriscuri (****)
  const passwordType = await passwordInput.evaluate((el) => el.type);
  expect(passwordType).toBe("password");

  // Adițional, poți verifica că valoarea câmpului de parolă este criptată
  const enteredPassword = await passwordInput.inputValue();
  expect(enteredPassword).toBe("Admin1234");
});
