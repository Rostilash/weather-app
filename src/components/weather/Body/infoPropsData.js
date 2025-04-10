export const infoPropsData = (item) => {
  const humidity = item.data.hourly.relative_humidity_2m[0];
  const apparent_temperature = Math.round(item.data.hourly.apparent_temperature[0]);
  const visibility = item.data.hourly.visibility[0] / 1000;
  const windSpeed = item.data.hourly.windspeed_10m[0];
  // To wind speed km/h
  const windSpeedKmh = Math.round(windSpeed * 3.6);

  const weatherInfoProps = {
    img1: "eye.png",
    name1: "Visibility",
    element1: visibility,
    unit1: "km",

    img2: "temperature.png",
    name2: "Feels like",
    element2: apparent_temperature,
    unit2: "°C",
  };

  const weatherInfoProps2 = {
    img1: "humidity.png",
    name1: "Humidity",
    element1: humidity,
    unit1: "%",

    img2: "wind.png",
    name2: "Wind",
    element2: windSpeedKmh,
    unit2: "km/h",
  };
  return { weatherInfoProps, weatherInfoProps2 };
};
