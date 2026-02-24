const express = require("express");
const ProductManager = require("../utils/ProductManager");
const productManager = new ProductManager("./src/data/products.json");

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getAllProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({message: error.message})
  }
});

productsRouter.get("/:id", async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

productsRouter.post("/", async (req, res) => {
  try {
    const addedProduct = await productManager.addProduct(req.body);
    res.status(200).send(addedProduct);
  } catch (error) {
    res.status(500).send({message: error.message})
  }
});

productsRouter.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.id, req.body);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send({message: error.message})
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try{
    const deletedProduct = await productManager.deleteProduct(req.params.id);
    res.status(200).send(deletedProduct);
  }   catch (error) {
    res.status(500).send({message: error.message})
  } 
});

module.exports = productsRouter;