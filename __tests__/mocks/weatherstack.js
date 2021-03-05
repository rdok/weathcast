const nock = require('nock');
const BASE_PATH = 'http://api.weatherstack.com';

mockWeatherstackResponse = (longitude, latitude) => {
  nock.cleanAll()
  nock.enableNetConnect()
  const path = '/current?access_key=f2aab74f65bd756a3b77784ed97d5ca4' +
    `&query=${latitude},${longitude}`;

  nock(BASE_PATH).get(path)
    .reply(200, {
      success: true,
      current: {
        temperature: 'mocked-temperature',
        feelslike: 'mocked-feelslike',
        weather_descriptions: ['mocked-weather-description']
      }
    });
};

makeWeatherstackConnectionError = (longitude, latitude) => {
  const path = '/current?access_key=f2aab74f65bd756a3b77784ed97d5ca4' +
    `&query=${latitude},${longitude}`;

  nock(BASE_PATH).get(path).replyWithError('Connection error.');
};

module.exports = { mockWeatherstackResponse, makeWeatherstackConnectionError };
