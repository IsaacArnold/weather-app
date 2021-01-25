/* ========================================
Global variables
======================================== */
const submitBtn = document.querySelector("#submit");

const apiCall = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&APPID=b272fdac99f51d0efcc03cb32807f2cc";
const units = "&units=metric";

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
