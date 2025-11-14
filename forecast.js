import { getWeather } from "./services.js";
import { query, create } from "./utils/dom.js";
import { weatherEmojis } from "./utils/weatherCodes.js";

export async function renderForecast(lat, lon) {
  const column2 = document.querySelector(".col-2");
  if (!column2) return;

  column2.innerHTML = "";

  try {
    const forecast = await getWeather(lat, lon);

    if (!forecast) {
      column2.textContent = "Forecast unavailable.";
      return;
    }

    const daily = forecast.daily;
    const days = daily.time.slice(1, 6); // Next 7 days

    days.forEach((t, i) => {
      const box = create("div", "forecast-box");

      const date = new Date(t);
      const weatherCode = daily.weather_code[i + 1];
      const emoji = weatherEmojis[weatherCode] || "no available emoji";
      const minTemp = Math.round(daily.temperature_2m_min[i + 1]);
      const maxTemp = Math.round(daily.temperature_2m_max[i + 1]);

      box.innerHTML = `
        <p>${date.toLocaleDateString("sv-SE", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}</p>
        <div>${emoji}</div>
        <p>${minTemp} - ${maxTemp} °C</p>
      `;

      column2.appendChild(box);
    });
  } catch (error) {
    console.error(error);
    column2.textContent = "Error loading forecast.";
  }
}
