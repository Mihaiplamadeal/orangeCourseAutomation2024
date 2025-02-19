import { test, expect } from "@playwright/test";
import { emit } from "process";

test("Succesfull login", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  //de adaugat validare. un selector ca sunt pe acea pagina
 
  
});
