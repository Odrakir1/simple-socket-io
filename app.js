const express = require("express");
const http = require("http");
let socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);



const server = http.createServer(app);


const io = socketIo(server, {
    cors: {
      origin: '*',
    }
  });


let interval;
let count = 0;


io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  
  let newEvent = {
    type: `${count}Acesso indevido`,
    description: "O Equipamento 3E78...",
    receivement: response
  }

  count++;
  socket.emit("newUser", newEvent);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

#testing git config