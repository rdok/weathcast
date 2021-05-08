fetch("/api/weather/london")
  .then((response) => response.json())
  .then((response) => {
    if (response.status) {
      if (response.status === 422) {
        console.error(response.error);
      } else {
        console.error("Server error");
      }
    } else {
      console.log(response);
    }
  });

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit handle");
});
