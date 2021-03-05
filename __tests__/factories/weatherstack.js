const nock = require('nock');

makeWeatherForecastResponse = (longitude, latitude) => {
  const basePath = 'http://api.weatherstack.com';
  const path = '/current?access_key=f2aab74f65bd756a3b77784ed97d5ca4' +
    `&query=${latitude},${longitude}`;

  nock(basePath).get(path)
    .reply(200, {
      success: true,
      current: {
        temperature: 'mocked-temperature',
        feelslike: 'mocked-feelslike',
        weather_descriptions: ['mocked-weather-description']
      }
    });
};

module.exports = { makeWeatherForecastResponse };
