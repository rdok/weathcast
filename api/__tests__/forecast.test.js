const { BadRequestError } = require("../../errors/bad-request-error");
const {
  mockWeatherstackConnectionError,
  mockWeatherstackResponse,
  mockWeatherstackServerError,
  mockWeatherstackAPIError,
} = require("../../jest/mocks/weatherstack");

const { forecast } = require("../forecast");

describe("forecast", () => {
  it("should summarize a weather forecast", async () => {
    mockWeatherstackResponse("a-latitude", "a-longitude");

    const expected =
      "mocked-weather-description: It is currently " +
      "mocked-temperature degrees out. It feels like mocked-feelslike " +
      "degrees out";

    const actual = await forecast("a-latitude", "a-longitude");
    expect(actual).toEqual(expected);
  });

  it("should handle network errors", async () => {
    mockWeatherstackConnectionError("b-latitude", "b-longitude");

    await expect(forecast("b-latitude", "b-longitude")).rejects.toEqual(
      new Error("Connection error.")
    );
  });

  it("should handle client error", async () => {
    mockWeatherstackServerError("c-latitude", "c-longitude");

    await expect(forecast("c-latitude", "c-longitude")).rejects.toEqual(
      new Error("Request failed with status code 422")
    );
  });

  it("should handle API error", async () => {
    mockWeatherstackAPIError("d-latitude", "d-longitude");

    await expect(forecast("d-latitude", "d-longitude")).rejects.toEqual(
      new BadRequestError("info_mock")
    );
  });
});
