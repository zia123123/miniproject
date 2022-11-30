const { inquirie } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const apiResponse = require("../helpers/apiResponse");
const randomstring = require("randomstring");

module.exports = {
  async create(req, res) {
    let result = await inquirie
      .create({
        description: req.body.description,
        topic_id: req.body.topic_id,
        user_id: req.body.user_id,
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

  async find(req, res, next) {
    let result = await inquirie.findByPk(req.params.id);
    if (!result) {
      return apiResponse.notFoundResponse(res, "Not Fond");
    } else {
      req.result = result;
      next();
    }
  },

  async index(req, res) {
    let result = await inquirie
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
    req.result.email = req.body.email;
    req.result.userId = req.body.userId;
    req.result.companyId = req.body.companyId;
    req.result.name = req.body.name;
    req.result.phone = req.body.phone;
    req.result.reg_no = req.body.reg_no;
    req.result.note = req.body.note;
    req.result.location = req.body.location;
    req.result.reg_img = req.body.reg_img;
    req.result.status = req.body.status;
    req.result.save().then((result) => {
      return apiResponse.successResponseWithData(res, "SUCCESS", result);
    });
  },

  //delete
  async delete(req, res) {
    req.result.destroy().then((result) => {
      res.json({ msg: "Delete Success!" });
    });
  },
};
