
const {test, expect} = require('@playwright/test'); 
const exp = require('constants');

test('Browse Context Playwright test',async({browser})=>{ 
    const context = await browser.newContext(); 
    const page = await context.newPage(); 

const dropdown = page.locator("select.form-control"); // am salvat dropdownîntr o constantă
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //acesăm URL
await dropdown.selectOption ("consult"); // setăm valoarea dorită
const radioButton = page.locator(".customradio");
await radioButton.last().click();
await page.locator('#okayBtn').click();
await expect(radioButton.last()).toBeChecked(); //asertie
console.log(await radioButton.last().isChecked()); //returneaza valoare true/false
const termsAndCondition= page.locator('#terms');
await termsAndCondition.click();
await expect(termsAndCondition).toBeChecked; //verifica ca este selectat
await termsAndCondition.uncheck();//deselectam
await expect(termsAndCondition).not.toBeChecked(); //Verificam ca este deselectat metoda nr.1
expect(await termsAndCondition.isChecked()).toBeFalsy(); //verificam ca este deselctat medota nr.2
const documentLink = page.locator("[href*= 'documents-request']");
await expect(documentLink).toHaveAttribute("class","blinkingText"); //verificam ca linkul este prezent si contine informatiile necesare (declarate mai sus)
await documentLink.click(); //deschidem pagina noua
await  context.waitForEvent('page'); //asteapta sa vada daca alte pagini se vor desschide

const [newPage] = Promise.all([context.waitForEvent("page"),documentLink.click()]);


await page.pause()

})