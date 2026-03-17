import express from "express";
import { addProductToCart, createNewCart, getCartByID } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", createNewCart);
cartRouter.get("/:cid", getCartByID);
cartRouter.post("/:cid/product/:pid", addProductToCart);


export default cartRouter;