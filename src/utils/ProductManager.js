const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.createJSON();
  }

  createJSON() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return {
          data: JSON.parse(data),
          status: 200,
          message: "Datos de productos recuperados con exito.",
        };
      } else {
        return {
          data: JSON.parse([]),
          status: 200,
          message: "Datos de productos recuperados con exito.",
        };
      }
    } catch (error) {
      console.error("Error al recuperar los datos de los productos.", error);
      return {
        data: null,
        status: 500,
        message: `Error al recuperar los datos de los productos. ${error}.`,
      };
    }
  }

  async getProductById(id) {
    try {
      const products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const productById = products.find((product) => product.id == id);

      if (!productById) {
        return {
          data: null,
          status: 400,
          message: "Producto no encontrado.",
        };
      } else {
        return {
          data: productById,
          status: 200,
          message: "Producto encontrado.",
        };
      }
    } catch (error) {
      console.error("Error al recuperar los datos de los productos.", error);
      return {
        data: null,
        status: 500,
        message: `Error al recuperar los datos de los productos. ${error}.`,
      };
    }
  }

  async addProduct(newProduct) {
    console.log(newProduct);
    try {
      //Se comprueba si faltan datos del nuevo producto. En caso afirmativo se lanza un error.
      if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.thumbnails ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.category ||
        !newProduct.status
      ) {
        return {
          data: null,
          status: 400,
          message: "Faltan campos por completar.",
        };
      }

      const products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );

      const productToAppend = {
        id: products.length + 1,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        thumbnails: newProduct.thumbnails,
        code: newProduct.code,
        stock: newProduct.stock,
        category: newProduct.category,
        status: newProduct.status,
      };

      await fs.promises.writeFile(
        this.path,
        JSON.stringify([...products, productToAppend])
      );
      return {
        data: newProduct,
        status: 201,
        message: "El producto fue creado con exito.",
      };
    } catch (error) {
      console.error("Error al crear el nuevo producto", error);
      return {
        data: null,
        status: 500,
        message: `Error al crear el nuevo producto. ${error}.`,
      };
    }
  }

  async updateProduct(id, newProductData) {
    //Comprobar si el objeto newProductData contiene keys validas. En caso contrario devuelve error.
    const validKeys = [
      "title",
      "description",
      "price",
      "thumbnails",
      "code",
      "stock",
      "category",
      "status",
    ];

    try {
      const IsValidObject = Object.keys(newProductData).every((key) =>
        validKeys.includes(key)
      );
      if (!IsValidObject) {
        return {
          data: null,
          status: 400,
          message:
            "Uno o más campos del producto no corresponden a campos validos de productos.",
        };
      }

      const products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const indexOfProduct = products.findIndex((product) => product.id == id);

      if (indexOfProduct == -1) {
        return {
          data: null,
          status: 400,
          message: "Producto no encontrado.",
        };
      }

      products[indexOfProduct] = {
        ...products[indexOfProduct],
        ...newProductData,
      };

      await fs.promises.writeFile(this.path, JSON.stringify(products));

      return {
        data: newProductData,
        status: 200,
        message: "Producto modificado con exito.",
      };
    } catch (error) {
      console.error("Error al modificar el producto.", error);
      return {
        data: null,
        status: 500,
        message: `Error al modificar el producto. ${error}`,
      };
    }
  }

  async deleteProduct(id) {
    try {
      const products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const indexOfProduct = products.findIndex(
        (product) => product.id === Number(id)
      );

      if (indexOfProduct === -1) {
        return {
          data: null,
          status: 400,
          message: "Producto no encontrado.",
        };
      }

      const newProductList = products.filter(
        (product) => product.id !== Number(id)
      );

      await fs.promises.writeFile(this.path, JSON.stringify(newProductList));

      return {
        data: products[indexOfProduct],
        status: 200,
        message: "Producto eliminado con exito.",
      };
    } catch (error) {
      console.error("Error al eliminar el producto.", error);
      return {
        data: null,
        status: 500,
        message: `"Error al eliminar el producto. ${error}`,
      };
    }
  }
}

module.exports = ProductManager;
