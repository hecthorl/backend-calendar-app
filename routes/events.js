const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validarCampos");
const { validarJWTf } = require("../middleware/validar-jwt");
const {
  actualizarEvento,
  eliminarEvento,
  getEventos,
  crearEventos,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const route = Router();
route.use(validarJWTf);

route.get(
  "/",

  getEventos
);
route.post(
  "/",
  [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de termino es obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEventos
);
route.put("/:id", actualizarEvento);
route.delete("/:id", eliminarEvento);

module.exports = route;
