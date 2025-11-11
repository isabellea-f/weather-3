export function handleSearch(text) {
  const inputField = document.querySelector("#search-input");
  inputField.addEventListener("keyup", (e) => {
    const input = e.target.value;
    console.log(input);
    text(input);
  });
}
