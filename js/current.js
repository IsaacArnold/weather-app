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
  const informationDiv = document.querySelector(".main-info");
  const secondaryInfo = document.querySelector(".secondary-info");
  informationDiv.innerHTML = `
    <h1 class="city">${weather.name}</h1>
    <p class="conditions">${weather.weather[0].main}</p>
    <img class="icon" src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="Icon of weather condition">
    <p class="temp">${weather.main.temp}&#8451</p>
  `;

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
  `;
}
