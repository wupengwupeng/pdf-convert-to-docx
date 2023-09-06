"use strict";

const path = require("path");
const fs = require("fs").promises;

const libre = require("./libreOffice");
libre.convertAsync = require("util").promisify(libre.convert);

async function main() {
  const ext = ".pdf";
  const inputPath = path.join(__dirname, "/resources/example.docx");
  const outputPath = path.join(__dirname, `/resources/example${ext}`);

  // Read file
  const docxBuf = await fs.readFile(inputPath);
  console.log(docxBuf, "docxBuf");
  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  let pdfBuf = await libre.convertAsync(docxBuf, ext);
  // Here in done you have pdf file which you can save or transfer in another stream
  await fs.writeFile(outputPath, pdfBuf);
}

main().catch(function (err) {
  console.log(`Error converting file: ${err}`);
});
