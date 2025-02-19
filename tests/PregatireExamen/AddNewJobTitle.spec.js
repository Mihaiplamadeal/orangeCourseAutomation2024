import { test, expect } from "@playwright/test";
import { emit } from "process";

test("End to end test", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByText('Job', { exact: true }).click();
  await page.getByRole('menuitem', { name: 'Job Titles' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('Automation tester 21.12');
  await page.getByPlaceholder('Type description here').click();
  await page.getByPlaceholder('Type description here').fill('This is exam for automation tester with playwright');
  await page.getByPlaceholder('Add note').click();
  await page.getByPlaceholder('Add note').fill('Thank you for course');
  await page.getByRole('button', { name: 'Save' }).click();
  // Așteaptă să apară titlul jobului
  await page.waitForSelector('text=Automation tester 21.12');
  await expect(page.getByText('Automation tester 21.12')).toBeVisible();

  

  await page.pause()
});
