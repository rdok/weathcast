const nock = require('nock');
const forecast = require("../src/services/forecast");
const { makeWeatherstackConnectionError } = require("./mocks/weatherstack");
const { mockWeatherstackResponse } = require("./mocks/weatherstack");

describe('forecast', () => {
  beforeEach(() => {
  })
  it('should summarize a weather forecast', done => {
    const latitude = 'mocked-latitude', longitude = 'mocked-longitude';
    mockWeatherstackResponse(latitude, longitude);
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

  it('should handle connection errors', done => {
    const latitude = 'mocked-latitude', longitude = 'mocked-longitude';
    makeWeatherstackConnectionError(latitude, longitude);

    const callback = (error, data) => {
      expect(data).toBeUndefined();
      expect(error).toEqual('Unable to connect to weatherstack service.');
      done();
    };

    forecast(latitude, longitude, callback);
  });
});
