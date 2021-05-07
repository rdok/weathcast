const { BadRequestError } = require("../errors/bad-request-error");
const axios = require("axios").default;

const geocode = (location) => {
  const encodedLocation = encodeURIComponent(location);
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json` +
    `?access_token=${accessToken}&limit=1`;

  return axios.get(url).then((response) => {
    const { data } = response;
    const { features, success } = data;

    if (features.length === 0)
      throw new BadRequestError("No results found. Try a different location.");

    const feature = features[0];
    const placeName = feature.place_name;
    const { center } = feature;

    return {
      longitude: center[0],
      latitude: center[1],
      location: placeName,
    };
  });
};

module.exports = { geocode };
