// forecast.js
import { getWeather } from "./services.js";
import { query, create} from "./dom.js"

export async function renderForecast(lat, lon) {
  // Map weather codes to emojis
/*   const weatherEmojis = {
    0: "☀️",  // Clear
    1: "🌤️", 
    2: "⛅", 
    3: "☁️", 
    45: "🌫️", // moved to weatherCodes.js
    48: "🌫️", 
    51: "🌦️", 
    61: "🌧️", 
    71: "❄️", 
    95: "⛈️"
  }; */

  // Remove old forecast if present
  const oldContainer = document.querySelector("#forecast-container");
  if (oldContainer) oldContainer.remove();

  // Create forecast container

 const container = document.createElement("div"); // this where 7 day forecast will be placed
 
  /* container.id = "forecast-container";
   container.style.border = "2px solid blue";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "8px";
  container.style.padding = "10px";
  container.style.marginTop = "10px";
  container.style.borderRadius = "10px";
  container.style.background = "#f0f8ff"; */

  // Loading message
  const loading = document.createElement("p");
  loading.textContent = "Loading 7-day forecast...";

  container.appendChild(loading); // loading message 

  document.body.appendChild(container);

  try {
    const forecast = await getWeather(lat, lon);

    if (forecast && forecast.daily) {
      const today = forecast.daily;

      // Clear loading message
      container.innerHTML = "";


      // Next 7 days
      const days = today.time.slice(1, 8);

      days.forEach((t, i) => {
        const box = document.createElement("div"); //replace to this

        //const box = create("div", "box"); // vox to put each day forecast

        const date = new Date(t);
        const emoji = weatherEmojis[today.weather_code[i + 1]] || "❓";

        box.innerHTML = `
          <p>${date.toLocaleDateString("sv-SE", { weekday: "short", month: "short", day: "numeric" })}</p>
          <div style="font-size:24px">${emoji}</div>
          <p>${Math.round(today.temperature_2m_min[i + 1])}–${Math.round(today.temperature_2m_max[i + 1])}°C</p>
        `;

        box.style.border = "1px solid gray";
        box.style.padding = "8px";
        box.style.textAlign = "center";
        box.style.borderRadius = "8px";
        box.style.flex = "1 1 100px";
        box.style.background = "white";
        box.style.boxShadow = "0 0 5px rgba(0,0,0,0.1)";

        container.appendChild(box);
      });
    } else {
      container.textContent = "Forecast unavailable.";
    }
  } catch (error) {
    console.error(error);
    container.textContent = "Error loading forecast.";
  }
}
