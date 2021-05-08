const searchInput = document.querySelector("#search-input");

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

const updateWeatherForecast = (location) => {
  const clientErrorSpan = document.querySelector("#client-error-span");
  const forecastMessage = document.querySelector("#forecast-message");
  const forecastLocation = document.querySelector("#forecast-location");

  fetchWeatherForecast(location)
    .then((response) => {
      searchInput.classList.remove("error");
      clientErrorSpan.textContent = "";
      forecastMessage.textContent = response.forecast;
      forecastLocation.textContent = response.location;
    })
    .catch((err) => {
      searchInput.classList.add("error");
      clientErrorSpan.textContent = err.message;
      forecastMessage.textContent = "";
      forecastLocation.textContent = "";
    });
};

if (navigator.geolocation) {
  searchInput.value = "Loading...";
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const location = `${coords.longitude},${coords.latitude}`;
    updateWeatherForecast(location);
    searchInput.value = "";
  });
}

document.querySelector("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  updateWeatherForecast(location);
});
