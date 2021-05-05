const forecast = require("../src/forecast");
const {
  mockWeatherstackConnectionError,
  mockWeatherstackResponse,
  mockWeatherstackServerError,
  mockWeatherstackAPIError,
} = require("./mocks/weatherstack");

describe("forecast", () => {
  it("should summarize a weather forecast", (done) => {
    mockWeatherstackResponse("a-latitude", "a-longitude");

    const expected =
      "mocked-weather-description: It is currently " +
      "mocked-temperature degrees out. It feels like mocked-feelslike " +
      "degrees out";

    forecast("a-latitude", "a-longitude", (error, data) => {
      expect(error).toBeUndefined();
      expect(data).toEqual(expected);
      done();
    });
  });

  it("should handle connection errors", (done) => {
    mockWeatherstackConnectionError("b-latitude", "b-longitude");

    forecast("b-latitude", "b-longitude", (error, data) => {
      expect(data).toBeUndefined();
      expect(error).toEqual("Unable to connect to weatherstack service.");
      done();
    });
  });

  it("should handle server error", (done) => {
    mockWeatherstackServerError("c-latitude", "c-longitude");

    forecast("c-latitude", "c-longitude", (error, data) => {
      expect(data).toBeUndefined();
      expect(error).toEqual("Invalid weatherstack request.");
      done();
    });
  });

  it("should handle API error", (done) => {
    mockWeatherstackAPIError("d-latitude", "d-longitude");

    forecast("d-latitude", "d-longitude", (error, data) => {
      expect(data).toBeUndefined();
      expect(error).toEqual("Invalid API request.");
      done();
    });
  });
});