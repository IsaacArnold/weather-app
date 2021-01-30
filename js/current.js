/* ========================================
Global variables
======================================== */
let weather = [];

const submitBtn = document.querySelector("#submit");

const apiCall = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&APPID=b272fdac99f51d0efcc03cb32807f2cc";
const units = "&units=metric";

/* ========================================
API Call - occurs when a user click submit
======================================== */

submitBtn.addEventListener("click", () => {
  // console.log("success");
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
  displayMainInfo();
  displaySecondaryInfo();
}

function displayMainInfo() {
  const informationDiv = document.querySelector(".main-info");

  informationDiv.innerHTML = `
    <h1 class="city">${weather.name}</h1>
    <p class="conditions">${weather.weather[0].main}</p>
    <img class="icon" src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="Icon of weather condition">
    <p class="temp">${weather.main.temp}&#8451</p>
  `;
}

function displaySecondaryInfo() {
  const secondaryInfo = document.querySelector(".secondary-info");
  secondaryInfo.style.display = "flex";
  //  Time convertion method from Aaron Rotteveel's answer on Stackoverflow: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  // Other inspiration from: https://forum.freecodecamp.org/t/sunrise-and-sunset-calculations-for-api-weather-machine/151949
  const sunriseUnix = weather.sys.sunrise;
  const sunrise = new Date(sunriseUnix * 1000);
  const sunriseHours = sunrise.getHours();
  const sunriseMinutes = "0" + sunrise.getMinutes();
  const sunriseTime = `${sunriseHours}:${sunriseMinutes.substr(-2)}`;

  const sunsetUnix = weather.sys.sunset;
  const sunset = new Date(sunsetUnix * 1000);
  const sunsetHours = sunset.getHours();
  const sunsetMinutes = "0" + sunset.getMinutes();
  const sunsetTime = `${sunsetHours}:${sunsetMinutes.substr(-2)}`;

  secondaryInfo.innerHTML = `
    <div class="detailed-temp-info">
      <div class="temp-low">
        <p>Temp Low</p>
        <p>${weather.main.temp_min}&#8451</p>
      </div>
      <div class="temp-high">
        <p>Temp High</p>
        <p>${weather.main.temp_max}&#8451</p>
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
