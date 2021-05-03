const request = require("request");

const geocode = (location, callback) => {
  const encodedLocation = encodeURIComponent(location);
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json` +
    `?access_token=pk.eyJ1IjoicmRvayIsImEiOiJja2tscmpxNGQxZDM1MnZ0ZG1reDFtczZrIn0.wHmcGpVIyFyRkwL7W18ZRA` +
    `&limit=1`;

  request({ url, json: true }, (error, { statusCode, body } = {}) => {
    if (error) return callback("Unable to connect to mapbox service.");

    if (statusCode !== 200) return callback("Invalid mapbox request.");
    if (body.features.length === 0) return callback("Invalid API request.");

    const feature = body.features[0];
    const placeName = feature.place_name;
    const { center } = body.features[0];

    callback(undefined, {
      longitude: center[0],
      latitude: center[1],
      location: placeName,
    });
  });
};

module.exports = geocode;
