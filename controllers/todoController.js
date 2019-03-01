const Todo = require("../models/todoModel");

module.exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.find();
    res.status(200).json(todo);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports.postTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      content: req.body.content
    });
    const todo = await newTodo.save();
    res.status(200).json(todo);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
