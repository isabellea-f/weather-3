import { handleSearch, updateList } from "./input.js";
import { Weather } from "./mainWeather.js";
import { getCity, getWeather } from "./services.js";

const searchField = document.getElementById("search-input");

const locationContainer = document.querySelector(".location-container");
const temperatureContainer = document.querySelector(".temperature-container");
const forecastContainer = document.querySelector(".forecast-container");

const cityList = document.querySelector("#cities");

handleSearch(getCity, updateList);

cityList.addEventListener("click", async (e) => {
  const li = e.target.closest("li");

  const data = await getWeather(li.dataset.lat, li.dataset.lon);

  new Weather(
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
