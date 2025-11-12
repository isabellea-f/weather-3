//modularized 

import { getWeather } from "./services.js";
import { query, create} from "./utils/dom.js"
import { weatherEmojis } from "./utils/weatherCodes.js";

export async function renderForecast(lat, lon) {
  
  const oldContainer = query('.forecast-container') 
  if (oldContainer) oldContainer.remove();

  const forecastHeading = create('h3', 'h3', 'Weather for the Next 7 Days')
  document.body.append(forecastHeading);

  const container = create('div', 'forecast-container' ) ;
  document.body.appendChild(container); // appended on body

  try {
    const forecast = await getWeather(lat, lon);

      if (forecast) {

        const daily = forecast.daily;
        const days = daily.time.slice(1, 8);     // Next 7 days, will only print 7 out of the 17

        days.forEach((t, i) => {
          const box = create('div', 'forecast-box') // box to put each day 

          const date = new Date(t);
          const weatherCode = daily.weather_code[i + 1];
          const emoji = weatherEmojis[daily.weather_code[i + 1]] || "no available emoji";
          const minTemp= Math.round(daily.temperature_2m_min[1 + 1]);
          const maxTemp= Math.round(daily.temperature_2m_max[1 + 1]);

          box.innerHTML = `
            <p>${date.toLocaleDateString("sv-SE", { weekday: "short", month: "short", day: "numeric" })}</p>
            <div>${emoji}</div>
            <p> ${minTemp} - ${maxTemp} °C </p>
          `;

          container.appendChild(box);
        });

      } else {
        container.textContent = "Forecast unavailable.";
      }
  } catch (error) {
    console.error(error);
    container.textContent = "Error loading forecast.";
  }
};

