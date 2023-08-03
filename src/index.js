let searching = document.querySelector(".searchBar");
let celsius = document.querySelector("#signC");
let fahrenheit = document.querySelector("#signF");

let city = document.querySelector("#city_name");
let lastUpdated = document.querySelector("#date_and_time");
let temp = document.querySelector("#temperature");
let icon = document.querySelector("#icon");
let humidity = document.querySelector("#humidity");
let visibility = document.querySelector("#visibility");
let wind = document.querySelector("#wind");

function getSearchResults(event) {
  event.preventDefault();
  let searchRes = document.querySelector("#searched_city").value.toLowerCase();
  let datum = new Date();
  let d = datum.getDate();
  let m = datum.getMonth();
  let y = datum.getFullYear();
  let h = datum.getHours();
  let min = datum.getMinutes();
  function presentWeatherData(response) {
    city.innerHTML = searchRes.toUpperCase();
    lastUpdated.innerHTML = `Last updated on ${d}/${m}/${y} at ${h}:${min} h`;
    temp.innerHTML = Math.round(response.data.main.temp);
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("title", response.data.weather[0].description);
    humidity.innerHTML = "Humidity: " + response.data.main.humidity + " %";
    visibility.innerHTML = "Visibility: " + response.data.visibility + " km";
    wind.innerHTML = "Wind: " + response.data.wind.speed + " km/h";
  }
  let apiKey = "578a0dfaf14c841b5e058f559db8e562";
  let apiUrlCel = `https://api.openweathermap.org/data/2.5/weather?q=${searchRes}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCel).then(presentWeatherData);
}

function getCelsiusTemp(event) {
  event.preventDefault();
  fahrenheit.style.color = "rgb(136, 17, 204)";
  celsius.style.color = "rgb(44, 44, 44)";
  function showCelsius(response) {
    temp.innerHTML = Math.round(response.data.main.temp);
  }
  let searchRes = document.querySelector("#searched_city").value.toLowerCase();
  let apiKey = "578a0dfaf14c841b5e058f559db8e562";
  let apiUrlCel = `https://api.openweathermap.org/data/2.5/weather?q=${searchRes}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCel).then(showCelsius);
}

function getFahrenheitTemp(event) {
  event.preventDefault();
  celsius.style.color = "rgb(136, 17, 204)";
  fahrenheit.style.color = "rgb(44, 44, 44)";
  function showFahrenheit(response) {
    temp.innerHTML = Math.round(response.data.main.temp);
  }
  let searchRes = document.querySelector("#searched_city").value.toLowerCase();
  let apiKey = "578a0dfaf14c841b5e058f559db8e562";
  let apiUrlFahr = `https://api.openweathermap.org/data/2.5/weather?q=${searchRes}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrlFahr).then(showFahrenheit);
}

searching.addEventListener("submit", getSearchResults);
celsius.addEventListener("click", getCelsiusTemp);
fahrenheit.addEventListener("click", getFahrenheitTemp);
