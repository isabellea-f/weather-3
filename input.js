export function handleSearch(text, lista) {
  const inputField = document.querySelector("#search-input");
  let timer;

  inputField.placeholder = "Sök på ort";
  inputField.addEventListener("keyup", async (e) => {
    const input = e.target.value;

    if (e.target.value.length < 2) {
      console.log("vänta");
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(async () => {
      const results = await text(input);

      const sortBy = "SE";
      results.sort((a, b) => {
        if (a.country_code === sortBy && b.country_code !== sortBy) return -1;
        if (b.country_code === sortBy && a.country_code !== sortBy) return 1;
        if (
          (a.country_code === sortBy && b.country_code === sortBy) ||
          (a.country_code !== sortBy && b.country_code !== sortBy)
        ) {
          return a.population - b.population;
        }
        return 0;
      });
      lista(results);
      console.log("Data Fetched");
    }, 500);
  });
}

export function updateList(results) {
  const datalist = document.querySelector("#cities");
  datalist.innerHTML = "";
  // let sorted = results. FIX THIS OK OK OK
  results.slice(0, 7).forEach((city) => {
    const li = document.createElement("li");

    li.tabIndex = 0;

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
export function clearList() {
  const datalist = document.querySelector("#cities");
  datalist.innerHTML = "";
}
