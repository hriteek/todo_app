const express = require("express");
const passport = require("passport");

const route = express.Router();

// controllers
const todoController = require("../../controllers/todoController");

// @route GET /api/todo/
// @desc get all the todo
// @access Private
route.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  todoController.getTodo
);

// @route POST /api/todo/
// @desc add todo to the DB
// @access Private
route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  todoController.postTodo
);

// @route DELETE /api/todo/:id
// @desc delete the todo
// @access Private
route.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  todoController.deletePost
);

module.exports = route;
