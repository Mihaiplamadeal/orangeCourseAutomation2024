import { test, expect } from "@playwright/test";

test("test codgen", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");

  await page.pause();

  await page.getByPlaceholder("Căutare în anunțuri").click();
  await page.getByPlaceholder("Căutare în anunțuri").fill("Dacia logan");
  await page.getByRole("button", { name: "Caută" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.locator(".js-item-ad").first().click();
  const page1 = await page1Promise;
  await page1.getByText("Trimite mesajul").click();
  await page1.getByPlaceholder("Mesaj pentru Cumpar-").click();
});
