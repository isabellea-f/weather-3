export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log(localStorage);
}
export function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (data === null) {
    return [];
  } else {
    return JSON.parse(data);
  }
}
