const fs = require('fs');

class ProductManager{
    constructor(path){
        let last_id = this.getLastID();
        try{
            this.path = createJSON(path);
            if(!this.path){
                throw `Error al intentar acceder a la ruta ${path}`;
            }
        }catch(error){
            console.error(`Hubo un error con el archivo ${path}`, error);
        }
    }

    createJSON(path) {
        if (!fs.existsSync(path)) {
          try{
            fs.writeFile(path, JSON.stringify([]));
            return path;
          }catch(error){
            console.error("No se pudo crear el archivo JSON.", error);
            return null;
          }
        }else{
            console.log("El archivo JSON ya existe. No se hace nada...")
            return path;
        }
    }

    async getLastID() {
        if (fs.existsSync(this.path)) {
          const data = await fs.promises.readFile(this.path, "utf-8");
          const products = JSON.parse(data);
          const last_id = products[products.length - 1].id;
          return last_id;
        } else {
          return 1;
        }
    }

    async getAllProducts(){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return {
              data: products,
              status: 200,
              message: "Datos de productos recuperados con exito.",
            };
        }catch(error){
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
          const data = await fs.promises.readFile(this.path, "utf-8");
          const products = JSON.parse(data);
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
        }catch (error) {
          console.error("Error al recuperar los datos de los productos.", error);
          return {
            data: null,
            status: 500,
            message: `Error al recuperar los datos de los productos. ${error}.`,
          };
        }
    }

    async addProduct(newProduct) {
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
              id: this.current_id + 1,
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
      
            this.current_id += 1;
      
            return {
              data: newProduct,
              status: 201,
              message: "El producto fue creado con exito.",
            };
          }catch (error) {
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