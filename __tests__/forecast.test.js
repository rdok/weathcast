const forecast = require("../src/services/forecast");
const { makeWeatherForecastResponse } = require("./factories/weatherstack");

describe('forecast', () => {
  it('should summarize a weather forecast', done => {
    const latitude = 'mocked-latitude', longitude = 'mocked-longitude'
    makeWeatherForecastResponse(latitude, longitude);
    const expected = 'mocked-weather-description: It is currently '
      + 'mocked-temperature degrees out. It feels like mocked-feelslike '
      + 'degrees out';

    const callback = (error, data) => {
      expect(error).toBeUndefined();
      expect(data).toEqual(expected);
      done();
    };

    forecast(latitude, longitude, callback);
  });
});
