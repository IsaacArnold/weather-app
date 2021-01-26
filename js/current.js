/* ========================================
Global variables
======================================== */
let weather = [];

const submitBtn = document.querySelector("#submit");

const apiCall = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&APPID=b272fdac99f51d0efcc03cb32807f2cc";
const units = "&units=metric";

/* ========================================
API Call - occurs when a user click submit
======================================== */

submitBtn.addEventListener("click", () => {
  // Gets the city the user types and inserts it into the apiUrl
  let city = document.querySelector("#input").value;
  const apiUrl = apiCall + city + apiKey + units;
  //   console.log(city);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => currentWeather(data))
    .catch((err) => console.log(err));
});

function currentWeather(data) {
  weather = data;
  console.log(weather);
  const informationDiv = document.querySelector(".information");
  informationDiv.innerHTML = `
    <p class="city">City: ${weather.name}</p>
    <p class="temp">Temperature: ${weather.main.temp}</p>
    <p class="temp-high">Temperature High: ${weather.main.temp_max}</p>
    <p class="temp-low">Temperature Low: ${weather.main.temp_min}</p>
    <p class="conditions">Weather conditions: ${weather.weather[0].main}</p>
    <p class="humidity">Humidity: ${weather.main.humidity}%</p>
  `;
}
