const express = require("express");
const { body } = require("express-validator/check");

const User = require("../../models/userModel");

const route = express.Router();

const authController = require("../../controllers/auth");

// @route POST /api/auth/register
// @desc provide user registration
// @access Public
route.post(
  "/register",
  [
    body("name", "Name can't be empty")
      .trim()
      .not()
      .isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Please enter the valid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("Email already exists!!!");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password should be at least 6 character ")
      .trim()
      .isLength({ min: 6 })
  ],
  authController.userRegister
);

// @route POST /api/auth/login
// @desc provide user login
// @access Public
route.post("/login", authController.userLogin);

module.exports = route;
