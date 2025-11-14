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

    const currentCity = document.createElement("h2");
    const currentCountry = document.createElement("h3");

    currentCity.textContent = this.city;
    currentCountry.textContent = this.country;

    /* Current temp */
    const currentWeather = document.createElement("p");
    currentWeather.classList = "current-temp";

    currentWeather.textContent = this.data.current.temperature_2m;

    const celsiusSpan = document.createElement("span");
    celsiusSpan.classList.add("temp-c");
    celsiusSpan.textContent = "C°";

    /* Feels like */
    const currentFeelsLike = document.createElement("P");
    currentFeelsLike.textContent = `Feels like: ${this.data.current.apparent_temperature}c°`;
    currentFeelsLike.classList.add("additional-info");

    /* Wind speed */
    const currentWindSpeed = document.createElement("p");
    currentWindSpeed.textContent = `Current wind speed: ${this.data.current.wind_speed_10m} m/s`;
    currentWindSpeed.classList.add("additional-info");

    currentWeather.appendChild(celsiusSpan);

    /* Humidity */
    const currentHumidity = document.createElement("p");
    currentHumidity.textContent = `Current humidity: ${this.data.current.relative_humidity_2m}%`;
    currentHumidity.classList.add("additional-info");

    /* Emoji */

    weatherContainer.append(
      currentCity,
      currentCountry,
      currentWeather,
      currentFeelsLike,
      currentWindSpeed,
      currentHumidity
    );
  }
}
