const Usuario = require("../models/Usuarios");
const bcrypt = require("bcryptjs");
const { genJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res) => {
  const { password, email } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "el usuario ya existe",
      });
    }
    usuario = new Usuario(req.body);
    //encryptar contraseña
    const salt = bcrypt.genSaltSync(2);
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    //generar jwt
    const token = await genJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Internal Error",
    });
  }
};
const loginUsuario = async (req, res) => {
  const { password, email } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "el usuario no existe con ese email",
      });
    }
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "contraseña incorrecta",
      });
    }
    const token = await genJWT(usuario.id, usuario.name);
    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Internal Error",
    });
  }
};
const revalidarToken = async (req, res) => {
  const { uid, name } = req;
  const token = await genJWT(uid, name);
  res.status(200).json({
    ok: true,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
