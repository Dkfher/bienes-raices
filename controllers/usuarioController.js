const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar sesión",
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
  });
};

const formularioForgotPassword = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
  });
};

export { formularioLogin, formularioRegistro, formularioForgotPassword };
