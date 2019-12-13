// API Key: bccd5fad3b0259856da508d996025871

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
  });
});
