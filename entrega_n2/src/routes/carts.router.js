const express = require("express");
const CartManager = require("../utils/CartManager");
const cm = new CartManager("./src/data/carrito.json");

const cartsRouter = express.Router();

cartsRouter.post("/", async (req, res) => {
  const result = await cm.createCart();
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

cartsRouter.get("/:cid", async (req, res) => {
  const result = await cm.getProductsFromCart(req.params.cid);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const result = await cm.addProductToCart(req.params.cid, req.params.pid);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

module.exports = cartsRouter;