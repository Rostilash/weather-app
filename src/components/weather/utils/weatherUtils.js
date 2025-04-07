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
