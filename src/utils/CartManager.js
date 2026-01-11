const fs = require("fs");
const ProductManager = require("./ProductManager");
const pm = new ProductManager("./src/database/productos.json");

class CartManager {
  constructor(path) {
    this.path = path;
    this.createJSON();
  }

  createJSON() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async createCart() {
    try {
      const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      carts.push({
        id: carts.length + 1,
        products: [],
      });

      await fs.promises.writeFile(this.path, JSON.stringify(carts));

      return {
        data: carts[carts.length - 1],
        status: 201,
        message: "Carrito creado con exito.",
      };
    } catch (error) {
      console.error("Error al crear un nuevo carrito.", error);
      return {
        data: null,
        status: 500,
        message: `Error al crear un nuevo carrito. ${error}`,
      };
    }
  }

  async getProductsFromCart(cid) {
    try {
      const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      const indexOfCart = carts.findIndex((cart) => (cart.id = cid));
      if (indexOfCart === -1) {
        return {
          data: null,
          status: 400,
          message: "Carrito no encontrado.",
        };
      }
      return {
        data: carts[cid - 1].products,
        status: 200,
        message: "Productos del carrito recuperados con exito.",
      };
    } catch (error) {
      console.error("Error al obtener los productos del carrito", error);
      return {
        data: null,
        status: 500,
        message: `Error al obtener los productos del carrito ${error}`,
      };
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      const cartIndex = carts.findIndex((cart) => cart.id === Number(cid));
      if (cartIndex === -1) {
        return {
          data: null,
          status: 400,
          message: "Carrito no encontrado.",
        };
      }

      const product = await pm.getProductById(pid);

      if (product.status !== 200) {
        return {
          data: null,
          status: 400,
          message: "Producto no encontrado.",
        };
      }

      if (
        carts[cartIndex].products.findIndex(
          (product) => product.productId === Number(pid)
        ) === -1
      ) {
        carts[cartIndex].products.push({
          productId: product.data.id,
          quantity: 1,
        });
      } else {
        const indexOfProduct = carts[cartIndex].products.findIndex(
          (product) => product.productId === Number(pid)
        );
        carts[cartIndex].products[indexOfProduct].quantity += 1;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts));

      return {
        data: carts[cartIndex].products,
        status: 201,
        message: "Producto agregado con exito",
      };
    } catch (error) {
      console.error("Error al agregar el producto al carrito.", error);
      return {
        data: null,
        status: 500,
        message: `Error al agregar el producto al carrito. ${error}`,
      };
    }
  }
}

module.exports = CartManager;
