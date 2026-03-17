import express from "express";
import { addProductToCart, createNewCart, deleteCart, deleteProductFromCart, getCartByID } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", createNewCart);
cartRouter.get("/:cid", getCartByID);
cartRouter.post("/:cid/product/:pid", addProductToCart);
cartRouter.delete("/:cid", deleteCart);
cartRouter.delete("/:cid/product/:pid", deleteProductFromCart);


export default cartRouter;