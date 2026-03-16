import express from 'express';
import Product from '../models/products.model.js';

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {

    try {
        const products = await Product.find().lean();
        res.render("home", { products });
    } catch (error) {
        console.log(`Error al recuperar los productos (${error})`);
    }
})

export default viewsRouter;