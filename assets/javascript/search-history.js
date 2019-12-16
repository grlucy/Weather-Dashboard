// Create array of cities
let city;
let cityArray = [];

// Create function to save city to localStorage
function saveCity() {
  // Push most recent city searched to cityArray
  cityArray.push(city);
  localStorage.setItem("cityHistory", JSON.stringify(cityArray));
}
