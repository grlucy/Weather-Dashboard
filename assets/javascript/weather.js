$(document).ready(function() {
  // Declare variables
  const cityInputEl = $("#citySearch");
  const searchBtn = $("#searchBtn");
  const searchHistoryDiv = $("#cityHistory");
  const cityAndDateEl = $("#cityAndDate");
  const currentTempEl = $("#currentTemp");
  const currentHumidityEl = $("#currentHumidity");
  const currentWindEl = $("#currentWind");
  const currentUVEl = $("#currentUV");

  // Add click event to search button
  searchBtn.on("click", function() {
    event.preventDefault();
    // Get city from text input
    let city = cityInputEl.val();
    console.log(city);
    // clear text input
    cityInputEl.val("");
    // Search OpenWeather API for city
    const apiKey = "bccd5fad3b0259856da508d996025871";
    let queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Populate current weather elements with API response data
      cityAndDateEl.text(
        response.name + " " + response.dt + " (Format Date Later)"
      ); // https://openweathermap.org/weather-data
      // Add weather icon
      currentTempEl.text(
        "Temperature: " + response.main.temp.toFixed(0) + "°F"
      );
      currentHumidityEl.text("Humidity: " + response.main.humidity + "%");
      currentWindEl.text("Wind Speed: " + response.wind.speed + " MPH");
      // Fill in UV index
    });
  });
});
