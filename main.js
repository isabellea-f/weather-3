import { handleSearch } from "./input.js";
import { getCity, getWeather } from "./services.js";

handleSearch(getCity);
getWeather();
