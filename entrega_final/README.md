# Entrega Final - Curso Desarrollo Backend I - CoderHouse
**Autor:** Fernando F. Salomón  
🔗 GitHub: https://github.com/fernandosalomon 

## Descripción General
El proyecto consiste en el desarrollo de un servidor backend para una API de e-commerce, cuyo objetivo es la gestión de productos y carritos de compra. La solución incorpora tanto comunicación HTTP tradicional basada en REST como actualizaciones en tiempo real mediante WebSockets.

El servidor está desarrollado con Node.js y Express. El proyecto utiliza Handlebars como motor de plantillas para la renderización de vistas dinámicas del lado del servidor, y Socket.io para habilitar comunicación bidireccional en tiempo real entre cliente y servidor.

Los datos se almacenan utilizando la base de datos NoSQL MongoDB.

## Estructura general del proyecto
```text
entrega_final
├─ .env
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  └─ style.css
│  ├─ img
│  │  └─ default_product.png
│  └─ js
│     ├─ cart.js
│     ├─ client.js
│     ├─ product.js
│     └─ query.js
└─ src
   ├─ app.js
   ├─ configs
   │  └─ db.config.js
   ├─ controllers
   │  ├─ cart.controller.js
   │  ├─ products.controller.js
   │  └─ views.controller.js
   ├─ models
   │  ├─ cart.model.js
   │  └─ products.model.js
   ├─ routes
   │  ├─ cart.routes.js
   │  ├─ products.routes.js
   │  └─ views.routes.js
   └─ views
      ├─ carts.handlebars
      ├─ layouts
      │  └─ main.handlebars
      ├─ productInformation.handlebars
      ├─ products.handlebars
      └─ realTimeProducts.handlebars
```

## 🚀 Requisitos
- Node.js (>= 14)
- NPM
- Handlebars
- Socket.io
- MongoDB
- File System (fs)

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/fernandosalomon/Backend_I_CoderHouse/tree/main/entrega_final
cd entrega_final
npm install
```

## Uso
Para iniciar en modo desarrollo (`dev`)
```bash
npm run dev
```