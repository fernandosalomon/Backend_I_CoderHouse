import express from 'express';
import Product from '../models/products.model.js';

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {

     try {
       const { limit = 10, page = 1 } = req.query;
       const data = await Product.paginate({}, { limit, page, lean: true });
    
       let products = data.docs;
       delete(data.docs);

       const links = [];

       for(let page = 1; page <= data.totalPages; page++){
        links.push({link: `?limit=10&page=${page}`, text: `${page}`})
       }

       products = {payload: products, ...data, links };

       res.render("home", {products});
     } catch (error) {
       console.log(`Error al recuperar los productos (${error})`);
     }
})

export default viewsRouter;