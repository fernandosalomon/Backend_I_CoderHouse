# Entrega N° 1 - Curso Desarrollo Backend I - CoderHouse
**Autor:** Fernando F. Salomón  
🔗 GitHub: https://github.com/fernandosalomon 

## Descripción General
Desarrollar un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra para tu API.

El servidor está basado en Node.js y Express. Contiene dos grupos de rutas: /products y /carts.

## Estructura general del proyecto
```text
Backend_I_CH/
├── src/
│   ├── index.js              # Configuración principal de Express
│   ├── database/             # Persistencia en archivos
│   │   ├── products.json
│   │   └── carts.json
│   └── utils/                # Utilidades generales
│       ├── ProductManager.js
│       └── CartManager.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Rutas para Manejo de Productos (/api/products/)

+ `GET /`: Lista todos los productos.
+ `GET /:pid`: Lista solo el producto con el **id** proporcionado.
+ `POST /`: Agrega un nuevo producto con los siguientes campos:
    + `id`: Number/String (*Autogenerado a partir del último id*)
    + `title`: String
    + `description`: String
    + `code`: String
    + `price`: Number
    + `status`: Boolean
    + `stock`: Number
    + `category`: String
    + `thumbnails`: Array de Strings (rutas donde están almacenadas las imágenes del producto).

+ `PUT /:pid`: Actualiza un producto con el **pid** por los campos enviados desde el body. 
+ `DELETE /:pid`: Eliminar el producto con el **pid** indicado.

## Rutas para Manejo de Carritos (/api/carts/)

+ `POST /`: Crea un nuevo carrito con la siguiente estructura:
    + `id`: Number/String (*Autogenerado*).
    + `products`: Array que contiene objetos que representan cada producto.

+ `GET /:cid`: Lista los productos que pertenecen al carrito con el **cid** proporcionado.
+ `POST /:cid/product/:pid`: Agrega el producto con el **pid** proporcionado al arreglo products del carrito con el **cid** proporcionado, con la siguiente estructura:
    + `product`: ID del producto.
    + `quantity`: Contiene el número de ejemplares de dicho producto (Si se intenta agregar un producto ya existente, el valor de `quantity` se aumenta en 1).

## Persistencia de la Información
Los datos se guardan utilizando un sistema de archivos en el directorio `/src/database`: products.json y carts.json, para los productos y los carritos, respectivamente.

## Otros puntos
+ Los *ids* se generan de modo consecutivo (de uno en uno) siguiendo el último *id* generado. Es decir, aunque se elimine el producto con `id = 32`, el siguiente producto se agrega con `id = 33`. Esto permite que si en algún otro lado del servidor, queda guardado un registro con un producto eliminado, no haya conflicto con los nuevos productos.

## 🚀 Requisitos
- Node.js (>= 14)
- NPM

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/fernandosalomon/Backend_I_CH.git
cd Backend_I_CH
npm install
```

## Uso
Para iniciar en modo desarrollo (`dev`)
```bash
npm run dev
```



