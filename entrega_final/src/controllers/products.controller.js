import Product from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {

    const {limit = 10, page = 1} = req.query;

    const data = await Product.paginate({}, { limit, page });

    const products = data.docs;
    delete(data.docs);

    if (!products)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: products, ...data });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: `Error al recuperar los productos (${error})`,
      });
  }
};

export const getProductByID = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await Product.findById(pid).lean();

    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error al recuperar los productos (${error})`,
    });
  }
};

export const addNewProduct = async (req, res) => {
  try {
    const productData = req.body;
    const createdProduct = await Product.create(productData);
    res.status(201).json({status: "success", payload: createdProduct});
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error al agregar el producto (${error})`,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const productNewData = req.body;
 
    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      productNewData,
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedProduct)
      res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({status: "success", payload: updatedProduct});

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error al modificar el producto (${error})`,
    });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await Product.findByIdAndDelete(pid);

    if(!deleteProduct) res.status(404).json({status: "error", message: "Producto no encontrado"})

    res.status(200).json({status: "success", payload: deletedProduct});
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error al eliminar el producto (${error})`,
    });
  }
}
