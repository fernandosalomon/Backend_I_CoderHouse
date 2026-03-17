
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
app.engine("handlebars", handlebars.engine());
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

  socket.on("delete product", async ({ productID }) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productID);

      io.emit("deleted product", { productID });
    } catch (error) {
      console.error(error.message);
    }
  });
})

server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
