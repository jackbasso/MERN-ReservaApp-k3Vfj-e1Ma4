import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'; // pasar cookies con el token
import authRoute from "./routes/auths.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";


const app = express()

dotenv.config(); //carga mis variables de entorno del .env

//Mongoose
const connect = async () => {
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("Conectado a mongoDB")
  } catch (error) { 
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB desconectado")
})

//middlewares
app.use(express.json()); //El middleware app.use() se utiliza básicamente para definir el controlador de la solicitud particular realizada por el cliente. Esto es importante para poder enviar los post a la bd
app.use(cookieParser()); //pasar cookies con el token
//middlewares bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor. Es inevitable utilizar middlewares en una aplicación en Node.
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

//app.use((req, res, next) => {// se usa en las rutas next le dice a la aplicación que ejecute el próximo middleware e interrumpe el middleware q este corriendo y salta al siguiente con "next".
 // console.log("Hola soy el Next middleware")
//})

// Mi error handler
app.use((err, req, res, next) => { // este middleware se usa para manejar los errores de otra forma; importante mantener el orden de los parámetros
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Algo salió mal!"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack: err.stack,
  });
});

// backend connection
app.listen(8800, () => {
  connect() // conexion con la bd. Si no hay el erro me aparecerá en la conexión de la api
  console.log("Conectado al backend")
});