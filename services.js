export async function getCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("bla");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

export async function getForecast() {
  let lat = 52.52437;
  let lon = 13.419998;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&forecast_days=7&current=temperature_2m`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("bla");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}
