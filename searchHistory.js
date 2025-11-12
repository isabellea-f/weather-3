export class Searched {
  static prevList = [];
  container = document.querySelector("#prev-searched");

  constructor(city, data) {
    this.city = city;
    this.data = data;
    const temp = data.current.temperature_2m;
    Searched.updateSearchList(city, temp);
    this.renderHistory();
  }

  renderHistory() {
    this.container.innerHTML = "";
    for (const { city, temp } of Searched.prevList) {
      const cityCont = document.createElement("div");

      const cityName = document.createElement("h3");
      cityName.textContent = `${city}`;

      const tempEl = document.createElement("p");
      tempEl.textContent = `${temp} °C`;

      cityCont.append(cityName, tempEl);
      this.container.append(cityCont);
    }
  }
  static updateSearchList(city, temp) {
    const found = this.prevList.find((item) => item.city === city);
    if (!found) {
      this.prevList.unshift({ city, temp });
      if (this.prevList.length > 5) {
        this.prevList.pop();
      }
    } else {
      const index = this.prevList.findIndex((object) => object.city === city);
      this.prevList.splice(index, 1);
      this.prevList.unshift({ city, temp });
    }
    console.log(this.prevList);
  }
}
