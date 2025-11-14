export class Weather {
  constructor(city, country, lat, lon, data) {
    this.city = city;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
    this.data = data;
    this.displayWeather();
  }

  displayWeather() {
    document.querySelector(".col-1").innerHTML = "";
    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weather");

    document.querySelector(".col-1").appendChild(weatherContainer);
    /*     document.body.appendChild(weatherContainer); */

    weatherContainer.ariaAtomic = "true";
    weatherContainer.ariaLive = "polite";

    const currentCity = document.createElement("h3");
    const currentCountry = document.createElement("h3");

    currentCity.textContent = this.city;
    currentCountry.textContent = this.country;

    const currentWeather = document.createElement("p");
    currentWeather.classList = "current-temp";

    currentWeather.textContent = this.data.current.temperature_2m;

    const celsiusSpan = document.createElement("span");
    celsiusSpan.classList.add("temp-c");
    celsiusSpan.textContent = "C°";

    currentWeather.appendChild(celsiusSpan);

    weatherContainer.append(currentCity, currentCountry, currentWeather);
  }
}
