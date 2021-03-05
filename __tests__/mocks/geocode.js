const nock = require('nock');
const BASE_PATH = 'https://api.mapbox.com';

function normalisePath(encodedLocation) {
  return `/geocoding/v5/mapbox.places/${encodedLocation}.json`
    + `?access_token=pk.eyJ1IjoicmRvayIsImEiOiJja2tscmpxNGQxZDM1MnZ0ZG1reDFtczZrIn0.wHmcGpVIyFyRkwL7W18ZRA`
    + `&limit=1`;
}

mockGeocodeResponse = (location, longitude, latitude) => {
  const path = normalisePath(location);

  const body = {
    features: [{ place_name: location, center: [longitude, latitude] }]
  };

  nock(BASE_PATH).get(path).reply(200, body);
};

mockGeocodeConnectionError = (location) => {
  const path = normalisePath(location);
  nock(BASE_PATH).get(path).replyWithError('Connection error.');
};

mockGeocodeServerError = (location) => {
  const path = normalisePath(location);
  nock(BASE_PATH).get(path).reply(422);
};

mockGeocodeAPIError = (location) => {
  const path = normalisePath(location);
  nock(BASE_PATH).get(path).reply(200, { features: [] });
};

module.exports = {
  mockGeocodeResponse,
  mockGeocodeConnectionError,
  mockGeocodeServerError,
  mockGeocodeAPIError
};
