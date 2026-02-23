const path = require("path");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
PORT = 3030;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "/views")));

app.get("/", (req, res) => {
  const test = {
    name: "Producto de prueba",
    description: "Producto de prueba",
  };

  res.render("index", test);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
