const fs = require("fs");
const join = require("path").join;
const util = require("util");
const exec = util.promisify(require("child_process").exec);

let filename = [];
let success = 0;
let fail = 0;
let exists = 0;
let text = "序号\t文件名\t状态\n";
async function init(path) {
  console.log(path, "path");
  getFileName(path);
  console.log("转换开始...");
  for (let i = 0; i < filename.length; i++) {
    let sourcePath = (filename[i].path + "/" + filename[i].name).replace(
      "\\",
      "/"
    );
    let pdfPath = `${sourcePath.split(".")[0]}.pdf`;
    let dir = filename[i].path.replace("\\", "/");
    let isExists = fs.existsSync(pdfPath);
    if (isExists) {
      exists++;
      text = `${text}${i + 1}\t${sourcePath}\t已存在\n`;
      console.log(
        `${sourcePath}  转换成功（共${filename.length}个文件，${success}成功，${exists}存在，${fail}失败） `
      );
    } else {
      const data = await wordToPdf(sourcePath, dir);
      if (data) {
        text = `${text}${i + 1}\t${sourcePath}\t成功\n`;
        success++;
      } else {
        text = `${text}${i + 1}\t${sourcePath}\t失败\n`;
        fail++;
      }
      console.log(
        `${sourcePath}  转换成功（共${filename.length}个文件，${success}成功，${exists}存在，${fail}失败） `
      );
    }
  }
  text = `${text}统计\t共${filename.length}个文件，${success}成功，${exists}存在，${fail}失败`;
  fs.writeFileSync(`./${getLogName()}.txt`, text);
}

function getFileName(path) {
  const files = fs.readdirSync(path);
  files.forEach((item) => {
    let fPath = join(path, item);
    let stat = fs.statSync(fPath);
    if (stat.isDirectory()) {
      getFileName(fPath);
      return true;
    }
    if (!stat.isFile()) {
      return false;
    }
    let suffix = item.split(".")[1].toLowerCase();
    if (!(suffix === "docx" || suffix === "doc")) {
      return false;
    }
    filename.push({
      path: path,
      name: item,
    });
  });
}

async function wordToPdf(wordPath, pdfPath) {
  const { stderr } = await exec(
    "soffice --headless --convert-to pdf --outdir " + pdfPath + " " + wordPath
  );
  if (stderr === "") {
    return true;
  } else {
    return false;
  }
}

function getLogName() {
  let d = new Date();
  return `${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;
}

init("./resources");
