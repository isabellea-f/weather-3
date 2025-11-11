export class Searched {
  static prevList = [];

  constructor(city, data) {
    this.city = city;
    this.data = data;
    this.container = document.querySelector("#prev-searched");
    this.render();
  }
  render() {
    if (!Searched.prevList.includes(this.city)) {
      Searched.prevList.unshift(this.city);

      const city = document.createElement("h3");
      city.textContent = `${this.city}`;

      const temp = document.createElement("p");
      temp.textContent = `${this.data.current.temperature_2m} °C`;
      console.log(this.data);

      this.container.append(city, temp);
    }
  }
}
