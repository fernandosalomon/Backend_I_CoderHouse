const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());

const ProductManager = require("./utils/ProductManager");
const pm = new ProductManager("./src/database/productos.json");

const CartManager = require("./utils/CartManager");
const cm = new CartManager("./src/database/carrito.json");

// Endpoints para productos

app.get("/api/products", async (req, res) => {
  const result = await pm.getProducts();
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

app.get("/api/products/:id", async (req, res) => {
  const result = await pm.getProductById(req.params.id);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

app.post("/api/products", async (req, res) => {
  const result = await pm.addProduct(req.body);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

app.put("/api/products/:id", async (req, res) => {
  const result = await pm.updateProduct(req.params.id, req.body);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

app.delete("/api/products/:id", async (req, res) => {
  const result = await pm.deleteProduct(req.params.id);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

// Endpoints de carritos

app.post("/api/carts/", async (req, res) => {
  const result = await cm.createCart();
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

app.get("/api/carts/:cid", async (req, res) => {
  const result = await cm.getProductsFromCart(req.params.cid);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
  const result = await cm.addProductToCart(req.params.cid, req.params.pid);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto", PORT);
});
