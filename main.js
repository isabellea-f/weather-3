import { handleSearch, updateList } from "./input.js";
import { getCity, getWeather } from "./services.js";

handleSearch(getCity, updateList);
