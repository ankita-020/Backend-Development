import express from "express";
import path from "path";
import { fileURLToPath } from "url";

let data = "Initial data";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getData", (req, res) => {
  res.send({ data });
});

// Use put/patch
app.get("/updateData", (req, res) => {
  data = "Updated data";
  res.send({ data });
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
