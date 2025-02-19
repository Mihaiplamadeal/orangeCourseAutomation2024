import { test, expect } from "@playwright/test";
import { emit } from "process";

test("Check blannk fields", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Required").nth(1)).toBeVisible();

  await expect(page.getByText("Required").first()).toBeVisible();

  
});
