
const {test, expect} = require('@playwright/test'); 
const exp = require('constants');

test('Browse Context Playwright test',async({browser})=>{ 
    const context = await browser.newContext(); 
    const page = await context.newPage(); 

   

await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //acesăm URL

const documentLink = page.locator("[href*= 'documents-request']");
await expect(documentLink).toHaveAttribute("class","blinkingText");
const [newPage] = await Promise.all([context.waitForEvent("page"),documentLink.click()]);

await expect(newPage.locator(".im-para.red")).toBeVisible();
const text = await newPage.locator(".im-para.red").textContent();
console.log(text);
//textul este - "Please email us at mentor@rahulshettyacademy.com with below template to receive response"
const firstSplit = text.split("@"); //pina unde se va face split la text - in acest caz pina la "@"
const   domain = firstSplit[1].split(" ")[0]; //se va face split de la urmatorul caracter dupa @ pina la spatiu " "
console.log(domain);

const userName = page.locator('#username'); //salvam selectorul in constanta
await userName.fill(domain); //inseram valoarea in camp



await page.pause()

});