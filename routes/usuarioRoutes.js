import express from "express";
import {
  formularioForgotPassword,
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
  autenticar,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.post("/login", autenticar);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/confirmar/:token", confirmar);
router.get("/forgot-password", formularioForgotPassword);
router.post("/forgot-password", resetPassword);

//Guarda la nueva contraseña
router.get("/forgot-password/:token", comprobarToken);
router.post("/forgot-password/:token", nuevoPassword);

export default router;
