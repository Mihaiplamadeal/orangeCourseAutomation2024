import { test, expect } from "@playwright/test";

test("Verify 'Forgot Password' functionality", async ({ page }) => {
  // Navighează la pagina de login
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  // Apasă pe "Forgot your password?"
  await page.getByText("Forgot your password?").click();

  // Completează câmpul "Username" cu "Admin"
  await page.getByPlaceholder("Username").fill("Admin");

  // Apasă pe butonul "Reset Password"
  await page.getByRole("button", { name: "Reset Password" }).click();

  // Verifică dacă mesajul "Reset Password link sent successfully" este vizibil
  await expect(
    page.getByRole("heading", { name: "Reset Password link sent" })
  ).toBeVisible();
});
