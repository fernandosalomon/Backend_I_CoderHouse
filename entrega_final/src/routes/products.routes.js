import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
} from "../controllers/products.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:pid", getProductByID);
productRouter.post("/", addNewProduct);
productRouter.put("/:pid", updateProduct);
productRouter.delete("/:pid", deleteProduct);

export default productRouter;
