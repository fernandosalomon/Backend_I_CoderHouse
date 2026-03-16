import Router from "express";
import {
  getAllProducts,
  getProductByID,
} from "../controllers/products.controller.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:pid", getProductByID);

export default productRouter;
