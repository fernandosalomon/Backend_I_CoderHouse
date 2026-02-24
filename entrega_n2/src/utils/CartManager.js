const fs = require("fs");
const ProductManager = require("./ProductManager");
const productManager = new ProductManager("./src/data/products.json");

class CartManager {
  constructor(path) {
    try {
      this.path = this.createJSON(path);
      if (!this.path) {
        throw `Error al intentar acceder a la ruta ${path}`;
      }
    } catch (error) {
      console.error(`Hubo un error con el archivo ${path}`, error);
    }
  }

  createJSON(path) {
          if (!fs.existsSync(path)) {
            try{
              fs.writeFile(path, JSON.stringify([]), err => {
                if(err){
                    throw "Error al crear el archivo JSON."
                    return null;
                }else{
                    console.log("El archivo JSON se creó con exito.")
                }
              });
              return path;
            }catch(error){
              console.error("No se pudo crear el archivo JSON.", error);
              return null;
            }
          }else{
              return path;
          }
  }

  async createCart() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);

      let id;
      if(carts.length === 0){
        id = 1;
      }else{
        id = carts[carts.length - 1].id + 1;
      }

      carts.push({
        id: id,
        products: [],
      });

      await fs.promises.writeFile(this.path, JSON.stringify(carts));

      return carts[carts.length - 1];
    } catch (error) {
        throw new Error(`Error al crear un nuevo carrito. ${error}`)
    }
  }

  async getProductsFromCart(cid) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      const indexOfCart = carts.findIndex((cart) => (cart.id = cid));
      
      if (indexOfCart === -1) throw new Error("Carrito no encontrado.");
      
      return carts[cid - 1].products;

    } catch (error) {
      throw new Error(`Error al obtener los productos del carrito ${error}`);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      const cartIndex = carts.findIndex((cart) => cart.id === Number(cid));
      
      if (cartIndex === -1) throw new Error("Carrito no encontrado.");

      const product = await productManager.getProductById(pid);

      if (product.stock === 0) throw new Error(
        "El producto no tiene stock. No puede agregarse al carrito.",
      );

      if (
        carts[cartIndex].products.findIndex(
          (product) => product.productId === Number(pid),
        ) === -1
      ) {
        carts[cartIndex].products.push({
          productId: product.id,
          quantity: 1,
        });
      } else {
        const indexOfProduct = carts[cartIndex].products.findIndex(
          (product) => product.productId === Number(pid),
        );
        carts[cartIndex].products[indexOfProduct].quantity += 1;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts));

      return carts[cartIndex].products;
    } catch (error) {
      throw new Error(`Error al agregar el producto al carrito. ${error}`);
    }
  }
}

module.exports = CartManager;
