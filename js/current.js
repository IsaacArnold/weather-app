/* ========================================
Global variables
======================================== */
let weather = [];
let forecast = [];

const secondaryInfo = document.querySelector(".secondary-info");
const todayBtn = document.querySelector("#today");
const forecastBtn = document.querySelector("#forecast");
const submitBtn = document.querySelector("#submit");
const forecastGrid = document.querySelector(".forecast-grid");
const forecastInfoDiv = document.querySelector(".forecast-info");

const currentWeatherApiCall =
  "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&APPID=b272fdac99f51d0efcc03cb32807f2cc";
const units = "&units=metric";

/* ========================================
API Call - occurs when a user click submit
======================================== */

submitBtn.addEventListener("click", () => {
  // Gets the city the user types and inserts it into the apiUrl
  let city = document.querySelector("#input").value;
  const currentWeatherApiUrl = currentWeatherApiCall + city + apiKey + units;
  // const forecastWeatherApiUrl = forecastWeatherApiCall + city + apiKey + units;

  fetch(currentWeatherApiUrl)
    .then((response) => response.json())
    .then((data) => currentWeather(data))
    .catch((err) => console.log(err));
});

function currentWeather(data) {
  weather = data;
  displayMainInfo();
  displaySecondaryInfo();
  console.log(weather);
  lat = weather.coord.lat;
  lon = weather.coord.lon;

  const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely&APPID=b272fdac99f51d0efcc03cb32807f2cc&units=metric`;

  // Placing this fetch() inside the currentWeather function so that we can use the lon & lat of the current city the user searches
  fetch(oneCallUrl)
    .then((response) => response.json())
    .then((details) => forecastWeather(details))
    .catch((err) => console.log(err));
}

function forecastWeather(details) {
  forecast = details;
  // console.log(forecast);
  // console.log(forecast.list[2].main.temp);
}

document.addEventListener("click", (e) => {
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
  // console.log(forecast);
  secondaryInfo.style.display = "";
  dates = forecast.daily;

  let forecastHTML = "";

  dates.forEach((day) => {
    let conditions = day.weather[0].main;
    let minTemp = Math.round(day.temp.min);
    let maxTemp = Math.round(day.temp.max);
    let icon = day.weather[0].icon;
    let timestamp = day.dt;
    let d = new Date(timestamp * 1000);
    let formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    })
      .format(d)
      .substr(0, 6);

    forecastHTML += `
    <div class="forecast-info">
      <p>${formattedDate}</p>
      <p>${conditions}</p>
      <p>${icon}</p>
      <p>Min: ${minTemp}&#8451</p>
      <p>Max: ${maxTemp}&#8451</p>               
    </div> 
    `;

    // console.log(forecastHTML);
  });

  secondaryInfo.innerHTML = `
      <div class="day">
        <p id="today">Today</p>
        <p id="forecast">Forecast</p>
      </div>
      <div class="forecast-grid">
        <div class="forecast-info">
          <p>${formattedDate}</p>
          <p>${conditions}</p>
          <p>${icon}</p>
          <p>Min: ${minTemp}&#8451</p>
          <p>Max: ${maxTemp}&#8451</p>               
        </div> 
      </div>
    `;

  // forecastGrid.innerHTML = forecastHTML;

  // console.log(forecastGrid);
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
