const geocode = require("../geocode");
const forecast = require("../forecast");

function apiRoutes(server) {
  server.get("/current-weathers/:location", (req, res) => {
    const location = req.params.location;
    geocode(
      location,
      (geocodeError, { longitude, latitude, location } = {}) => {
        if (geocodeError) return res.status(500).send({ error: geocodeError });

        forecast(longitude, latitude, (error, data) => {
          if (error) return res.status(500).send({ error });
          res.send({ location, currentWeather: data });
        });
      }
    );
  });
}

module.exports = { apiRoutes };
