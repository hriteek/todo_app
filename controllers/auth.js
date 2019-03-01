const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

const { validationResult } = require("express-validator/check");

module.exports.userRegister = async (req, res, next) => {
  try {
    // // checking for existence of user :- this is done in the route middleware
    // const alreadyUser = await User.findOne({ email: req.body.email });
    // if (alreadyUser) {
    //   const error = new Error("Email already exists");
    //   error.statusCode = 422;
    //   throw error;
    // }

    // serverSide validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const password = req.body.password;
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
module.exports.userLogin = async (req, res, next) => {
  try {
    // checking for existence of user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error("Email not found");
      error.statusCode = 422;
      error.data = [{ param: "email", msg: "Email not found" }];
      throw error;
    }
    const password = req.body.password;
    const matched = await bcryptjs.compare(password, user.password);
    // checking if password is correct or not
    if (matched) {
      // sending token along with the response
      // payload is the data that is going to be sent along with the token
      const payload = {
        id: user.id,
        name: user.name
      };
      /*
      jwt.sign({
       data: 'foobar'
        }, 'secret', { expiresIn: '1h' })
      */
      jwt.sign(payload, keys.key, { expiresIn: "1m" }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ message: "login successful", token: "Bearer " + token });
      });
    } else {
      const error = new Error("Password didn't matched");
      error.statusCode = 401;
      error.data = [{ param: "password", msg: "Password didn't matched" }];
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
