import express from "express";
import path from "path";
import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("chat message", (msg) => {
    console.log("Message received is ", msg);

    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 5011;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
