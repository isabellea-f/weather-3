import { handleSearch, updateList, clearList } from "./input.js";
import { Weather } from "./mainWeather.js";
import { Searched } from "./searchHistory.js";
import { getCity, getWeather } from "./services.js";
import { setWeatherBackground } from "./weatherBackgrounds.js";
import { renderForecast } from "./forecast.js";

const cityList = document.querySelector("#cities");
const inputField = document.querySelector("#search-input");

handleSearch(getCity, updateList);

cityList.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  cityList.innerHTML = "";
  inputField.value = "";

  const data = await getWeather(li.dataset.lat, li.dataset.lon);
  setWeatherBackground(data);

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

  await renderForecast(li.dataset.lat, li.dataset.lon);

  console.log(data);

  clearList();
});

cityList.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key === "Enter" || e.key === " ") e.target.click();
});
navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  console.log(pos);

  const data = await getWeather(lat, lon);
  const weatherItem = document.querySelector(".weather");

  setWeatherBackground(data);

  console.log(lat, lon, data);

  new Weather("Sundsvall", "Sverige", lat, lon, data);
});

document
  .querySelector("#clear-history")
  .addEventListener("click", () => Searched.clearList());

document.querySelector(".col-3").addEventListener("click", async (e) => {
  const weatherItem = document.querySelector(".weather");
  if (weatherItem) weatherItem.remove();

  const card = e.target.closest(".history-card");
  if (!card) return;

  const data = await getWeather(card.dataset.lat, card.dataset.lon);
  new Weather(
    card.dataset.city,
    card.dataset.country,
    card.dataset.lat,
    card.dataset.lon,
    data
  );
  renderForecast(card.dataset.lat, card.dataset.lon);
  setWeatherBackground(data);
});
