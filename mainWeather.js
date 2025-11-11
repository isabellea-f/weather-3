export class Weather {
  constructor(city, country, lat, lon, data) {
    this.city = city;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
    this.data = data;
  }
  displayWeather() {
    const weatherContainer = document.createElement("div");
    document.body.appendChild(weatherContainer);

    const currentCity = document.createElement("h3");
    const currentCountry = document.createElement("h3");

    currentCity.textContent = this.city;
    currentCountry.textContent = this.country;

    const currentWeather = document.createElement("p");
    currentWeather.textContent = this.data;

    weatherContainer.append(currentCity, currentCountry, currentWeather);
  }
}
