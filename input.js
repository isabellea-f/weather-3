export function handleSearch(text, lista) {
  const inputField = document.querySelector("#search-input");
  let timer;

  inputField.addEventListener("keyup", async (e) => {
    const input = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const results = await text(input);
      lista(results);
      console.log("Data Fetched");
    }, 500);
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
