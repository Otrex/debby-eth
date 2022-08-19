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
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

// Routes
app.use(require("./http/router"));

app.get('/docs', (req, res) => {
  res.sendFile(join(__dirname, 'doc', 'doc.yaml'));
});

app.get('/test22', (req, res) => {
  // apiProxy.web(req, res, { target: 'https://editor.swagger.io/?url=https://f12b-197-210-79-76.ngrok.io/docs'})
  res.sendFile(join(__dirname, 'doc', 'txt.html'))
})

app.use(errorHandler);

app.use(notFoundHandler);


module.exports = app;
