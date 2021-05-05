const geocode = require("../src/geocode");
const {
  mockGeocodeConnectionError,
  mockGeocodeResponse,
  mockGeocodeServerError,
  mockGeocodeAPIError,
} = require("./mocks/geocode");

describe("geocode", () => {
  it("should geocode a given location", (done) => {
    mockGeocodeResponse({
      location: "london",
      longitude: "mocked_long",
      latitude: "mocked_lat",
    });

    geocode("london", (error, data) => {
      expect(error).toBeUndefined();
      expect(data).toEqual({
        longitude: "mocked_long",
        latitude: "mocked_lat",
        location: "london",
      });
      done();
    });
  });

  it("should handle connection errors", (done) => {
    mockGeocodeConnectionError("a-location");

    geocode("a-location", (error, data) => {
      expect(data).toBeUndefined();
      expect(error).toEqual("Unable to connect to mapbox service.");
      done();
    });
  });

  it("should handle server error", (done) => {
    mockGeocodeServerError("b-location");

    geocode("b-location", (error, data) => {
      expect(data).toBeUndefined();
      expect(error).toEqual("Invalid mapbox request.");
      done();
    });
  });

  it("should handle API error", (done) => {
    mockGeocodeAPIError("c-location");

    geocode("c-location", (error, data) => {
      expect(data).toBeUndefined();
      expect(error).toEqual("Invalid API request.");
      done();
    });
  });
});