const { Router } = require("express");
const { body, validationResult, check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middleware/validarCampos");
const { validarJWTf } = require("../middleware/validar-jwt");
const route = Router();

// peticiones POST
route.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Email es obligatorio").isEmail(),
    check("password", "contraseña incorrecta").isLength({ min: 8 }),
  ],
  validarCampos,
  crearUsuario
);
route.post(
  "/",
  [
    check("email", "Email es obligatorio").isEmail(),
    check("password", "contraseña incorrecta").isLength({ min: 8 }),
  ],
  validarCampos,
  loginUsuario
);

//PETICIONES GET
route.get("/renew", validarJWTf, revalidarToken);

module.exports = route;
