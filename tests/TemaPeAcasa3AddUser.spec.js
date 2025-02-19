const { test, expect } = require("@playwright/test");

test("Teste din tema pentru acasa", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[placeholder='Username']").fill("Admin");
    await page.locator("input[placeholder='Password']").fill("admin123");
    await page.locator("button[type='submit']").click();
    await expect(page.locator(".oxd-glass-button.orangehrm-upgrade-button").last()).toBeVisible();

    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Alexa');
    await page.getByPlaceholder('First Name').press('Tab');
    await page.getByPlaceholder('Middle Name').fill('Alexa');
    await page.getByPlaceholder('Middle Name').press('Tab');
    await page.getByPlaceholder('Last Name').fill('Pimp');
    await page.getByPlaceholder('Last Name').press('Tab');
    await page.locator('form').getByRole('textbox').nth(4).fill('88999');
    await page.getByRole('button', { name: 'Save' }).click();

   //await expect(page.locator('.oxd-toast-icon-wrap')).toContainText('SuccessSuccessfully Saved');

    //await page.locator('.oxd-toast-icon-wrap')
   // await page.getByText('SuccessSuccessfully Saved').click();


await page.pause();

});