const apiKEY = "5e55849049a352bcc03680430c989b2a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

let searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

const defaultCity = "Berlin";

// Fetch weather for default city on page load
fetchWeather(defaultCity);

async function fetchWeather(city) {
  const respone = await fetch(apiUrl + city + `&appid=${apiKEY}`);
  let data = await respone.json();
  console.log(data);
  displayWeather(data);
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

  cityElement.innerHTML = cityName;
  tempElement.innerHTML = Math.round(temp) + "°c";
  humidityElement.innerHTML = humidity + "%";
  windElement.innerHTML = windSpeed + "km/h";

  if (weather[0].main == "Clear") {
    weatherIcon.src = "./assets/clear.png";
  } else if (weather[0].main == "Clouds") {
    weatherIcon.src = "./assets/clouds.png";
  } else if (weather[0].main == "Drizzle") {
    weatherIcon.src = "./assets/drizzle.png";
  } else if (weather[0].main == "Rain") {
    weatherIcon.src = "./assets/rain.png";
  } else if (weather[0].main == "Snow") {
    weatherIcon.src = "./assets/snow.png";
  } else if (weather[0].main == "Mist") {
    weatherIcon.src = "./assets/mist.png";
  }
}

searchBtn.addEventListener("click", () => {
  let searchValue = searchInput.value;
  fetchWeather(searchValue);
  searchInput.value = "";
});
