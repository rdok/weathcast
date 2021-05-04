const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const accessKey = process.env.WEATHERSTACK_KEY;
  const url =
    "http://api.weatherstack.com/current?" +
    `access_key=${accessKey}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { statusCode, body } = {}) => {
    if (error) return callback("Unable to connect to weatherstack service.");

    if (statusCode !== 200) return callback("Invalid weatherstack request.");
    if (body.success === false) return callback("Invalid API request.");

    const { temperature, feelslike: feelsLike } = body.current;
    const weatherDescriptions = body.current.weather_descriptions;

    const message =
      `${weatherDescriptions[0]}: ` +
      `It is currently ${temperature} degrees out.` +
      ` It feels like ${feelsLike} degrees out`;

    return callback(undefined, message);
  });
};

module.exports = forecast;
