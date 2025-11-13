export class Searched {
  static prevList = [];
  static container = document.querySelector(".col-3");

  constructor(city, country, lat, lon, data) {
    this.city = city;
    this.country = country;
    this.data = data;
    this.lat = lat;
    this.lon = lon;
    const temp = data.current.temperature_2m;
    Searched.updateSearchList(city, temp, lat, lon, country);
    this.renderHistory();
  }

  renderHistory() {
    Searched.container.innerHTML = "";
    for (const { city, temp, lat, lon, country } of Searched.prevList) {
      const cityCont = document.createElement("div");
      cityCont.classList.add("history-card");
      cityCont.dataset.lat = lat;
      cityCont.dataset.lon = lon;
      cityCont.dataset.city = city;
      cityCont.dataset.country = country;

      const cityName = document.createElement("h3");
      cityName.textContent = city;

      const countryName = document.createElement("p");
      countryName.textContent = country;

      const tempEl = document.createElement("p");
      tempEl.textContent = `${temp} °C`;

      const closeBtn = document.createElement("button");
      closeBtn.classList.add("delete-history");
      closeBtn.textContent = "X";

      cityCont.append(closeBtn, cityName, countryName, tempEl);
      Searched.container.append(cityCont);
    }
  }

  static updateSearchList(city, temp, lat, lon, country) {
    const found = this.prevList.find(
      (item) => item.lat === lat && item.lon === lon
    );
    if (!found) {
      this.prevList.unshift({ city, temp, lat, lon, country });
      if (this.prevList.length > 5) {
        this.prevList.pop();
      }
    } else {
      const index = this.prevList.findIndex(
        (object) => object.lat === lat && object.lon === lon
      );
      this.prevList.splice(index, 1);
      this.prevList.unshift({ city, temp, lat, lon, country });
    }
  }
  static clearList() {
    Searched.prevList = [];
    Searched.container.innerHTML = "";
  }
  static deleteCard(lat, lon) {
    const index = this.prevList.findIndex(
      (object) => object.lat === lat && object.lon === lon
    );
    this.prevList.splice(index, 1);
  }
}
