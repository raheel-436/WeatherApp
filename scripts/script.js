const apiKEY = "5e55849049a352bcc03680430c989b2a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

let searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

const defaultCity = "Peshawar";

// Fetch weather for default city on page load
fetchWeather(defaultCity);

async function fetchWeather(city) {
  const resposne = await fetch(apiUrl + city + `&appid=${apiKEY}`);

  if (resposne.status == 404) {
    document.querySelector(".error").style.display = "flex";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await resposne.json();
    console.log(data);
    displayWeather(data);
  }
}

function displayWeather(data) {
  let {
    name: cityName,
    main: { temp, humidity },
    wind: { speed: windSpeed },
    weather,
  } = data;

  let cityElement = document.querySelector(".city");
  let tempElement = document.querySelector(".temp");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let weatherIcon = document.querySelector(".weather-img");
  let weatherStatus = document.querySelector(".weather-status");

  cityElement.innerHTML = cityName;
  tempElement.innerHTML = Math.round(temp) + "°c";
  humidityElement.innerHTML = humidity + "%";
  windElement.innerHTML = windSpeed + "km/h";

  if (weather[0].main == "Clear") {
    weatherIcon.src = "./assets/clear.png";
    weatherStatus.innerHTML = "Clear";
  } else if (weather[0].main == "Clouds") {
    weatherIcon.src = "./assets/clouds.png";
    weatherStatus.innerHTML = "Clouds";
  } else if (weather[0].main == "Drizzle") {
    weatherIcon.src = "./assets/drizzle.png";
    weatherStatus.innerHTML = "Drizzle";
  } else if (weather[0].main == "Rain") {
    weatherIcon.src = "./assets/rain.png";
    weatherStatus.innerHTML = "Rain";
  } else if (weather[0].main == "Snow") {
    weatherIcon.src = "./assets/snow.png";
    weatherStatus.innerHTML = "Snow";
  } else if (weather[0].main == "Mist") {
    weatherIcon.src = "./assets/mist.png";
    weatherStatus.innerHTML = "Mist";
  }
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "flex";
}
/*Load Website after this animation*/
setTimeout(function () {
  document.querySelector(".spinner-container").style.display = "none";
  document.querySelector(".container").style.display = "flex";
}, 3000);

searchBtn.addEventListener("click", () => {
  let searchValue = searchInput.value;
  fetchWeather(searchValue);
  searchInput.value = "";
});
