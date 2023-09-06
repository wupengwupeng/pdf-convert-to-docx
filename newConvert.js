const express = require("express");
const multer = require("multer");
const { PythonShell } = require("python-shell");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const name = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, Date.now() + "-" + name);
  },
});

let upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/convert", upload.single("inputPdf"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
    return;
  }
  const pyshell = new PythonShell("newConvert.py", {
    mode: "text",
    pythonPath: "python",
    scriptPath: __dirname,
    args: [req.file.path],
  });
  pyshell.on("message", (mes) => {
    console.log(mes);
  });
  pyshell.on("error", (mes) => {
    console.log(mes);
    res.status(500).send("An error occurent");
  });
  pyshell.end((err) => {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    const docxFilePath = req.file.path.replace(".pdf", ".docx");
    res.download(docxFilePath, req.originalname, (downloadError) => {});
  });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
