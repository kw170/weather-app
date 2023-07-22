const form = document.querySelector("form");
const submit = document.querySelector(".submit");

const units = document.querySelector(".units");

form.addEventListener("submit", handleSubmit);
units.addEventListener("click", changeUnits);

function fetchWeatherData(cityName) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b2cd91126b1e4b2285d45833232007&q=${cityName}&days=3&aqi=no&alerts=no`,
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
      displayData(data, currentData);
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
  const location = document.querySelector(".location-name");
  fetchWeatherData(location.textContent);
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
    windSpeed: {
      windSpeed_c: data.current.gust_kph,
      windSpeed_f: data.current.gust_mph,
    },
  };

  console.log(currentData.location);
  return currentData;
}
function displayData(data, currentData) {
  displayCurrentData(currentData);
  displayForecast(data);
}

function displayCurrentData(currentData) {
  const location = document.querySelector(".location-name");
  const temperature = document.querySelector(".temperature");
  const weather = document.querySelector(".weather-type");
  const feel = document.querySelector(".feel-temperature");
  const humidity = document.querySelector(".humidity-percent");
  const windSpeed = document.querySelector(".wind-speed");

  if (units.textContent === "Display °F") {
    temperature.textContent = Math.round(currentData.temp.temp_f) + "°";
    feel.textContent = Math.round(currentData.feelsLike.feelsLike_f) + "°";
    windSpeed.textContent =
      Math.round(currentData.windSpeed.windSpeed_f) + " m/h";
  } else {
    temperature.textContent = Math.round(currentData.temp.temp_c) + "°";
    feel.textContent = Math.round(currentData.feelsLike.feelsLike_c) + "°";
    windSpeed.textContent =
      Math.round(currentData.windSpeed.windSpeed_c) + " k/h";
  }
  location.textContent = currentData.location;
  weather.textContent = currentData.condition;
  humidity.textContent = currentData.humidity + "%";
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

function displayForecast(data) {
  const days = document.querySelectorAll(".days");
  const units = document.querySelector(".units");
  const forecast = storeForecast(data);
  let index = 0;
  days.forEach((node) => {
    const date = new Date();
    let today = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dayIndex = today + index;
    if (dayIndex > 6) {
      dayIndex -= 6;
    }
    today = days[dayIndex];

    const day = node.querySelector(".day");
    const high = node.querySelector(".high");
    const low = node.querySelector(".low");
    const icon = node.querySelector(".weather-type-img");

    const iconUrl = forecast[index].icon;
    icon.src = iconUrl;

    day.textContent = today.toUpperCase().substr(0, 3);

    if (units.textContent == "Display °F") {
      high.textContent = forecast[index].high.high_f;
      low.textContent = forecast[index].low.low_f;
    } else {
      high.textContent = forecast[index].high.high_c;
      low.textContent = forecast[index].low.low_c;
    }
    index++;
  });
}

function storeForecast(data) {
  const forecast = [
    {
      high: {
        high_f: Math.round(data.forecast.forecastday[0].day.maxtemp_f) + "°",
        high_c: Math.round(data.forecast.forecastday[0].day.maxtemp_c) + "°",
      },
      low: {
        low_f: Math.round(data.forecast.forecastday[0].day.mintemp_f) + "°",
        low_c: Math.round(data.forecast.forecastday[0].day.mintemp_c) + "°",
      },
      icon: data.forecast.forecastday[0].day.condition.icon,
    },

    {
      high: {
        high_f: Math.round(data.forecast.forecastday[1].day.maxtemp_f) + "°",
        high_c: Math.round(data.forecast.forecastday[1].day.maxtemp_c) + "°",
      },
      low: {
        low_f: Math.round(data.forecast.forecastday[1].day.mintemp_f) + "°",
        low_c: Math.round(data.forecast.forecastday[1].day.mintemp_c) + "°",
      },
      icon: data.forecast.forecastday[1].day.condition.icon,
    },

    {
      high: {
        high_f: Math.round(data.forecast.forecastday[2].day.maxtemp_f) + "°",
        high_c: Math.round(data.forecast.forecastday[2].day.maxtemp_c) + "°",
      },
      low: {
        low_f: Math.round(data.forecast.forecastday[2].day.mintemp_f) + "°",
        low_c: Math.round(data.forecast.forecastday[2].day.mintemp_c) + "°",
      },
      icon: data.forecast.forecastday[2].day.condition.icon,
    },
  ];
  return forecast;
}

//TO DO
//3 day forecast

function onStart() {
  fetchWeatherData("Anaheim Hills");
}

onStart();
