import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";


export const createNewCart = async (req, res) => {
  try {
    const createdCart = Cart.create({ products: [] });
    res.status(201).json({ status: "success", payload: createdCart });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al crear el carrito" });
  }
};

export const getCartByID = async (req, res) => {
  try {
    const cid = req.params.cid;

    const cartData = Cart.findById(cid).lean();
    if (!cartData)
      res
        .status(400)
        .json({ status: "error", message: "Carrito no encontrado" });

    res.status(200).json({ status: "success", payload: cartData });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al recuperar el carrito" });
  }
};

export const addProductToCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const { quantity } = req.body;

        const productData = await Product.findById(pid);
        if(!productData) res.status(404).json({status: "error", message: "Producto no encontrado"});

        const cartData = await Cart.findById(cid);
        if(!cartData) res.status(404).json({status: "error", message: "Carrito no encontrado"});

        const productIndex = cartData.products.findIndex(product => product.product == pid);

        if ( productIndex == -1){
            cartData.products.push({product: new mongoose.Types.ObjectId(pid), quantity: quantity})
        }else{
            cartData.products[productIndex].quantity += quantity;
        }

        const addedProduct = await cartData.save({returnDocument: "after", runValidators: true});

        res.status(201).json({status: "success", payload: addedProduct});

    } catch (error) {
        res
          .status(500)
          .json({ status: "error", message: `Error al agregar el producto en el carrito (${error})` });
    }
}
