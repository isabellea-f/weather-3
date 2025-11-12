const backgrounds = {
  0: "sun.jpg",

  1: "cloudy.jpg",
  2: "cloudy.jpg",
  3: "cloudy.jpg",

  51: "rain.jpg",
  53: "rain.jpg",
  55: "rain.jpg",
  56: "rain.jpg",
  57: "rain.jpg",
  61: "rain.jpg",
  63: "rain.jpg",
  65: "rain.jpg",
  66: "rain.jpg",
  67: "rain.jpg",
  80: "rain.jpg",
  81: "rain.jpg",
  82: "rain.jpg",
};

export function setWeatherBackground(weatherData) {
  const backgroundCode = weatherData.current.weather_code;
  document.body.style.backgroundImage =
    "url('images/" + backgrounds[backgroundCode] + "')";
}
