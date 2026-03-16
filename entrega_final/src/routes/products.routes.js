import express from "express";
import {
  getAllProducts,
  getProductByID,
} from "../controllers/products.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:pid", getProductByID);

export default productRouter;
