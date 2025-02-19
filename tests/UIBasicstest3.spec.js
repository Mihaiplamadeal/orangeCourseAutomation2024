const {test, expect} = require('@playwright/test')
test('Browser Context Playwright test', async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());

const userName = page.locator('#username');
const password = page.locator('#password');
const signIn=  page.locator('#signInBtn');
const cardTitles = page.locator('.card-body a');


await userName.fill("rahulshettyacademy");
await password.fill("learning");
await signIn.click();

// console.log(await page.locator(".card-body a").nth(0).textContent());

await expect(cardTitles.last()).toBeVisible();
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
await page.pause()//daca vrem sa fie pauza sa vedem ca sa completat corect + in config punem headless: false

})