import express from "express";
import {
  formularioForgotPassword,
  formularioLogin,
  formularioRegistro,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.get("/forgot-password", formularioForgotPassword);

export default router;
