const { BadRequestError } = require("../../errors/bad-request-error");
const { geocode } = require("../geocode");

const {
  mockGeocodeConnectionError,
  mockGeocodeResponse,
  mockGeocodeServerError,
  mockGeocodeAPIError,
} = require("../../jest/mocks/geocode");

describe("geocode", () => {
  it("should geocode a given location", async () => {
    mockGeocodeResponse({
      location: "london",
      longitude: "mocked_long",
      latitude: "mocked_lat",
    });

    const actual = await geocode("london");
    expect(actual).toEqual({
      longitude: "mocked_long",
      latitude: "mocked_lat",
      location: "london",
    });
  });

  it("should handle connection errors", async () => {
    mockGeocodeConnectionError("a-location");

    await expect(geocode("a-location")).rejects.toEqual(
      new BadRequestError("Connection error.")
    );
  });

  it("should handle client errors", async () => {
    mockGeocodeServerError("b-location");

    await expect(geocode("b-location")).rejects.toEqual(
      new BadRequestError("Request failed with status code 422")
    );
  });

  it("should handle invalid location", async () => {
    mockGeocodeAPIError("c-location");

    await expect(geocode("c-location")).rejects.toEqual(
      new BadRequestError("No results found. Try a different location.")
    );
  });
});
