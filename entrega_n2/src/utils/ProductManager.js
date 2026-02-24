const fs = require('fs');

class ProductManager{
    constructor(path){
        try{
            this.path = this.createJSON(path);
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
            return path;
        }
    }

    async getAllProducts(){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }catch(error){
            throw new Error(`Error al leer el archivo de productos: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
          const data = await fs.promises.readFile(this.path, "utf-8");
          const products = JSON.parse(data);
          const product = products.find((product) => product.id == id);
    
          if (!product) {
            throw Error("Producto no encontrado.")
          } else {
            return product;
          }
        }catch (error) {
          throw new Error(`Error al obtener los datos del producto: ${error.message}`)
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
             throw new Error("Faltan datos del nuevo producto.")
            }
      
            const products = await this.getAllProducts();

            let id;
            if(products.length === 0){
                id = 1;
            }else{
                id = products[products.length - 1].id + 1;
            }
      
            const createdProduct = {id: id, ...newProduct} 
               
            await fs.promises.writeFile(
              this.path,
              JSON.stringify([...products, createdProduct])
            );
      
            this.current_id += 1;
      
            return createdProduct;
          }catch (error) {
            throw new Error(`No se pudo agregar el nuevo producto: ${error.message}`);
          }
    }
      
    async updateProduct(id, updatedProduct) {
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
            const IsValidObject = Object.keys(updatedProduct).every((key) =>
              validKeys.includes(key)
            );
            if (!IsValidObject) {
              throw new Error(
                "Uno o más campos del producto no corresponden a campos validos de productos."
              );
            }
            
            const data = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(data);
            const indexOfProduct = products.findIndex((product) => product.id == id);
      
            if (indexOfProduct == -1) throw new Error("Producto no encontrado.");
      
            products[indexOfProduct] = {
              ...products[indexOfProduct],
              ...updatedProduct,
            };
      
            await fs.promises.writeFile(this.path, JSON.stringify(products));
      
            return products[indexOfProduct];
          } catch (error) {
            throw new Error(`Error al modificar el producto. ${error}`);
          }
    }
      
    async deleteProduct(id) {
        try {
            const products = await this.getAllProducts();

            const indexOfProduct = products.findIndex(
              (product) => product.id === Number(id)
            );
      
            if (indexOfProduct === -1) throw new Error("Producto no encontrado.");
      
            const updatedProductList = products.filter(
              (product) => product.id !== Number(id)
            );
      
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProductList));
      
            return products[indexOfProduct];
          } catch (error) {
            throw new Error(`Error al eliminar el producto. ${error}`);
          }
    }
}

module.exports = ProductManager;