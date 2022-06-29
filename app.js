// Module imports.

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

// Setting up imports for use.

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_DB);

// Global Variables.

const PORT = process.env.PORT;
const secret = process.env.SECRET;

const userSchema = new mongoose.Schema({ email: String, password: String });

const User = mongoose.model("User", userSchema);

// GET routes.

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

// POST routes.

app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });
  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function(req, res) {
  User.findOne({ email: req.body.username }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else if (foundUser) {
      if (foundUser.password === md5(req.body.password)) {
        res.render("secrets");
      } else {
        // Handle wrong password.
        console.log("Wrong password");
      }
    } else {
      // Handle user not found.
      console.log("User not found");
    }
  });
});

// Initialize server.

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});
