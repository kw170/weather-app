const form = document.querySelector("form");
const submit = document.querySelector(".sumbit");

form.addEventListener("submit", handleSubmit);

async function fetchWeatherData(location) {
  const response = fetch(
    "'http://api.weatherapi.com/v1/forecast.json?key=b2cd91126b14b2285d45833232007&q=' + 'Anaheim Hills' '&/days=3&aqi=no&alerts=no'",
    {
      mode: "cors",
    },
  );
  console.log(response);

  if (response.ok === true) {
    console.log("Working");
  } else {
    //Show error below search
    const errorText = document.querySelector(".error");
    console.log(errorText);
    errorText.style.display = "block";
  }
}

function handleSubmit(e) {
  e.preventDefault();
  //needs get location  here
  const cityName = form.city.value;
  fetchWeatherData(city);
}
