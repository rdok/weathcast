const path = require("path");
const express = require("express");
const hbs = require("hbs");

if (process.env.ENV === "dev") require("dotenv").config();

const app = express();

const publicDirPath = path.join(__dirname, "./public");
const partialsDirPath = path.join(__dirname, "./views/partials");

app.set("view engine", "hbs");

hbs.registerPartials(partialsDirPath);
hbs.registerHelper("date", () => new Date());

app.use(express.static(publicDirPath));

module.exports = app;
