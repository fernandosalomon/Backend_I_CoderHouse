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
mongoConnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.json());
server.engine("handlebars", handlebars.engine());
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "views"));

//Endpoints

server.get("/", viewsRouter);

server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
