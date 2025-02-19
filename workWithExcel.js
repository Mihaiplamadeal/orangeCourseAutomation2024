const ExcelJS = require("exceljs");

async function excelTestsync() {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile("./download.xlsx").then(() => {
    const worksheet = workbook.getWorksheet("Sheet1");
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        console.log(cell.value);
      });
    });
  });
}

async function excelTest() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./download.xlsx");
  const worksheet = workbook.getWorksheet("Sheet1");
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(cell.value);
    });
  });
}
excelTestsync();
excelTest();

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searchText);
  const cell = worksheet.getCell(
    output.row + change.rowChange,
    output.column + change.colChange
  );
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}
async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}

writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "./download.xlsx");
