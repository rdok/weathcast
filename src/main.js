const geocode = require("./domain/geocode");
const forecast = require("./domain/forecast");

const args = process.argv.slice(2);
const error = 'Exactly one argument is required with location.';
if (args.length !== 1) throw new Error(error);
const location = args[0];

geocode(location, (error, data) => {
  if (error) return console.error(error);

  const { longitude, latitude, location } = data;
  forecast(longitude, latitude, (error, data) => {
    if (error) return console.error(error);

    console.log(location)
    console.log('Data', data);
  });
});
