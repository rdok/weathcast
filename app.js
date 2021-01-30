const request = require('request');

const url = 'http://api.weatherstack.com/current?' +
  'access_key=f2aab74f65bd756a3b77784ed97d5ca4' +
  '&query=London';

request({ url, json: true }, (error, response) => {
  console.log(response.body.current)
});

