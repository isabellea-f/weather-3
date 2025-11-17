import { handleSearch, updateList, clearList } from "./input.js";
import { loadFromLocalStorage } from "./utils/localStorage.js";
import { Weather } from "./mainWeather.js";
import { Searched } from "./searchHistory.js";
import { getCity, getWeather } from "./services.js";
import { setWeatherBackground } from "./weatherBackgrounds.js";
import { renderForecast } from "./forecast.js";

const cityList = document.querySelector("#cities");
const inputField = document.querySelector("#search-input");

renderOnLoad();

handleSearch(getCity, updateList);

cityList.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  cityList.innerHTML = "";
  inputField.value = "";

  const data = await getWeather(li.dataset.lat, li.dataset.lon);
  setWeatherBackground(data);

  // const weatherItem = document.querySelector(".weather");
  // if (weatherItem) weatherItem.remove();

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

  // new Weather("Sundsvall", "Sverige", lat, lon, data);
});

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
  renderForecast(card.dataset.lat, card.dataset.lon);
  setWeatherBackground(data);
});

async function renderOnLoad() {
  Searched.prevList = loadFromLocalStorage("weather-history");
  const main = Searched.prevList[0];
  console.log(Searched.prevList);

  const data = await getWeather(main.lat, main.lon);

  new Weather(main.city, main.country, main.lat, main.lon, data);
  new Searched(main.city, main.country, main.lat, main.lon, data);

  renderForecast(main.lat, main.lon);
  setWeatherBackground(data);
}
