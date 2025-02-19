import { test, expect } from "@playwright/test";
import { emit } from "process";

test("Display error message when invalid credentials a introduced", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  await page.getByPlaceholder("Username").fill("Admin1");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  //   await page
  //     .getByRole("alert")
  //     .locator("div")
  //     .filter({ hasText: "Invalid credentials" })
  //     .click();

  //   await expect(
  //     page
  //       .getByRole("alert")
  //       .locator("div")
  //       .filter({ hasText: "Invalid credentials" })
  //   ).toBeVisible();
  //   await Promise.all([
  //     page.on("dialog", async (dialog) => {
  //       expect(dialog.type()).toBe("alert");
  //       dialog.accept();
  //     }),
  //   ]);

  await expect(
    page
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "Invalid credentials" })
  ).toContainText("Invalid");

  
});
