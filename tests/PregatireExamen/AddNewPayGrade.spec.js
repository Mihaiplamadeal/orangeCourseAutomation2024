import { test, expect } from "@playwright/test";

test("@Add new Pay Grade", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Admin" }).click();
  await page.getByText("Job", { exact: true }).click();
  await page.getByRole("menuitem", { name: "Pay Grades" }).click();
  await page.getByRole("button", { name: " Add" }).click();
  await page.locator("form").getByRole("textbox").click();
  await page.locator("form").getByRole("textbox").fill("Grade 7");
  await page.getByRole("button", { name: "Save" }).click();
  await page.locator("li").filter({ hasText: "Job" }).click();
  await page.getByRole("menuitem", { name: "Pay Grades" }).click();
  // Așteaptă să apară titlul jobului
  await page.waitForSelector("text=Grade 7");
  await expect(page.getByRole("cell", { name: "Grade 7" })).toBeVisible();

  //de relogat si de verificat asta ca este 7
 
});
