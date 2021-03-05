const geocode = require('./geocode');
const forecast = require('./forecast');

const args = process.argv.slice(2);
const executionError = 'Exactly one argument is required with location.';
if (args.length !== 1) {
  throw new Error(executionError);
}
const argLocation = args[0];

geocode(argLocation, (geocodeError, geocodeData) => {
  if (geocodeError) {
    throw new Error(geocodeError);
  }

  const { longitude, latitude, location } = geocodeData;
  forecast(longitude, latitude, (error, data) => {
    if (error) {
      throw new Error(error);
    }

    console.log(location); // eslint-disable-line no-console
    console.log('Data', data); // eslint-disable-line no-console
  });
});
