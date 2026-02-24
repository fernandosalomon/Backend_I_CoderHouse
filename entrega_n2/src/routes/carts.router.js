const express = require("express");
const CartManager = require("../utils/CartManager");
const cartManager = new CartManager("./src/data/carrito.json");

const cartsRouter = express.Router();

cartsRouter.post("/", async (req, res) => {
    try {
      const newCart = await cartManager.createCart();
      res.status(200).send(newCart);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const products = await cartManager.getProductsFromCart(req.params.cid);
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const newProduct = await cartManager.addProductToCart(
          req.params.cid,
          req.params.pid,
        );
        res.status(200).send(newProduct);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = cartsRouter;