export function handleSearch() {
  const inputField = document.querySelector("#search-input");
  inputField.addEventListener("keyup", (e) => {
    const input = e.target.value;
    return input;
  });
}
