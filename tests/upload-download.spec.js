const { test, expect } = require("@playwright/test");
const { writeExcelTest } = require("./writeExcelTest");

test("Upload download excel validation", async ({ page }) => {
  const textSearch = "Mango";
  const updateValue = "350";
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromise;
  await download.saveAs("./downloads/" + download.suggestedFilename());
  await writeExcelTest(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 },
    "./downloads/download.xlsx"
  );
  await page.locator("#fileinput").setInputFiles("./downloads/download.xlsx");
  //
  test.step("validation", async () => {
    const textlocator = page.getByText(textSearch);
    const desiredRow = page.getByRole("row").filter({ has: textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(
      updateValue
    );
  });
  await page.pause();
});
