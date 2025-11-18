import { sortList } from "./utils/sort.js";

export function handleSearch(text, lista) {
  const inputField = document.querySelector("#search-input");
  let timer;

  inputField.placeholder = "Sök på ort";
  inputField.addEventListener("keyup", async (e) => {
    const input = e.target.value;
    alert;

    if (e.target.value.length < 2) {
      console.log("vänta");
      return;
    }

    if (!/^[\p{Letter}\s-]+$/u.test(input)) {
      alert("Ogiltig input! Använd endast bokstäver!");
      e.target.value = "";
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(async () => {
      const results = await text(input);

      if (!results || results.length === 0) {
        alert("Ingen plats hittades som matchar din sökning.");
        return;
      }

      lista(results);
      console.log("Data Fetched");
    }, 500);
  });
}

export function updateList(results) {
  const datalist = document.querySelector("#cities");
  datalist.innerHTML = "";

  // Sorts by Sweden and highest population first
  sortList(results);

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
