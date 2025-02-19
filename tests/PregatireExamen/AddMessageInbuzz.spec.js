import { test, expect } from "@playwright/test";
import { emit } from "process";

test("Add Messages in Buzz section", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("link", { name: "Buzz" }).click();
  await page.getByPlaceholder("What's on your mind?").click();
  await page
    .getByPlaceholder("What's on your mind?")
    .fill("Test message preparing for exam");
  await page.getByRole("button", { name: "Post", exact: true }).click();
  await expect(page.getByText("SuccessSuccessfully Saved")).toBeVisible;

  await expect(
    page.getByText("Test message preparing for").first()
  ).toBeVisible();

  
});
