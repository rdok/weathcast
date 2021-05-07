const { geocode } = require("../api/geocode");
const { forecast } = require("../api/forecast");
const { BadRequestError } = require("../errors/bad-request-error");

function apiRoutes(app) {
  app.get("/api/weather/:location", async (req, res, next) => {
    const { location } = req.params;
    let forecastResponse;

    try {
      const { longitude, latitude } = await geocode(location);
      forecastResponse = await forecast(longitude, latitude);
    } catch (e) {
      return next(e);
    }

    return res.send({ location, forecast: forecastResponse });
  });

  app.get("/api/*", (req, res) => {
    return res.status(404).send({ error: "Not Found" });
  });

  app.use("/api/*", function (err, req, res, next) {
    if (err instanceof BadRequestError)
      return res.status(422).send({ status: 422, error: err.message });

    console.error(err);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error." });
  });
}

module.exports = { apiRoutes };
