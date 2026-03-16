import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const server = express();
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

import mongoConnect from "./configs/db.config.js";
import productRouter from "./routes/products.routes.js";
mongoConnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

server.engine("handlebars", handlebars.engine());
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "views"));

//Endpoints

server.use("/api/products", productRouter);
server.use("/", viewsRouter);

server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
