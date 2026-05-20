import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

//Habilitar PUG
app.set("view engine", "pug");
app.set("views", "./views");

//Carpeta publica

app.use(express.static("public"));

//Routing
app.use("/auth", usuarioRoutes);

// Puerto
const port = 3000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
