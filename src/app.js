/**
 * App.js
 */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {
  errorHandler,
  notFoundHandler,
} = require("./http/middleware/globalhandler");
const { join } = require("path");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

// Routes
app.use(require("./http/router"));

app.use(errorHandler);

app.use(notFoundHandler);

module.exports = app;
