const { exec } = require("child_process");

// 输入的 PDF 文件路径和输出的 Word 文件路径
const pdfFilePath = "./resources/example.pdf";
const outputFilePath = "./work/example.docx";

// 使用 LibreOffice 命令行进行转换
const command = `soffice --headless --convert-to doc --outdir ${outputFilePath} ${pdfFilePath}`;

async function exportWord() {
  const { stderr } = await exec(command);
  if (stderr === "") {
    return true;
  } else {
    return false;
  }
}
exportWord();
// exec(command, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error}`);
//     return;
//   }
//   console.log(`Conversion successful`);
// });
