import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const mongoConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.log(`Error al conectar con la base de datos (${error})`);
  }
};

export default mongoConnect;
