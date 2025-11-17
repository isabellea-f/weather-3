import { handleSearch, updateList, clearList } from "./input.js";
import { loadFromLocalStorage } from "./utils/localStorage.js";
import { Weather } from "./mainWeather.js";
import { Searched } from "./searchHistory.js";
import { getCity, getWeather } from "./services.js";
import { setWeatherBackground } from "./weatherBackgrounds.js";
import { renderForecast } from "./forecast.js";
import { getPosition } from "./utils/geolocation.js";

const cityList = document.querySelector("#cities");
const inputField = document.querySelector("#search-input");

init();

handleSearch(getCity, updateList);

cityList.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  cityList.innerHTML = "";
  inputField.value = "";

  const data = await getWeather(li.dataset.lat, li.dataset.lon);
  setWeatherBackground(data);

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

  renderForecast(li.dataset.lat, li.dataset.lon);

  clearList();
});

cityList.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key === "Enter" || e.key === " ") e.target.click();
});

// navigator.geolocation.getCurrentPosition(async (pos) => {
//   if (pos) {
//     console.log(pos);
//     const lat = pos.coords.latitude;
//     const lon = pos.coords.longitude;
//     const data = await getWeather(lat, lon);
//     new Weather("Din plats", "", lat, lon, data);
//     new Searched("Din plats", "", lat, lon, data);
//     await renderForecast(lat, lon);
//     setWeatherBackground(data);
//     await renderOnLoad();
//   } else {
//     await renderOnLoad();
//   }
//   // new Weather("Sundsvall", "Sverige", lat, lon, data);
// });

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("clear-history")) {
    Searched.clearList();
  }
});

document.querySelector(".col-3").addEventListener("click", async (e) => {
  // const weatherItem = document.querySelector(".weather");
  // if (weatherItem) weatherItem.remove();

  const deleteHistoryCard = e.target.closest(".delete-history");

  if (deleteHistoryCard) {
    Searched.deleteCard(
      deleteHistoryCard.parentElement.dataset.lat,
      deleteHistoryCard.parentElement.dataset.lon
    );

    //remove history card
    deleteHistoryCard.parentElement.remove();

    const remainingCards = document.querySelectorAll(".history-card");

    //if no remaining cards, remove clear history button
    if (remainingCards.length === 0) {
      const clearHistoryButton = document.querySelector(".clear-history");
      if (clearHistoryButton) clearHistoryButton.remove();
    }

    return;
  }

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
  await renderForecast(card.dataset.lat, card.dataset.lon);
  setWeatherBackground(data);
});

async function init() {
  Searched.prevList = loadFromLocalStorage("weather-history");

  try {
    const pos = await getPosition();
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const data = await getWeather(lat, lon);
    new Weather("Din plats", "", lat, lon, data);
    new Searched("Din plats", "", lat, lon, data);
    await renderForecast(lat, lon);
    setWeatherBackground(data);
    return;
  } catch (error) {
    console.log("Geolocation failed", error);
  }
  const main = Searched.prevList[0];

  // Fallback if no geolocation and no history
  if (!main) {
    const fallback = {
      city: "Bajša",
      country: "Serbia",
      lat: "45.77989",
      lon: "19.58515",
    };
    const data = await getWeather(fallback.lat, fallback.lon);
    new Weather(
      fallback.city,
      fallback.country,
      fallback.lat,
      fallback.lon,
      data
    );
    setWeatherBackground(data);
    await renderForecast(fallback.lat, fallback.lon);
    return;
  }

  const data = await getWeather(main.lat, main.lon);

  new Weather(main.city, main.country, main.lat, main.lon, data);
  new Searched(main.city, main.country, main.lat, main.lon, data);

  await renderForecast(main.lat, main.lon);
  setWeatherBackground(data);
}
