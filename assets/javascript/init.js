$(document).ready(function() {
  // Add click event to search button
  searchBtn.on("click", function() {
    event.preventDefault();
    // Get city from text input
    city = cityInputEl.val();
    // clear text input
    cityInputEl.val("");
    // get weather for city entered in search bar
    clickStatus = true;
    getWeather(city);
  }); // end of search button click event

  function init() {
    clickStatus = false;
    createSearchButtons();
    cityArray = JSON.parse(localStorage.getItem("cityHistory"));
    if (cityArray !== null) {
      city = cityArray[cityArray.length - 1];
      getWeather(city);
    } else {
      city = "Richmond";
      getWeather(city);
      // Geolocation
    }
  }
  init();
}); // end of document ready function
