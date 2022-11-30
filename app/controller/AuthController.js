const { auth } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const apiResponse = require("../helpers/apiResponse");
const randomstring = require("randomstring");

module.exports = {
  async signupUser(req, res) {
    let password = bcrypt.hashSync(
      req.body.password,
      Number.parseInt(authConfig.rounds)
    );
    let result = await auth
      .create({
        name: req.body.name,
        password: password,
        nik: req.body.nik,
        notelp: req.body.notelp,
        username: req.body.username,
        email: req.body.email,
      })
      .then((result) => {
        return apiResponse.successResponseWithData(
          res,
          "SUCCESS CREATE",
          result
        );
      })
      .catch(function (err) {
        return apiResponse.ErrorResponse(res, err);
      });
  },

  signInUser(req, res) {
    let { username, password } = req.body;
    auth
      .findOne({
        where: {
          username: username,
        },
      })
      .then((auth) => {
        if (!auth) {
          res.status(404).json({ message: "Code tidak valid!" });
        } else {
          if (bcrypt.compareSync(password, auth.password)) {
            let token = jwt.sign({ auth: auth }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });
            res.json({
              status: 200,
              message: "SUCCESS",
              data: auth,
              token: token,
            });
          } else {
            res.status(401).json({ msg: "Password Salah" });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  async find(req, res, next) {
    let result = await auth.findByPk(req.params.id);
    if (!result) {
      return apiResponse.notFoundResponse(res, "Not Fond");
    } else {
      req.result = result;
      next();
    }
  },

  async index(req, res) {
    let result = await auth
      .findAll({})
      .then((result) => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
      })
      .catch(function (err) {
        return apiResponse.ErrorResponse(res, err);
      });
  },

  // Show
  async show(req, res) {
    return apiResponse.successResponseWithData(res, "SUCCESS", req.result);
  },

  // Update
  async update(req, res) {
    (req.result.name = req.body.name),
      (req.result.password = password),
      (req.result.nik = req.body.nik),
      (req.result.notelp = req.body.notelp),
      (req.result.username = req.body.username),
      (req.result.email = req.body.email),
      req.result.save().then((result) => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
      });
  },
  async delete(req, res) {
    req.result.destroy().then((result) => {
      res.json({ msg: "Delete Success!" });
    });
  },
};
