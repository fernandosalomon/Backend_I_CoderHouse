import express from 'express';
const server = express();

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

server.use(express.json());


server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})