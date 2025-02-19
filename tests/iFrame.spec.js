const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("Lucru cu iFrames", async ({ page }) => {
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

const framesPage = page.frameLocator("#courses-iframe"); //facem o constanta related la iframe si continuam sa scriem acolo cod cum ar fi o pagina obisnuita

await framesPage.locator("li a[href*='lifetime-acces']:visible").click(); //extragem un buton si filtram  cu visible doarece avem 2 elemente care corespund selectorului

const textCheck = await framesPage.locator(".text h2").textContent(); 
console.log(textCheck.split(" "[1])); //verificam ca am ajuns la pagina potrivita prin faptul ca extragem o cifra din text




await page.pause();
});
