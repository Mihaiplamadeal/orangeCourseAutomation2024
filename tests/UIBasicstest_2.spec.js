const {test, expect} = require('@playwright/test')
test('Browser Context Playwright test', async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());

await page.locator('#username').fill('rahulshetty');
await page.locator('#password').fill('learning');
// await page.locator('label:nth-child(2)').click();
await page.locator('#signInBtn').click(); 
console.log(await page.locator('div[style*="block"]').textContent());
await expect(page.locator('div[style*="block"]')).toContainText('Incorrect');
await page.pause()//daca vrem sa fie pauza sa vedem ca sa completat corect + in config punem headless: false

})