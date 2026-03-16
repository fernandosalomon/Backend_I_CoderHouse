import Product from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    console.log(`Error al recuperar los productos (${error})`);
  }
};

export const getProductByID = async (req, res) => {
  const pid = req.params.pid;

  try {
    const product = await Product.findById(pid);

    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    console.log(`Error al recuperar los productos (${error})`);
  }
};
