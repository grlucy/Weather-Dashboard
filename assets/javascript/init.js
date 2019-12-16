$(document).ready(function() {
  // Add click event to search button
  searchBtn.on("click", function() {
    event.preventDefault();
    // Get city from text input
    city = cityInputEl.val();
    // clear text input
    cityInputEl.val("");
    // get weather for city entered in search bar
    getWeather(city);
  }); // end of search button click event

  function init() {
    createSearchButtons();
  }
  init();
}); // end of document ready function
