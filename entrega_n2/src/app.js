const path = require("path");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const productsRouter = require('./routes/products.router');
const viewsRouter = require('./routes/views.router');
const cartsRouter = require("./routes/carts.router");

PORT = 3030;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
