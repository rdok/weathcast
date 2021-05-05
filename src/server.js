const path = require("path");
const express = require("express");
const hbs = require('hbs')

if (process.env.ENV === "dev") require("dotenv").config();

const server = express();

const publicDirPath = path.join(__dirname, "../public");
const partialsDirPath = path.join(__dirname, "../views/partials");

server.set("view engine", "hbs");
hbs.registerPartials(partialsDirPath);
server.use(express.static(publicDirPath));

module.exports = server;
