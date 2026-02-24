const express = require('express');

const viewsRouter = express.Router();

const ProductManager = require('../utils/ProductManager');
const productManager = new ProductManager('./src/data/products.json');

viewsRouter.get("/", async (req, res) => {

    try {
        const products = await productManager.getAllProducts();
        res.render('home', { products });
    } catch (error) {
        res.status(500).send({message: error.message})
    }

})

module.exports = viewsRouter;