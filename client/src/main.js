const geocode = require("./geocode");
const forecast = require("./forecast");

const args = process.argv.slice(2);
const executionError = "Exactly one argument is required with location.";
if (args.length !== 1) throw new Error(executionError);

const argLocation = args[0];

geocode(argLocation, (geocodeError, { longitude, latitude, location } = {}) => {
  if (geocodeError) throw new Error(geocodeError);

  forecast(longitude, latitude, (error, data) => {
    if (error) throw new Error(error);

    console.log(location);
    console.log("Data", data);
  });
});