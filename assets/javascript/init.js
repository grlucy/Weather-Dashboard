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
      if (!navigator.geolocation) {
        return;
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }
  }

  function success(position) {
    // Get coordinates from Geolocation API
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Search Openweather API using coordinates to get city name
    let geolocateURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&mode=json&appid=${apiKey}`;
    $.ajax({
      url: geolocateURL,
      method: "GET"
    }).then(function(respon) {
      city = respon.name;
      // Use city name to populate weather and forecast
      clickStatus = true;
      getWeather(city);
    });
  }
  function error() {
    alert("Unable to find your location.");
  }
  init();
}); // end of document ready function
