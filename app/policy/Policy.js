const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { auth } = require("../models/index");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Anda tidak memiliki akses" });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token sudah habis" });
      } else {
        console.log(decoded);
        auth
          .findByPk(decoded.auth.id)
          .then((auth) => {
            req.auth = auth;
            next();
          })
          .catch((err) => {
            res.status(401).json({ message: "Anda tidak memiliki akses" });
          });
      }
    });
  }
};
