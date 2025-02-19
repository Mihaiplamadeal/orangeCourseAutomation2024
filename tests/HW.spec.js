const {test, expect} = require('@playwright/test'); 
 
 
test('Browse Context Playwright test',async({browser})=>{ 
const context = await browser.newContext(); 
const page = await context.newPage(); 
 
await page.goto('https://rahulshettyacademy.com/client/'); 
const useremail = page.locator('#userEmail'); 
const pass = page.locator('#userPassword'); 
const buttonlogin = page.locator('#login'); 
const cardTitles = page.locator('.card-body b'); 
 
await useremail.fill('irina29.12.89@gmail.com'); 
await pass.fill('Qwe123rty&'); 
await buttonlogin.click(); 
 
const cardTitlesFirst = await cardTitles.nth(0).textContent(); 
await expect(cardTitlesFirst).toEqual('ZARA COAT 3'); 
console.log(cardTitlesFirst); 
 
await page.close(); 
 
 
})