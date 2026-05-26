import express from "express";
import {
  formularioForgotPassword,
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/forgot-password", formularioForgotPassword);
router.get("/confirmar/:token", confirmar);

export default router;
