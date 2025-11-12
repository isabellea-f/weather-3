
import { handleSearch, updateList } from "./input.js";
import { Weather } from "./mainWeather.js";
import { getCity, getWeather } from "./services.js";
import { renderForecast } from "./forecast.js";

const cityList = document.querySelector("#cities");


handleSearch(getCity, updateList);

// When user clicks a city
cityList.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  try {
    // Fetch main weather data
    const data = await getWeather(li.dataset.lat, li.dataset.lon);

    // Render main weather display
    new Weather(
      li.dataset.name,
      li.dataset.country,
      li.dataset.lat,
      li.dataset.lon,
      data
    );

    // Load and display the forecast automatically
    await renderForecast(li.dataset.lat, li.dataset.lon);

    console.log(data);
  } catch (err) {
    console.error("Error loading weather:", err);
  }
});


