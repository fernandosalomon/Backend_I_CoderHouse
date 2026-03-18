import Product from "../models/products.model.js";
import Cart from "../models/cart.model.js";

export const productsView = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchByCategory, sort, filter } = req.query;

    const query = {};

    if (filter) {
      query.$or = [
        { title: { $regex: filter, $options: "i" } },
        { description: { $regex: filter, $options: "i" } },
      ];
    }

    if (searchByCategory) {
      query.category = searchByCategory;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true,
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? -1 : 1 };
    }

    const data = await Product.paginate(query, options);

    let products = data.docs;
    delete data.docs;

    const links = [];

    for (let p = 1; p <= data.totalPages; p++) {
      links.push({ link: `?limit=10&page=${p}`, text: `${p}` });
    }

    const categories = [];

    const allCategories = await Product.find().select("category").lean();

    allCategories.map((product) => {
      if (!categories.includes(product.category))
        categories.push(product.category);
    });

    products = { payload: products, ...data, links, categories: categories };

    res.render("products", { products });
  } catch (error) {
    console.log(`Error al recuperar los productos (${error})`);
  }
};

export const realTimeProductsViews = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchByCategory, sort, filter } = req.query;

    const query = {};

    if (filter) {
      query.$or = [
        { title: { $regex: filter, $options: "i" } },
        { description: { $regex: filter, $options: "i" } },
      ];
    }

    if (searchByCategory) {
      query.category = searchByCategory;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true,
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? -1 : 1 };
    }

    const data = await Product.paginate(query, options);

    let products = data.docs;
    delete data.docs;

    const links = [];

    for (let p = 1; p <= data.totalPages; p++) {
      links.push({ link: `?limit=10&page=${p}`, text: `${p}` });
    }

    const categories = [];

    const allCategories = await Product.find().select("category").lean();

    allCategories.map((product) => {
      if (!categories.includes(product.category))
        categories.push(product.category);
    });

    products = { payload: products, ...data, links, categories: categories };

    res.render("realTimeProducts", { products });
  } catch (error) {
    console.log(`Error al recuperar los productos (${error})`);
  }
};

export const productDetailView = async (req, res) => {
  try {
    const pid = req.params.pid;
    const productData = await Product.findById(pid).lean();

    const cartList = await Cart.find().lean();
    
    if (!productData)
      res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.render("productInformation", { productData, cartList });
  } catch (error) {
    console.log(`Error al recuperar los productos (${error})`);
  }
};

export const cartsViews = async (req, res) => {
  try {
    const carts = await Cart.find().populate("products.product").lean();

    const { cartID } = req.query;

    const cartIndex = carts.findIndex((cart) => cart._id == cartID);

    if (cartIndex == -1) res.render("carts", { carts });

    const cartProducts = carts[cartIndex].products;
    let totalToPay = 0;

    cartProducts.forEach((product, index) => {
      cartProducts[index].subtotal = (
        product.product.price * product.quantity
      ).toFixed(2);
      totalToPay += product.product.price * product.quantity;
    });

    cartProducts["totalToPay"] = Number(totalToPay).toFixed(2);

     res.render("carts", { carts, cartProducts });
  } catch (error) {
    console.log(`Error al recuperar los productos (${error})`);
  }
};