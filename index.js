import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express()

dotenv.config() //carga mis variables de entorno del .env

//Mongoose
const connect = async () => {
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("Conectado a mongoDB")
  } catch (error) {
    throw(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB desconectado")
})


// backend connection
app.listen(8800, () => {
  connect() // conexion con la bd. Si no hay el erro me aparecerá en la conexión de la api
  console.log("Conectado al backend")
})