const express = require("express");
const ProductManager = require("../utils/ProductManager");
const pm = new ProductManager("./src/data/products.json");

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const result = await pm.getAllProducts();
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

productsRouter.get("/:id", async (req, res) => {
  const result = await pm.getProductById(req.params.id);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

productsRouter.post("/", async (req, res) => {
  const result = await pm.addProduct(req.body);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

productsRouter.put("/:id", async (req, res) => {
  const result = await pm.updateProduct(req.params.id, req.body);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

productsRouter.delete("/:id", async (req, res) => {
  const result = await pm.deleteProduct(req.params.id);
  res
    .status(result.status)
    .send(result.status === 200 ? result.data : result.message);
});

module.exports = productsRouter;