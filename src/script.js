function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    hours = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
  let apiKey = "8c44a83622eddf5500fe2285946c1857";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(farenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let currentCity = document.querySelector("#city-form");
currentCity.addEventListener("submit", handleSubmit);

search("Houston");
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", displayFarenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemp);
