import express from "express";
import path from "path";
import { fileURLToPath } from "url";

let data = "Initial data";
const waitingClientsList = [];

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getData", (req, res) => {
  if (data !== req.query.lastData) {
    res.json({ data });
  } else {
    waitingClientsList.push(res);
  }
});

// Use put/patch
app.get("/updateData", (req, res) => {
  data = req.query.data;

  while (waitingClientsList.length > 0) {
    let client = waitingClientsList.pop();
    client.json({ data });
  }
  res.json({ sucess: "Data updated successfully" });
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
