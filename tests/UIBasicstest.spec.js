const {test, expect} = require('@playwright/test')

// const selector = '#username',
// const selector = '#password',
// const selector = 'label:nth-child(2)'
// const selector = '#okayBtn'  



test('First test',async({browser})=>{

    const context =await browser.newContext(); //Deschiderea de browser
    const page = await context.newPage(); //Deschidere de tab
    await page.goto("https://www.google.com/"); //Navigare pe pagina google.com

    //get title assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');


})