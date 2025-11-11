import { handleSearch } from "./input.js";
import { getCity, getForecast } from "./services.js";

handleSearch(getCity);
getForecast();
