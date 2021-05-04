const nock = require("nock");
const BASE_PATH = "https://api.mapbox.com";

function normalisePath(encodedLocation) {
  return (
    `/geocoding/v5/mapbox.places/${encodedLocation}.json` +
    "?access_token=mocked_mapbox_access_token" +
    "&limit=1"
  );
}

const mockGeocodeResponse = ({ location, longitude, latitude }) => {
  const path = normalisePath(location);

  const body = {
    features: [{ place_name: location, center: [longitude, latitude] }],
  };

  nock(BASE_PATH).get(path).reply(200, body);
};

const mockGeocodeConnectionError = (location) => {
  const path = normalisePath(location);
  nock(BASE_PATH).get(path).replyWithError("Connection error.");
};

const mockGeocodeServerError = (location) => {
  const path = normalisePath(location);
  nock(BASE_PATH).get(path).reply(422);
};

const mockGeocodeAPIError = (location) => {
  const path = normalisePath(location);
  nock(BASE_PATH).get(path).reply(200, { features: [] });
};

module.exports = {
  mockGeocodeResponse,
  mockGeocodeConnectionError,
  mockGeocodeServerError,
  mockGeocodeAPIError,
};
