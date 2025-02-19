import { test, expect } from "@playwright/test";

test.setTimeout(60000);

// Locatoare ca variabile

const emailField = "#email";
const passwordField = "input[type='password']";
const signInButtonRegistration = "fieldset.fieldset.login div.primary span";
const changePasswordButton = ".action.change-password";
const newPassfield = "#password";
const confirmPassword = "#password-confirmation";
const saveButton = 'button[title="Save"] span';
const currentPassword = "#current-password";

test.describe("Cart functionality", () => {
  test("Verify users can add to wishlist", async ({ page }) => {
    // Pasul 1: Accesarea paginii
    await page.goto("https://magento.softwaretestingboard.com/");

    await page.getByRole("link", { name: "Sign In" }).click();

    // await page.click(signInButton);
    await page.locator(emailField).fill("mihai@mailinator.com");
    await page.getByLabel("Password").fill("No Password");
    await page.click(signInButtonRegistration);

    await expect(await page.getByText("Home Page")).toBeVisible();

    // await expect(
    //   await page.getByRole("banner").getByText("Welcome, Mihai Plam!")
    // ).toBeVisible();

    await page
      .getByRole("banner")
      .locator("button")
      .filter({ hasText: "Change" })
      .click();
    await page.getByRole("link", { name: "My Account" }).click();

    await page.locator(changePasswordButton).click();
    await page.locator(currentPassword).fill("No Password");
    await page.locator(newPassfield).fill("New Password");
    await page.locator(confirmPassword).fill("New Password");
    await page.locator(saveButton).click();

    // await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText("You saved the account")).toBeVisible();
    await expect(await page.getByText("Customer Login")).toBeVisible();

    await page.locator(emailField).fill("mihai@mailinator.com");
    await page.getByLabel("Password").fill("New Password");
    await page.locator(signInButtonRegistration).click();

    await expect(
      page.locator("strong").filter({ hasText: "Account Information" })
    ).toBeVisible();
  });
});
