import Usuario from "../models/Usuario.js";
import { check, validationResult } from "express-validator";
import { generatedId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";
import { where } from "sequelize";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar sesión",
  });
};

const formularioRegistro = (req, res) => {
  console.log(req.csrfToken());

  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
};

const formularioForgotPassword = (req, res) => {
  res.render("auth/forgot-password", {
    pagina: "Recupera tu acceso a Bienes Raices",
  });
};

const registrar = async (req, res) => {
  //Validacion de campos

  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede ir vacío")
    .run(req);
  await check("email")
    .notEmpty()
    .withMessage("El email no puede ir vacío")
    .isEmail()
    .withMessage("El email no es válido")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("El password no puede ir vacío")
    .isLength({ min: 6 })
    .withMessage("El password debe tener mínimo 6 caracteres")
    .run(req);
  await check("repetir_password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Los passwords deben ser iguales")
    .run(req);

  // Verificar si hay errores
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    // Si hay errores, regresa a la vista con los errores
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //Extraer datos
  const { nombre, email, password } = req.body;

  // Verificacion para  evitar duplicacion de usuario
  const existeUsuario = await Usuario.findOne({
    where: { email },
  });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El usuario ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //Almacenar usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generatedId(),
  });

  //Enviar email de confirmación
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Mostrar mensaje de confirmacion
  res.render("templates/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos Enviado un Email de Confirmación, presiona en el enlace",
  });
};
//funcion que comprueba la cuenta
const confirmar = async (req, res) => {
  const { token } = req.params;

  //Verificar si el token es valido
  const usuario = await Usuario.findOne({ where: { token } });

  console.log(usuario);

  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar tu cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
      error: true,
    });
  }

  //Confirmar la cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta Confirmada ",
    mensaje: "La cuenta se confirmó Exitosamente",
  });
};

export {
  formularioLogin,
  formularioRegistro,
  formularioForgotPassword,
  registrar,
  confirmar,
};
