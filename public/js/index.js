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

  fetchWeatherForecast(location)
    .then((response) => {
      searchInput.classList.remove("error");
      clientErrorSpan.textContent = "";
      searchInput.value = response.location;
      forecastMessage.textContent = response.forecast;
    })
    .catch((err) => {
      searchInput.classList.add("error");
      clientErrorSpan.textContent = err.message;
      forecastMessage.textContent = "";
    });
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const location = `${coords.longitude},${coords.latitude}`;
    updateWeatherForecast(location);
  });
}

document.querySelector("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  updateWeatherForecast(location);
});
