const path = require("path");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const productsRouter = require("./routes/products.router");
const viewsRouter = require("./routes/views.router");
const cartsRouter = require("./routes/carts.router");

const ProductManager = require("./utils/ProductManager");
const productManager = new ProductManager("./src/data/products.json");

PORT = 3030;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const hbs = handlebars.create({
  helpers: {
    firstThumbnail(thumbnails){
      return thumbnails?.split(",")[0]
    }
  }
})

app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("new product", async (productData) => {
    try {
      const addedProduct = await productManager.addProduct(productData);

      io.emit("added product", addedProduct);
    } catch (error) {
      console.error(error.message);
    }
  });

  socket.on("delete product", async ({ productID }) => {
    try {
      const deletedProduct = await productManager.deleteProduct(productID);

      io.emit("deleted product", { productID });
    } catch (error) {
      console.error(error.message);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
