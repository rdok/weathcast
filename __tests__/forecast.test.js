const forecast = require("../src/services/forecast");
const {
  makeWeatherstackConnectionError, mockWeatherstackResponse
} = require("./mocks/weatherstack");

describe('forecast', () => {
  it('should summarize a weather forecast', done => {
    mockWeatherstackResponse('a-latitude', 'a-longitude');

    const expected = 'mocked-weather-description: It is currently '
      + 'mocked-temperature degrees out. It feels like mocked-feelslike '
      + 'degrees out';

    forecast('a-latitude', 'a-longitude', (error, data) => {
      expect(error).toBeUndefined();
      expect(data).toEqual(expected);
      done();
    });
  });

  it('should handle connection errors', done => {
    makeWeatherstackConnectionError('a-latitude', 'a-longitude');

    forecast('a-latitude', 'a-longitude', (error, data) => {
      expect(data).toBeUndefined();
      expect(error).toEqual('Unable to connect to weatherstack service.');
      done();
    });
  });
});
