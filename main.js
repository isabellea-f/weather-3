import { handleSearch, updateList } from "./input.js";
import { Weather } from "./mainWeather.js";
import { Searched } from "./searchHistory.js";
import { getCity, getWeather } from "./services.js";

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

  new Searched(li.dataset.name, data);

  console.log(data);
});
