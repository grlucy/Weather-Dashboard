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
      "&units=imperial&mode=json&appid=" +
      apiKey;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Validate search term
      // console.log(response);
      // if (response.message === "city not found") {
      //   alert("City not found.");
      //   return;
      // }

      // Get the date of the search
      let date = moment().format("L");

      // Populate current weather elements with API response data (see https://openweathermap.org/weather-data)
      cityAndDateEl.text(response.name + " (" + date + ")");
      cityAndDateEl.append(
        $(
          '<img src="http://openweathermap.org/img/wn/' +
            response.weather[0].icon +
            '.png">'
        )
      );
      currentTempEl.text(
        "Temperature: " + response.main.temp.toFixed(0) + "°F"
      );
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
      console.log(urlUVI);
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
    });
  });
});
