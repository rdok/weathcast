const express = require("express");
const geocode = require("./geocode");
const forecast = require("./forecast");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Section</h1>");
});

app.get("/current-weathers/:location", (req, res) => {
  const location = req.params.location;
  geocode(location, (geocodeError, { longitude, latitude, location } = {}) => {
    if (geocodeError) return res.status(500).send({ error: geocodeError });

    forecast(longitude, latitude, (error, data) => {
      if (error) return res.status(500).send({ error });
      res.send({ location, currentWeather: data });
    });
  });
});

app.listen(3000, () => {
  console.log("Listening http://localhost:3000");
});
