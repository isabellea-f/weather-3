const backgrounds = {
  0: "sun.jpg",

  1: "cloudy.jpg",
  2: "cloudy.jpg",
  3: "cloudy.jpg",

  45: "foggy.jpg",
  48: "foggy.jpg",

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

  71: "snow.jpg",
  73: "snow.jpg",
  75: "snow.jpg,",
  77: "snow.jpg",
  85: "snow.jpg",
  86: "snow.jpg",

  95: "lightning.jpg",
  96: "lightning.jpg",
  99: "lightning.jpg",
};

export function setWeatherBackground(weatherData) {
  let backgroundCode = weatherData.daily.weather_code[0];
  if (!backgrounds[backgroundCode]) backgroundCode = 0;
  document.body.style.backgroundImage =
    "url('images/" + backgrounds[backgroundCode] + "')";
}
