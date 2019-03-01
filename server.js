const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

// routes import
const todoRoute = require("./route/api/todo");
const authRoute = require("./route/api/auth");

const app = express();
app.use(bodyParser.json());

// Cors setting
app.use(cors());

// Initialize passport
app.use(passport.initialize());

// configure passport
require("./config/passport")(passport);

// testing
app.get("/", (req, res) => {
  res.send("Hi welcome");
});

// routes use
app.use("/api/todo", todoRoute);
app.use("/api/auth", authRoute);

// for error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 5000;

// database config
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // we're connected!
  console.log("Connected to database");
  app.listen(PORT, () => console.log(`server running in port : ${PORT}`));
});
