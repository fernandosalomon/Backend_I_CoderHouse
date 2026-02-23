const path = require("path");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const productsRouter = require('./routes/products.router');
const viewsRouter = require('./routes/views.router');

PORT = 3030;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use('/api/products', productsRouter);
app.use('/', viewsRouter);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
