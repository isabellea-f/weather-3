import { getWeather } from "./services.js";

export function handleSearch(text, lista) {
  const inputField = document.querySelector("#search-input");

  inputField.addEventListener("keyup", async (e) => {
    const input = e.target.value;

    const results = await text(input);
    lista(results);
  });
}
export function updateList(results) {
  const datalist = document.querySelector("#cities");
  datalist.innerHTML = "";

  results.forEach((city) => {
    const li = document.createElement("li");

    li.textContent = `${city.name}, ${city.admin1 || ""}, ${
      city.country || ""
    }`;

    let lon = city.longitude;
    let lat = city.latitude;

    datalist.appendChild(li);

    li.addEventListener("click", () => {
      console.log("Hej");
      getWeather(lat, lon);
    });
  });
}
