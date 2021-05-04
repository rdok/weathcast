const express = require("express");
const geocode = require("./geocode");
const forecast = require("./forecast");
const path = require("path");

if (process.env.ENV === "dev") require("dotenv").config();

const app = express();
const publicDirectoryPath = path.join(__dirname, "./public");

app.use(express.static(publicDirectoryPath));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
