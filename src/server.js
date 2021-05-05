const path = require("path");
const express = require("express");

if (process.env.ENV === "dev") require("dotenv").config();

const server = express();

const publicDirectoryPath = path.join(__dirname, "../public");

server.set("view engine", "hbs");
server.use(express.static(publicDirectoryPath));

module.exports = server;
