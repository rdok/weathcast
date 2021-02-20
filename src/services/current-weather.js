const request = require('request');

const currentWeather = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?' +
    'access_key=f2aab74f65bd756a3b77784ed97d5ca4' +
    `&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback('Unable to connect to weatherstack service.');
    }

    const { statusCode, body } = response;
    if (statusCode !== 200) {
      return callback('Invalid weatherstack request.');
    }

    const { temperature, feelslike, weather_descriptions } = body.current;

    const message = `${weather_descriptions[0]}: `
      + `It is currently ${temperature} degrees out.`
      + ` It feels like ${feelslike} degrees out`;

    return callback(undefined, message)
  });
};

module.exports = currentWeather;
