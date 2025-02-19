import { test, expect } from '@playwright/test';
import { emit } from 'process';

test('End to end test', async ({ page }) => {
    const email = "miha@mailinator.com";

  
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Moldov@1");
    await page.locator('[value = "Login"]').click();
  await page.waitForLoadState("networkidle");
  //await page.locator(".card-body b").first().waitFor();  
const title =await page.locator(".card-body b").allTextContents();

console.log(title);
const products = page.locator('.card-body');
const count = await products.count();
const productName = 'ZARA COAT 3'
for (let i =0;i<count;i++){


if ((await products.nth(i).locator('b').textContent()) === productName){
    await products.nth(i).locator("text= Add to cart").click();
    break;

}
}

await page.locator('[routerLink*="cart"]').click()
await page.locator("div li").first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();

await page.locator("text=Checkout").click();

await page.locator('[placeholder*="Country"]').pressSequentially("mol",{delay:100}); //selectare dintr-o lista in care scrii si apara ceva

const dropdown = page.locator(".ta-results"); //Rezultatele
await dropdown.waitFor(); //asteptam sa apara
const optionsCount = await dropdown.locator("button").count(); //Extragem numarul de elemente
for (let i=0;i<optionsCount;++i){
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " Moldova, Republic of"){ 
await dropdown.locator("button").nth(i).click();
break;
    }
}

await expect(page.locator('.user__name label[type="text"]').first()).toHaveText(email);

await page.locator(".action__submit").click();

await expect(page.locator(".hero-primary")).toHaveText("  Thankyou for the order. ");
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);

await page.locator("button[routerlink*='myorders']").click();

await page.locator("tbody").waitFor(); //asteptam aparitia tabelei
const rows = page.locator("tbody tr"); //extragem randurile

for (let i=0;i<(await rows.count());++i){ //pargurgem fiecare rand si verificam continutul celulei order id
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)){
        await rows.nth(i).locator("button").first().click(); //cind gasim randul <i> cu id-ul cautat pe acelasi rand cautam butonul si apasam pe el

    }
}

const orderIdDetails = await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();
await page.pause()

});


    

    