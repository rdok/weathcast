const { BadRequestError } = require("../errors/bad-request-error");
const axios = require("axios").default;

const forecast = (longitude, latitude) => {
  const accessKey = process.env.WEATHERSTACK_KEY;
  const url =
    "http://api.weatherstack.com/current?" +
    `access_key=${accessKey}&query=${latitude},${longitude}`;

  return axios.get(url).then((response) => {
    const { data } = response;
    const { success, current } = data;

    if (!success) throw new BadRequestError("Invalid API Request.");

    const { temperature, feelslike: feelsLike } = current;
    const weatherDescriptions = data.current.weather_descriptions;

    return (
      `${weatherDescriptions[0]}: ` +
      `It is currently ${temperature} degrees out.` +
      ` It feels like ${feelsLike} degrees out`
    );
  });
};

module.exports = { forecast };
