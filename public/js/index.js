const fetchWeatherForecast = (location) => {
  return fetch(`/api/weather/${location}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.status) {
        const message =
          response.status === 422 ? response.error : "Server error";
        throw new Error(message);
      }

      return response;
    });
};

const weatherForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const clientErrorSpan = document.querySelector("#client-error-span");
const forecastMessageSpan = document.querySelector("#forecast-message");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetchWeatherForecast(searchInput.value)
    .then((response) => {
      searchInput.classList.remove("error");
      clientErrorSpan.textContent = "";
      searchInput.value = response.location;
      forecastMessageSpan.textContent = response.forecast;
    })
    .catch((err) => {
      searchInput.classList.add("error");
      clientErrorSpan.textContent = err.message;
      forecastMessageSpan.textContent = "";
    });
});
