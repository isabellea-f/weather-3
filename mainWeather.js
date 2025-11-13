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
    weatherContainer.classList.add("weather");

    document.body.appendChild(weatherContainer);
    
    weatherContainer.ariaAtomic = "true"
    weatherContainer.ariaLive = "polite"

    
    const currentCity = document.createElement("h3");
    const currentCountry = document.createElement("h3");
    const currentWeather = document.createElement("p");
    
    currentCity.textContent = this.city;
    currentCountry.textContent = this.country;
    currentWeather.textContent = this.data.current.temperature_2m + " C°";
    
    weatherContainer.append(currentCity, currentCountry, currentWeather);
  }
}
