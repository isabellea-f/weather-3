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

  results.slice(0, 7).forEach((city) => {
    const li = document.createElement("li");

    li.dataset.lat = city.latitude;
    li.dataset.lon = city.longitude;
    li.dataset.name = city.name;
    li.dataset.country = city.country;

    li.textContent = `${city.name}, ${city.admin1 || ""}, ${
      city.country || ""
    }`;
    datalist.appendChild(li);
  });
}
