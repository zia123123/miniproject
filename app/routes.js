const express = require("express");
const router = express.Router();
const mime = require("mime-types");
require("dotenv").config();

// Middlewares
const authtoken = require("./policy/Policy");

//multer aws

const InquiriController = require("./controller/InquiriController");
const AuthController = require("./controller/AuthController");

//data user
router.post("/api/inquiri/create", InquiriController.create);
router.get("/api/inquiri/", InquiriController.index);
router.get("/api/inquiri/:id", InquiriController.find, InquiriController.show);
router.patch(
  "/api/inquiri/update/:id",
  InquiriController.find,
  InquiriController.update
);
router.delete(
  "/api/inquiri/update/:id",
  InquiriController.find,
  InquiriController.delete
);

//data user
router.post("/api/auth/login", AuthController.signInUser);
router.post("/api/auth/register", AuthController.signupUser);
router.get("/api/auth/", authtoken, AuthController.index);
router.get(
  "/api/auth/:id",
  authtoken,
  AuthController.find,
  AuthController.show
);
router.patch(
  "/api/auth/update/:id",
  authtoken,
  AuthController.find,
  AuthController.update
);
router.delete(
  "/api/auth/update/:id",
  authtoken,
  AuthController.find,
  AuthController.delete
);

module.exports = router;
