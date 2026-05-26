import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";
import { cookie } from "express-validator";

const app = express();

//Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

//Habilitar Cookie Parser
app.use(cookieParser());

//Activa CSRF
app.use(csrf({ cookie: true }));

//Conexion a DB
try {
  await db.authenticate();
  db.sync();
  console.log("Conexion exitosa a BD");
} catch (error) {
  console.log("Error", error);
}

//Habilita lectura de datos formulario
app.use(express.urlencoded({ extended: true }));

//Habilitar PUG
app.set("view engine", "pug");
app.set("views", "./views");

//Carpeta publica
app.use(express.static("public"));

//Routing
app.use("/auth", usuarioRoutes);

// Puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
