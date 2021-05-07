const geocode = require("../geocode");
const forecast = require("../forecast");

function apiRoutes(server) {
  server.get("/api/weather/:location", (req, res) => {
    const location = req.params.location;
    geocode(
      location,
      (geocodeError, { longitude, latitude, location } = {}) => {
        if (geocodeError) return res.status(500).send({ error: geocodeError });

        forecast(longitude, latitude, (error, data) => {
          if (error) return res.status(500).send({ error });
          res.send({ location, forecast: data });
        });
      }
    );
  });
  server.get("/api/*", (req, res) => {
    return res.status(404).send({ error: "Not Found" });
  });
}

module.exports = { apiRoutes };
