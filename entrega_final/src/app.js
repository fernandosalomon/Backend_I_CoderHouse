//dotenv config
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

//Path config
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Express config
import express from "express";
const app = express();

//Socket.io config
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server);

//MongoDB config
import mongoConnect from "./configs/db.config.js";
mongoConnect();
import Product from "./models/products.model.js";
import Cart from "./models/cart.model.js";

//Router
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";

//Server config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Handlebars config
import handlebars from "express-handlebars";
app.engine(
  "handlebars",
  handlebars.engine({
    helpers: {
      json: (context) => JSON.stringify(context),
    },
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//Endpoints
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//Socket.io
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("new product", async (productData) => {
    try {
      const addedProduct = await Product.create(productData);

      io.emit("added product", addedProduct);
    } catch (error) {
      console.error(error.message);
    }
  });

  socket.on("update product", async (productData) => {
    try {
      const {_id, ...updateProductData} = productData
        
      const updatedProduct = await Product.findByIdAndUpdate(_id, updateProductData,  {
        returnDocument : "after",
        runValidators: true
      });
      
      io.emit("updated product", updatedProduct);
    } catch (error) {
      console.error(error.message);
    }
  });

  socket.on("delete product", async ({ productID }) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productID);

      io.emit("deleted product", { productID });
    } catch (error) {
      console.error(error.message);
    }
  });

  socket.on("change cart", async (cartID) => {
    try {
      const cartData = await Cart.findById(cartID).populate("products.product").lean();

      if (!cartData) {
        throw new Error("Carrito no encontrado");
      }

      io.emit("found cart", cartData);
    } catch (error) {
      console.error(error.message);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
