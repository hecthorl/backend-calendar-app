const { response } = require("express");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_JWT;

const validarJWTf = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no hay token en la validación",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, secret);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token no valido",
    });
  }

  next();
};

module.exports = { validarJWTf };
