const { test, expect } = require("@playwright/test");

test("Teste din tema pentru acasa", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[placeholder='Username']").fill("Admin");
    await page.locator("input[placeholder='Password']").fill("admin123");
    await page.locator("button[type='submit']").click();
    await expect(page.locator(".oxd-glass-button.orangehrm-upgrade-button").last()).toBeVisible();

    await page.locator(".oxd-userdropdown-img").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    
    

    

await page.pause();

});