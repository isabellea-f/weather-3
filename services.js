export async function getCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("bla");
    const data = await res.json();
    console.log(data);

    data.results.forEach((result) => {
      const cityCountry = document.createElement("p");
      cityCountry.textContent = `${result.name}, ${result.admin1}, ${result.country}`;
      cityCountry.classList.add("bg-gray");
      document.body.appendChild(cityCountry);
    });
  } catch (error) {
    console.error(error.message);
  }
}

export async function getWeather() {
  let lat = 52.52437;
  let lon = 13.419998;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,rain,apparent_temperature,showers,relative_humidity_2m&wind_speed_unit=ms`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("bla");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}
