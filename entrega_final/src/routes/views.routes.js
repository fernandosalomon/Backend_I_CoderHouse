import express from "express";
import { cartsViews, productDetailView, productsView, realTimeProductsViews } from "../controllers/views.controller.js";

const viewsRouter = express.Router();

viewsRouter.get("/products", productsView);
viewsRouter.get("/realTimeProducts", realTimeProductsViews);
viewsRouter.get("/product/:pid", productDetailView);
viewsRouter.get("/carts", cartsViews)

export default viewsRouter;
