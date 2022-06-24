// Module imports.

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const ejs = require("ejs");

// Setting up imports for use.

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Global Variables.

const PORT = process.env.PORT;

// Initialize server.

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});
