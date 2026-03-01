# Entrega N° 2 - Curso Desarrollo Backend I - CoderHouse
**Autor:** Fernando F. Salomón  
🔗 GitHub: https://github.com/fernandosalomon 

## Descripción General
El proyecto consiste en el desarrollo de un servidor backend para una API de e-commerce, cuyo objetivo es la gestión de productos y carritos de compra. La solución incorpora tanto comunicación HTTP tradicional basada en REST como actualizaciones en tiempo real mediante WebSockets.

El servidor está desarrollado con Node.js y Express. El proyecto utiliza Handlebars como motor de plantillas para la renderización de vistas dinámicas del lado del servidor, y Socket.io para habilitar comunicación bidireccional en tiempo real entre cliente y servidor.

## Estructura general del proyecto
```text
Backend_I_CH/
├── public/
│   └── js/
│       └── client.js
├── src/
│   ├── data/                 # Persistencia basada en filesystem
│   │   ├── products.json
│   │   └── carts.json
│   ├── routes/               # Definición y configuración de rutas
│   │   ├── carts.router.js
│   │   ├── products.router.js
│   │   └── views.router.js
│   ├── utils/                # Lógica de negocio / managers
│   │   ├── ProductManager.js
│   │   └── CartManager.js
│   ├── views/                # Vistas Handlebars
│   │   ├── layouts/
│   │   │   └── main.handlebars
│   │   ├── home.handlebars
│   │   └── realTimeProducts.handlebars
│   └── app.js                # Configuración principal del servidor
├── package.json
├── README.md
└── .gitignore
```

## Rutas Handlebars

+ `/`: Renderiza una lista estática de todos los productos utilizando Handlebars.
+ `/realTimeProducts`: Renderiza la lista de productos con capacidad de alta y baja en tiempo real mediante WebSockets.

## Rutas para Manejo de Productos (/api/products/)

+ `GET /`: Retorna la lista completa de productos.
+ `GET /:pid`: Retorna el producto cuyo id coincide con el parámetro `pid`.
+ `POST /`: Crea un nuevo producto con la siguiente estructura:
    + `id`: Number (**Autogenerado a partir del último id**)
    + `title`: String
    + `description`: String
    + `code`: String
    + `price`: Number
    + `status`: Boolean
    + `stock`: Number
    + `category`: String
    + `thumbnails`: Array<String> (rutas de las imágenes del producto)

+ `PUT /:pid`: Actualiza el producto identificado por `pid` utilizando los campos enviados en el body de la request.
+ `DELETE /:pid`: Elimina el producto identificado por `pid`.

## Rutas para Manejo de Carritos (/api/carts/)

+ `POST /`: Crea un nuevo carrito con la siguiente estructura:
    + `id`: Number (**Autogenerado a partir del último id**)
    + `products`: Array de productos asociados al carrito.

+ `GET /:cid`: Retorna el listado de productos pertenecientes al carrito identificado por `cid`.
+ `POST /:cid/product/:pid`: Agrega el producto identificado por pid al carrito `cid`. La estructura del objeto agregado es:
    + `product`: ID del producto.
    + `quantity`: Cantidad de unidades del producto (Si el producto ya existe en el carrito, se incrementa `quantity` en 1).

## Persistencia de la Información
La persistencia se implementa mediante filesystem utilizando archivos JSON ubicados en `/src/data`:

+ `products.json`: almacenamiento de productos
+ `carts.json`: almacenamiento de carritos

El formato de los objetos en `productos.json` es:
+ `id`: Number
+ `title`: String
+ `description`: String
+ `code`: String
+ `price`: Number
+ `status`: Boolean
+ `stock`: Number
+ `category`: String
+ `thumbnails`: Array<String>

Estructura de carts.json
+ `id`: Number
+ `products`: Array de objetos con la siguiente estructura:
    + `productId`: Number
    + `quantity`: Number

## 🚀 Requisitos
- Node.js (>= 14)
- NPM
- Handlebars
- Socket.io
- File System (fs)

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/fernandosalomon/Backend_I_CoderHouse/tree/31eba6fa0ff3ba14686b3e829633f2ae590089c2/entrega_n2
cd Backend_I_CH
npm install
```

## Uso
Para iniciar en modo desarrollo (`dev`)
```bash
npm run dev
```



