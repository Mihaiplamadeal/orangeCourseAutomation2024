const { test, expect } = require("@playwright/test");

test("Teste din tema pentru acasa", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[placeholder='Username']").fill("Admin");
    await page.locator("input[placeholder='Password']").fill("admin123");
    await page.locator("button[type='submit']").click();
    await expect(page.locator(".oxd-glass-button.orangehrm-upgrade-button").last()).toBeVisible();

await page.getByRole('link', { name: 'My Info' }).click();
await page.getByPlaceholder('First Name').click();
await page.getByPlaceholder('First Name').fill('Test');
await page.getByPlaceholder('First Name').press('Tab');
await page.getByPlaceholder('Middle Name').fill('Test');

await page.locator('form').filter({ hasText: 'Blood TypeA+Test_Field Save' }).getByRole('button').click();
await expect(page.getByText('Success', { exact: true })).toContainText('Succes');

await page.pause();
});