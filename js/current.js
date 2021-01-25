/* ========================================
Global variables
======================================== */
const submitBtn = document.querySelector("#submit");

const apiCall = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = config.MY_API_TOKEN;
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
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
