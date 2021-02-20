const geocode = require("./services/geocode");
const currentWeather = require("./services/current-weather");

geocode('London', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  const { longitude, latitude } = data;
  currentWeather(longitude, latitude, (error, data) => {
    console.log(data);
  });
});
