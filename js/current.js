/* ========================================
Global variables
======================================== */
let weather = [];
let forecast = [];

const secondaryInfo = document.querySelector(".secondary-info");
const todayBtn = document.querySelector("#today");
const forecastBtn = document.querySelector("#forecast");
const submitBtn = document.querySelector("#submit");

const currentWeatherApiCall =
  "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastWeatherApiCall =
  "https://api.openweathermap.org/data/2.5/forecast?q=";
const apiKey = "&APPID=b272fdac99f51d0efcc03cb32807f2cc";
const units = "&units=metric";

/* ========================================
API Call - occurs when a user click submit
======================================== */

submitBtn.addEventListener("click", () => {
  // Gets the city the user types and inserts it into the apiUrl
  let city = document.querySelector("#input").value;
  const currentWeatherApiUrl = currentWeatherApiCall + city + apiKey + units;
  const forecastWeatherApiUrl = forecastWeatherApiCall + city + apiKey + units;

  fetch(currentWeatherApiUrl)
    .then((response) => response.json())
    .then((data) => currentWeather(data))
    .catch((err) => console.log(err));

  fetch(forecastWeatherApiUrl)
    .then((response) => response.json())
    .then((data) => forecastWeather(data))
    .catch((err) => console.log(err));
});

function currentWeather(data) {
  weather = data;
  displayMainInfo();
  displaySecondaryInfo();
  // console.log(weather);
}

function forecastWeather(data) {
  forecast = data;
  console.log(forecast);
  console.log(forecast.list[2].main.temp);
}

document.body.addEventListener("click", (e) => {
  if (e.target && e.target.id == "forecast") {
    displayForecastInfo();
  }
  if (e.target && e.target.id == "today") {
    displayMainInfo();
    displaySecondaryInfo();
  }
});
/* ========================================
Functions
======================================== */

function displayMainInfo() {
  const informationDiv = document.querySelector(".main-info");

  informationDiv.innerHTML = `
    <h1 class="city">${weather.name}, ${weather.sys.country}</h1>
    <p class="conditions">${weather.weather[0].main}</p>
    <img class="icon" src="http://openweathermap.org/img/wn/${
      weather.weather[0].icon
    }@2x.png" alt="Icon of weather condition">
    <p class="temp">${Math.round(weather.main.temp)}&#8451</p>
  `;
}

function displaySecondaryInfo() {
  secondaryInfo.style.display = "";
  //  Time convertion method from Aaron Rotteveel's answer on Stackoverflow: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  // Other inspiration from: https://forum.freecodecamp.org/t/sunrise-and-sunset-calculations-for-api-weather-machine/151949
  const sunriseUnix = weather.sys.sunrise;
  const sunrise = new Date(sunriseUnix * 1000);
  const sunriseHours = sunrise.getHours();
  const sunriseMinutes = "0" + sunrise.getMinutes();
  const sunriseTime = `${sunriseHours}:${sunriseMinutes.substr(-2)}`;

  const sunsetUnix = weather.sys.sunset;
  const sunset = new Date(sunsetUnix * 1000);
  const sunsetHours = sunset.getHours() % 12;
  const sunsetMinutes = "0" + sunset.getMinutes();
  const sunsetTime = `${sunsetHours}:${sunsetMinutes.substr(-2)}`;

  secondaryInfo.innerHTML = `
    <div class="day">
      <p id="today">Today</p>
      <p id="forecast">Forecast</p>
    </div>
    <div class="detailed-temp-info">
      <div class="temp-low">
        <p>Temp Low</p>
        <p>${Math.round(weather.main.temp_min)}&#8451</p>
      </div>
      <div class="temp-high">
        <p>Temp High</p>
        <p>${Math.round(weather.main.temp_max)}&#8451</p>
      </div>
      <div class="humidity">
        <p>Humidity</p>
        <p>${weather.main.humidity}&#x00025</p>
      </div>
    </div>
    <div class="sun-info">
      <div class="sunrise">
        <img src="images/sunrise.svg" class="sunrise-icon" alt="Icon of sunrise">
        <p class="sunrise-time">${sunriseTime}</p>
      </div>
      <div class="sunset">
        <img src="images/sunset.svg" class="sunset-icon" alt="Icon of sunset">
        <p class="sunset-time">${sunsetTime}</p>
      </div>            
    </div> 
  `;
}

function displayForecastInfo() {
  secondaryInfo.style.display = "";

  secondaryInfo.innerHTML = `
    <div class="day">
      <p id="today">Today</p>
      <p id="forecast">Forecast</p>
    </div>
    <div class="detailed-temp-info">
      <div class="temp-low">
        <p>Forecast</p>
        <p>${Math.round(weather.main.temp_min)}&#8451</p>
      </div>
      <div class="temp-high">
        <p>Temp High</p>
        <p>${Math.round(weather.main.temp_max)}&#8451</p>
      </div>
      <div class="humidity">
        <p>Humidity</p>
        <p>${weather.main.humidity}&#x00025</p>
      </div>
    </div>
    <div class="sun-info">
      <div class="sunrise">
        <img src="images/sunrise.svg" class="sunrise-icon" alt="Icon of sunrise">
        <p class="sunrise-time"></p>
      </div>
      <div class="sunset">
        <img src="images/sunset.svg" class="sunset-icon" alt="Icon of sunset">
        <p class="sunset-time"></p>
      </div>            
    </div> 
  `;
}

/* ====================================
Mobile viewport script
-- Addresses the issue of mobile browser UI with 100vh
=====================================*/
// Listens for when the browser is resized
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
// Adds a listener to the refreshing of the page
window.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
