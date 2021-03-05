const request = require('request');

const geocode = (location, callback) => {
  const encodedLocation = encodeURIComponent(location);
  const mapboxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json`
    + `?access_token=pk.eyJ1IjoicmRvayIsImEiOiJja2tscmpxNGQxZDM1MnZ0ZG1reDFtczZrIn0.wHmcGpVIyFyRkwL7W18ZRA`
    + `&limit=1`;

  request({ url: mapboxAPI, json: true }, (error, response) => {

    if (error) {
      return callback('Unable to connect to mapbox service.');
    }

    const { statusCode, body } = response;
    if (statusCode !== 200) {
      return callback('Invalid mapbox request.');
    }

    if(body.features.length === 0) {
      return callback('Invalid API request.');
    }
    const feature = body.features[0];
    const placeName = feature.place_name;
    const { center } = body.features[0];

    callback(error, {
      longitude: center[0],
      latitude: center[1],
      location: placeName
    });
  });
};

module.exports = geocode;
