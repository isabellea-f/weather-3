import { handleSearch, updateList } from "./input.js";
import { Weather } from "./mainWeather.js";
import { getCity, getWeather } from "./services.js";

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

  console.log(data);
});

navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  const data = await getWeather(lat, lon);
  const weatherItem = document.querySelector(".weather");

  console.log(lat, lon, data);

  new Weather("Position", "", lat, lon, data);
});
