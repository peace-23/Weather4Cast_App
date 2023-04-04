const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Calabar&appid=74cbf63bacb8000b2663c67490f4c32a&units=imperial";

searchBtn.addEventListener("click", () => {
  const cityName = searchInput.value.trim();
  if (cityName.length === 0) {
    alert("Please enter a city name");
    return;
  }

  // Make API call to retrieve weather data for the searched city
  getWeatherData(cityName);
});

function getWeatherData(cityName) {
  const apiKey = "ab2bcf35dac0879659072962af909ed0";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Process weather data and display it on the UI
      displayWeatherData(data);
    })
    .catch((error) => {
      alert("Failed to fetch weather data. Please try again later.");
      console.log(error);
    });
}
