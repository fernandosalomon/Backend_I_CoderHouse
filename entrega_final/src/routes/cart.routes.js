import express from "express";
import { addProductToCart, createNewCart, deleteCart, deleteProductFromCart, getCartByID, updateProductList, updateProductQuantity } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", createNewCart);
cartRouter.get("/:cid", getCartByID);
cartRouter.post("/:cid/product/:pid", addProductToCart);
cartRouter.delete("/:cid", deleteCart);
cartRouter.delete("/:cid/product/:pid", deleteProductFromCart);
cartRouter.put("/:cid/product/:pid", updateProductQuantity);
cartRouter.put("/:cid", updateProductList);

export default cartRouter;