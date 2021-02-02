const request = require('request');


const mapboxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/London.json`
  + `?access_token=pk.eyJ1IjoicmRvayIsImEiOiJja2tscmpxNGQxZDM1MnZ0ZG1reDFtczZrIn0.wHmcGpVIyFyRkwL7W18ZRA`
  + `&limit=1`;

request({ url: mapboxAPI, json: true }, (error, response) => {
  const { center } = response.body.features[0];
  const longitude = center[0];
  const latitude = center[1];
  console.log(longitude);
  console.log(latitude);

  const url = 'http://api.weatherstack.com/current?' +
    'access_key=f2aab74f65bd756a3b77784ed97d5ca4' +
    `&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    const { temperature, feelslike, weather_descriptions } = response.body.current;

    const message = `${weather_descriptions[0]}: `
      + `It is currently ${temperature} degrees out.`
      + ` It feels like ${feelslike} degrees out`;

    console.log(message);
  });
});


//

// fire of a new request to the url explored in browser
// have the requeds module partise is as json
// print both the latitude and longitude to the
// test
