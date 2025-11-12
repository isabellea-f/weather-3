import { handleSearch, updateList } from "./input.js";
import { Weather } from "./mainWeather.js";
import { Searched } from "./searchHistory.js";
import { getCity, getWeather } from "./services.js";

const searchField = document.getElementById("search-input");

const locationContainer = document.querySelector(".location-container");
const temperatureContainer = document.querySelector(".temperature-container");
const forecastContainer = document.querySelector(".forecast-container");

const cityList = document.querySelector("#cities");
const inputField = document.querySelector("#search-input");

handleSearch(getCity, updateList);

cityList.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  cityList.innerHTML = "";
  inputField.value = "";

  const data = await getWeather(li.dataset.lat, li.dataset.lon);

  const weatherItem = document.querySelector(".weather");
  if (weatherItem) weatherItem.remove();

  new Weather(
    li.dataset.name,
    li.dataset.country,
    li.dataset.lat,
    li.dataset.lon,
    data
  );

  new Searched(
    li.dataset.name,
    li.dataset.country,
    li.dataset.lat,
    li.dataset.lon,
    data
  );

  console.log(data);
});
const cityName = document.createElement("h2");
cityName.textContent = result.location.name;

const cityRegion = document.createElement("h3");
cityRegion.textContent = result.location.region;

const cityCountry = document.createElement("p");
cityCountry.textContent = result.location.country;

locationContainer.appendChild(cityName);
locationContainer.appendChild(cityRegion);
locationContainer.appendChild(cityCountry);

const currentTemp = document.createElement("p");
currentTemp.classList.add("current-temp");
currentTemp.innerHTML =
  result.current.temp_c + "<span class='degree'>°C</span>";

const currentCondition = document.createElement("p");
currentCondition.textContent = result.current.condition.text;

temperatureContainer.appendChild(currentTemp);
temperatureContainer.appendChild(currentCondition);

/* Dynamic background */
const currentConditionCode = result.current.condition.code;
let background = backgrounds[currentConditionCode];

document.body.style.backgroundImage = "url('images/" + background + "')";

navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  const data = await getWeather(lat, lon);
  const weatherItem = document.querySelector(".weather");

  console.log(lat, lon, data);

  new Weather("Position", "", lat, lon, data);
});
