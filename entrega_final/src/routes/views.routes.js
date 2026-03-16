import express from 'express';
import Product from '../models/products.model.js';

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {

     try {
       const { limit = 10, page = 1, searchByCategory = "all" } = req.query;
       let data;
       
       if(searchByCategory == 'all'){
        data = await Product.paginate(
          {},
          { limit, page, lean: true },
        );
       }else{
        data = await Product.paginate(
          { category: [searchByCategory] },
          { limit, page, lean: true },
        );
       }

       let products = data.docs;
       delete(data.docs);

       const links = [];

       for(let page = 1; page <= data.totalPages; page++){
        links.push({link: `?limit=10&page=${page}`, text: `${page}`})
       }

       const categories = [];

       const allCategories = await Product.find().select("category").lean();

       allCategories.map(product => {
        if(!categories.includes(product.category)) categories.push(product.category)
       })
        
       products = {payload: products, ...data, links, categories: categories };

       res.render("home", {products});
     } catch (error) {
       console.log(`Error al recuperar los productos (${error})`);
     }
})

export default viewsRouter;