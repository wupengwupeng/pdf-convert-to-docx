const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/convert", (req, res) => {
  console.log(req, "req");
  const inputPdf = "./resources/example.pdf"; // The PDF file sent from the browser
  const outputDocx = "output.docx"; // Path to the output DOCX file
  console.log(inputPdf, "inputPdf");
  // Execute the Python script to convert PDF to DOCX
  exec(
    `python convert_main.py ${inputPdf} ${outputDocx}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      console.log(`Conversion successful: ${stdout}`);
      // Send the resulting DOCX file back to the browser for download
      res.download(outputDocx, "output.docx", (downloadError) => {
        if (downloadError) {
          console.error(`Download error: ${downloadError}`);
        }
      });
    }
  );
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
