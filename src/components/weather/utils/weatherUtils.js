export function filterTheWeather({ weatherData }) {
  let windCode = weatherData.current_weather.weathercode;
  if (windCode === 0) {
    windCode = "Almost clear";
  } else if (windCode === 1) {
    windCode = "Partly cloudy";
  } else if (windCode === 2) {
    windCode = "Cloudy";
  } else if (windCode === 3) {
    windCode = "Rain";
  } else if (windCode === 4) {
    windCode = "Snow";
  } else if (windCode === 5) {
    windCode = "Fog";
  }
  return windCode;
}

export function filterWindDirection(windDirection) {
  if ((windDirection >= 0 && windDirection < 22.5) || (windDirection >= 337.5 && windDirection <= 360)) {
    return { direction: "North wind", arrow: "↑" };
  } else if (windDirection >= 22.5 && windDirection < 67.5) {
    return { direction: "North-east wind", arrow: "↗" };
  } else if (windDirection >= 67.5 && windDirection < 112.5) {
    return { direction: "East wind", arrow: "→" };
  } else if (windDirection >= 112.5 && windDirection < 157.5) {
    return { direction: "South-east wind", arrow: "↘" };
  } else if (windDirection >= 157.5 && windDirection < 202.5) {
    return { direction: "South wind", arrow: "↓" };
  } else if (windDirection >= 202.5 && windDirection < 247.5) {
    return { direction: "South-west wind", arrow: "↙" };
  } else if (windDirection >= 247.5 && windDirection < 292.5) {
    return { direction: "West wind", arrow: "←" };
  } else if (windDirection >= 292.5 && windDirection < 337.5) {
    return { direction: "North-west wind", arrow: "↖" };
  } else {
    return { direction: "Invalid direction", arrow: "" };
  }
}

export function filterIsDay(day) {
  if (day === 1) {
    return "sun.png";
  }
  if (day === 0) {
    return "moon.png";
  }
}

export const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export const weatherIcons = {
  0: "☀️",
  1: "🌤",
  2: "⛅",
  3: "☁️",
  45: "🌫",
  48: "🌫❄",
  51: "🌦",
  53: "🌧",
  55: "🌧",
  56: "🌧❄",
  57: "🌧❄",
  61: "🌦",
  63: "🌧",
  65: "🌧",
  66: "🌧❄",
  67: "🌧❄",
  71: "🌨",
  73: "🌨",
  75: "❄️",
  77: "🌨",
  80: "🌦",
  81: "🌦",
  82: "⛈",
  85: "🌨",
  86: "❄️",
  95: "⛈",
  96: "⛈🌨",
  99: "⛈❄️",
};
