const geocode = require("../api/geocode");
const forecast = require("../api/forecast");

function apiRoutes(server) {
  server.get("/api/weather/:location", (req, res) => {
    const location = req.params.location;
    const geocodeCallback = (
      geocodeError,
      { longitude, latitude, location } = {}
    ) => {
      if (geocodeError) return res.status(500).send({ error: geocodeError });

      forecast(longitude, latitude, (error, data) => {
        if (error) return res.status(500).send({ error });
        res.send({ location, forecast: data });
      });
    };

    geocode(location, geocodeCallback);
  });
  server.get("/api/*", (req, res) => {
    return res.status(404).send({ error: "Not Found" });
  });
}

module.exports = { apiRoutes };
