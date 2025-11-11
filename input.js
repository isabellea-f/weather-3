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
    const option = document.createElement("option");

    option.value = `${city.name}, ${city.admin1 || ""}, ${city.country || ""}`;
    option.classList.add("bg-gray");
    datalist.appendChild(option);
  });
}
