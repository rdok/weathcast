const nock = require("nock");
const BASE_PATH = "http://api.weatherstack.com";

function normalisePath(latitude, longitude) {
  return (
    "/current?access_key=mocked_weatherstack_key" +
    `&query=${latitude},${longitude}`
  );
}

const mockWeatherstackResponse = (longitude, latitude) => {
  const path = normalisePath(latitude, longitude);

  nock(BASE_PATH)
    .get(path)
    .reply(200, {
      success: true,
      current: {
        temperature: "mocked-temperature",
        feelslike: "mocked-feelslike",
        weather_descriptions: ["mocked-weather-description"],
      },
    });
};

const mockWeatherstackConnectionError = (longitude, latitude) => {
  const path = normalisePath(latitude, longitude);
  nock(BASE_PATH).get(path).replyWithError("Connection error.");
};

const mockWeatherstackServerError = (longitude, latitude) => {
  const path = normalisePath(latitude, longitude);
  nock(BASE_PATH).get(path).reply(422);
};

const mockWeatherstackAPIError = (longitude, latitude) => {
  const path = normalisePath(latitude, longitude);
  nock(BASE_PATH).get(path).reply(200, { success: false });
};

module.exports = {
  mockWeatherstackResponse,
  mockWeatherstackConnectionError,
  mockWeatherstackServerError,
  mockWeatherstackAPIError,
};
