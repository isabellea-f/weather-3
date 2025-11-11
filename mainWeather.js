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
    const weatherContainer = document.createElement("div");
    document.body.appendChild(weatherContainer);

    const currentCity = document.createElement("h3");
    const currentCountry = document.createElement("h3");

    currentCity.textContent = this.city;
    currentCountry.textContent = this.country;

    const currentWeather = document.createElement("p");
    currentWeather.textContent = this.data.current.temperature_2m;

    weatherContainer.append(currentCity, currentCountry, currentWeather);
  }
}
