const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_JWT;

const genJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("no se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { genJWT };
