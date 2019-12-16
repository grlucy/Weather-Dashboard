function getWeather() {
  // Search OpenWeather API for current weather for city
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&mode=json&appid=" +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
    // Validate search term
    error: function() {
      alert("City not found.");
    }
  }).then(function(response) {
    // Save city to localStorage and update search history div
    saveCity(city);
    createSearchButtons();

    // Get the date of the search
    let date = moment.unix(response.dt).format("MM/DD/YYYY");

    // Populate current weather elements with API response data (see https://openweathermap.org/weather-data)
    cityAndDateEl.text(response.name + " (" + date + ")");
    cityAndDateEl.append(
      $(
        '<img src="http://openweathermap.org/img/wn/' +
          response.weather[0].icon +
          '.png">'
      )
    );
    currentTempEl.text("Temperature: " + response.main.temp.toFixed(0) + "°F");
    currentHumidityEl.text("Humidity: " + response.main.humidity + "%");
    currentWindEl.text(
      "Wind Speed: " + response.wind.speed.toFixed(1) + " MPH"
    );

    // Change jumbotron background image depending on weather conditions
    $("#weatherBG").removeClass("clear");
    $("#weatherBG").removeClass("rain");
    $("#weatherBG").removeClass("snow");
    $("#weatherBG").removeClass("cloud");
    if (response.weather[0].main === "Clear") {
      $("#weatherBG").addClass("clear");
    } else if (
      response.weather[0].main === "Rain" ||
      response.weather[0].main === "Drizzle" ||
      response.weather[0].main === "Thunderstorm"
    ) {
      $("#weatherBG").addClass("rain");
    } else if (response.weather[0].main === "Snow") {
      $("#weatherBG").addClass("snow");
    } else {
      $("#weatherBG").addClass("cloud");
    }

    // UV INDEX

    // Get lat and lon from API response
    let lat = response.coord.lat;
    let lon = response.coord.lon;

    // Create UVI API call
    let urlUVI = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    $.ajax({
      url: urlUVI,
      method: "GET"
    }).then(function(res) {
      // Get UV index value from UVI API response
      let uv = res.value;
      currentUVEl.text(uv);
      // Set color of UV Index depending on threat level
      if (uv < 3) {
        currentUVEl.css("background-color", "green");
      } else if (uv < 6) {
        currentUVEl.css("background-color", "#eda91e");
      } else if (uv < 8) {
        currentUVEl.css("background-color", "#ff6901");
      } else {
        currentUVEl.css("background-color", "red");
      }
    });
  }); // End of current weather API call

  // 5-DAY FORECAST

  // Create 5-day forecast API call
  let forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&mode=json&appid=${apiKey}`;
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function(resp) {
    // Clear prior forecast
    forecastDiv.empty();
    // Append new elements to page for each forecast day
    for (let i = 7; i < resp.list.length; i += 8) {
      let forecastDate = moment.unix(resp.list[i].dt).format("MM/DD/YYYY");
      let newForecastDiv = $("<div>").addClass("innerForecastDiv");
      let newForecastDateEl = $("<h6>").text(forecastDate);
      newForecastDiv.append(newForecastDateEl);
      newForecastDiv.append(
        $(
          '<img src="http://openweathermap.org/img/wn/' +
            resp.list[i].weather[0].icon +
            '.png">'
        )
      );
      newForecastDiv.append(
        $("<p>").text(resp.list[i].main.temp.toFixed(0) + "°F")
      );
      newForecastDiv.append(
        $("<p>").text(resp.list[i].main.humidity + "% humidity")
      );
      forecastDiv.append(newForecastDiv);
    }
  });
}
