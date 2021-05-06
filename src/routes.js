const geocode = require("./geocode");
const forecast = require("./forecast");

function routes(server) {
  server.get("/", (req, res) => res.render("index", { title: "Homepage" }));
  server.get("/about", (req, res) => res.render("about", { title: "About" }));

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

module.exports = routes;
