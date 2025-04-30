import "../../../../public/weather-icons/sun.png";

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
    return "weather-icons/sun.png";
  }
  if (day === 0) {
    return "weather-icons/moon.png";
  }
}

// sun giph "https://media.giphy.com/media/a7Cge6vvMaPzJnPSiF/giphy.gif?cid=ecf05e477ww9r4u51n2ssmlaxlwt2i4ds2kis2ch17vwdsfn&ep=v1_stickers_search&rid=giphy.gif&ct=s";
// moon giph "https://media.giphy.com/media/P9bgDevMjIoRzmvJlJ/giphy.gif?cid=ecf05e47ikdn8mntkf6e7poho32or9mj51xmi7q44vf4m1wi&ep=v1_stickers_search&rid=giphy.gif&ct=s";

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
  0: "https://cdn-icons-png.flaticon.com/128/6974/6974833.png",
  1: "https://cdn-icons-png.flaticon.com/128/1888/1888282.png",
  2: "https://cdn-icons-png.flaticon.com/128/2584/2584011.png",
  3: "https://cdn-icons-png.flaticon.com/128/12861/12861541.png",
  45: "https://cdn-icons-png.flaticon.com/128/3313/3313998.png",
  48: "https://cdn-icons-png.flaticon.com/128/3313/3313998.png",
  51: "https://cdn-icons-png.flaticon.com/128/6319/6319781.png",
  53: "https://cdn-icons-png.flaticon.com/128/1809/1809557.png",
  55: "https://cdn-icons-png.flaticon.com/128/2059/2059322.png",
  56: "https://cdn-icons-png.flaticon.com/128/4837/4837666.png",
  57: "https://cdn-icons-png.flaticon.com/128/4837/4837666.png",
  61: "https://cdn-icons-png.flaticon.com/128/12607/12607703.png",
  63: "https://cdn-icons-png.flaticon.com/128/3351/3351962.png",
  65: "https://cdn-icons-png.flaticon.com/128/4834/4834677.png",
  66: "https://cdn-icons-png.flaticon.com/128/1164/1164956.png",
  67: "https://cdn-icons-png.flaticon.com/128/14178/14178257.png",
  71: "https://cdn-icons-png.flaticon.com/128/5538/5538693.png",
  73: "https://cdn-icons-png.flaticon.com/128/6363/6363108.png",
  75: "https://cdn-icons-png.flaticon.com/128/11017/11017826.png",
  77: "https://cdn-icons-png.flaticon.com/128/1585/1585791.png",
  80: "https://cdn-icons-png.flaticon.com/128/6319/6319781.png",
  81: "https://cdn-icons-png.flaticon.com/128/1809/1809557.png",
  82: "https://cdn-icons-png.flaticon.com/128/1959/1959338.png",
  85: "https://cdn-icons-png.flaticon.com/128/5538/5538693.png",
  86: "https://cdn-icons-png.flaticon.com/128/2315/2315309.png",
  95: "https://cdn-icons-png.flaticon.com/128/6446/6446299.png",
  96: "https://cdn-icons-png.flaticon.com/128/1959/1959334.png",
  99: "https://cdn-icons-png.flaticon.com/128/8675/8675129.png",
};

export const weatherBackgroundGiphs = {
  0: "https://media.tenor.com/c1rMm90V8CMAAAAM/sunset-nature.gif",
  1: "https://media3.giphy.com/media/1uLQUtPLbJMQ0/giphy.webp?cid=ecf05e47xjbsaed57pkvv8lunku3t5j6xmy54z6wmujev8hp&ep=v1_gifs_search&rid=giphy.webp&ct=g",
  2: "https://media.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif?cid=ecf05e47n6yawu0gqlqg2g9ofzqnoc7fozme4r2abtcapare&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  3: "https://media1.tenor.com/m/maZmZ1eta9kAAAAd/tik-tok-philandmore.gif",
  45: "🌫",
  48: "🌫❄",
  51: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWptaXQzYmtsaTU1Z2pqaGg5YTRyejE2M3RvNzB5dm5pN3RmNWg3aCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/fBP4DVvMfkt7jFDeKU/giphy.gif",
  53: "🌧",
  55: "https://media.giphy.com/media/3o85xsNYU6Rlnw9cly/giphy.gif?cid=ecf05e47zdg7r9szjrodvf42lf10w0zr6xmze6dst397vxod&ep=v1_gifs_search&rid=giphy.gif&ct=g",
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

// export const weatherIcons = {
//   0: "☀️",
//   1: "🌤",
//   2: "⛅",
//   3: "☁️",
//   45: "🌫",
//   48: "🌫❄",
//   51: "🌦",
//   53: "🌧",
//   55: "🌧",
//   56: "🌧❄",
//   57: "🌧❄",
//   61: "🌦",
//   63: "🌧",
//   65: "🌧",
//   66: "🌧❄",
//   67: "🌧❄",
//   71: "🌨",
//   73: "🌨",
//   75: "❄️",
//   77: "🌨",
//   80: "🌦",
//   81: "🌦",
//   82: "⛈",
//   85: "🌨",
//   86: "❄️",
//   95: "⛈",
//   96: "⛈🌨",
//   99: "⛈❄️",
// };
