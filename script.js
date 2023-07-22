const form = document.querySelector("form");
const submit = document.querySelector(".submit");

const units = document.querySelector(".units");

form.addEventListener("submit", handleSubmit);
units.addEventListener("click", changeUnits);

function fetchWeatherData(cityName) {
  // ${location}
  //Get fetch and variable to work
  const location = "Anaheim";
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b2cd91126b1e4b2285d45833232007&q=${location}&days=3&aqi=no&alerts=no`,
    {
      mode: "cors",
    },
  )
    .then((response) => {
      if (response.ok) {
        const errorText = document.querySelector(".error");
        errorText.style.display = "none";
        return response.json();
      } else {
        const errorText = document.querySelector(".error");
        errorText.style.display = "block";
        console.log("ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      const currentData = storeCurrentData(data);
      displayDate();
      displayData(currentData);
    });
}
function handleSubmit(e) {
  e.preventDefault();
  const cityName = form.city.value;
  fetchWeatherData(cityName);
}

function changeUnits() {
  if (units.textContent == "Display °F") {
    units.textContent = "Display °C";
  } else units.textContent = "Display °F";
}
function storeCurrentData(data) {
  const currentData = {
    location: data.location.name,
    temp: {
      temp_f: data.current.temp_f,
      temp_c: data.current.temp_c,
    },
    condition: data.current.condition.text,
    humidity: data.current.humidity,
    feelsLike: {
      feelsLike_f: data.current.feelslike_f,
      feelsLike_c: data.current.feelslike_c,
    },
    windSpeed: data.current.gust_mph,
  };

  console.log(currentData.location);
  return currentData;
}

function displayData(currentData) {
  const location = document.querySelector(".location-name");
  const temperature = document.querySelector(".temperature");
  const weather = document.querySelector(".weather-type");
  const feel = document.querySelector(".feel-temperature");
  const humidity = document.querySelector(".humidity-percent");
  const windSpeed = document.querySelector(".wind-speed");

  if (units.textContent === "Display °F") {
    temperature.textContent = Math.round(currentData.temp.temp_f) + "°";
    feel.textContent = Math.round(currentData.feelsLike.feelsLike_f) + "°";
  } else {
    temperature.textContent = Math.round(currentData.temp.temp_c) + "°";
    feel.textContent = Math.round(currentData.feelsLike.feelsLike_c) + "°";
  }
  location.textContent = currentData.location;
  weather.textContent = currentData.condition;
  humidity.textContent = currentData.humidity + "%";
  windSpeed.textContent = Math.round(currentData.windSpeed) + " m/h";
}

function displayDate() {
  const date = new Date();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[day];

  let month = date.getMonth();
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  month = monthsOfYear[month];
  const dayNum = date.getDate();
  const dateDisplay = document.querySelector(".date");
  dateDisplay.textContent = day + " | " + month + " " + dayNum;
}

//TO DO
//3 day forecast
//change data on unit change
//preload page with data from anaheim hills
//fix date

function onStart() {
  fetchWeatherData("Anaheim Hills");
}

onStart();
