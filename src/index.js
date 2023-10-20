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

/*async function populateForecastIcons() {
  const requestURL = "descriptions.JSON";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const forecastIcons = await response.json();

  getSearchResults(forecastIcons);
}*/

function getSearchResults(event, obj) {
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

    console.log(response);
    getForecastData(response.data.coord);
  }

  function getForecastData(coordinates) {
    console.log(coordinates);
    function displayDailyForecast(response) {
      function getDayFromDate(dateString) {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
      }
      let forecastElement = document.querySelector("#forecast");
      console.log(response);
      let forecastHTML = ``;
      //function getIcons(obj) {
      for (i = 1; i < 7; i++) {
        let day = getDayFromDate(response.data.daily.time[i].toString());
        let maxTemp = Math.round(response.data.daily.temperature_2m_max[i]);
        let minTemp = Math.round(response.data.daily.temperature_2m_min[i]);
        //let weatherDescr = response.data.daily.weathercode[i].toString();
        forecastHTML =
          forecastHTML +
          `<div class=column_container width=100% id="forecastDay">
            <p id="dayInWeek">${day}</p>
            <span class="row_container" id="maxAndMinTemp">
              <p id="max">${maxTemp}°</p>
              <p id="min">${minTemp}°</p>
            </span>
          </div>
          `;
        forecastElement.innerHTML = forecastHTML;
      }
      //}
    }

    let apiKey = "578a0dfaf14c841b5e058f559db8e562";
    let apiUrlForEachDay = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
    axios.get(apiUrlForEachDay).then(displayDailyForecast);
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
