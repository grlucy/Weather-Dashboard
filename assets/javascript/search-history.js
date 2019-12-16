// Declare variables
const cityInputEl = $("#citySearch");
const searchBtn = $("#searchBtn");
const searchHistoryDiv = $("#cityHistory");
const cityAndDateEl = $("#cityAndDate");
const currentTempEl = $("#currentTemp");
const currentHumidityEl = $("#currentHumidity");
const currentWindEl = $("#currentWind");
const currentUVEl = $("#currentUV");
const forecastDiv = $("#forecastDiv");
const apiKey = "bccd5fad3b0259856da508d996025871";
let city;
let cityArray = [];

// Create function to save city to localStorage
function saveCity() {
  // Get search history from localStorage
  cityArray = JSON.parse(localStorage.getItem("cityHistory"));
  if (cityArray === null) {
    cityArray = [];
  }
  // Push most recent city searched to cityArray
  cityArray.push(city);
  // Save array of search history to localStorage
  localStorage.setItem("cityHistory", JSON.stringify(cityArray));
}

// Create function to create search history buttons
function createSearchButtons() {
  // Clear existing search history buttons
  searchHistoryDiv.empty();
  cityArray = JSON.parse(localStorage.getItem("cityHistory"));
  // Populate new search history buttons
  if (cityArray !== null) {
    for (let i = 0; i < cityArray.length; i++) {
      let newCityButton = $("<div>").addClass("cityHistory");
      newCityButton.text(cityArray[i]);
      searchHistoryDiv.prepend(newCityButton);
    }
    // Create click event for search history buttons
    $(".cityHistory").on("click", function() {
      city = $(this).text();
      getWeather(city);
    });
  }
}
