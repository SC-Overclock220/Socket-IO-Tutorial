import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
app.use(express.static(path.resolve("./public")));

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on('user-message',(message)=>{

    console.log(`New User Message ${message}`)
    io.emit('message',message)
  })
});

app.use("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(4000, () => {
  console.log(`Server Running On Port 4000`);
});
