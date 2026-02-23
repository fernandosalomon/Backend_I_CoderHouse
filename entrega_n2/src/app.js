const express = require("express");
const app = express();
PORT = 3030;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
