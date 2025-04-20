import React, { useState, useEffect } from "react";
import style from "./WeatherWeekly.module.css";
import { motion } from "framer-motion";
import WeeklyContent from "./WeeklyContent";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { createChartData } from "../../utils/createChartData.js";
import { getForecastForDate } from "./../../utils/forecastUtils";
import { createWeatherMapIcon } from "./../../utils/mapUtils";
import { getFormattedDate } from "../../utils/dateHelper.js";

export const WeatherWeekly = ({ weatherData, multiWeatherData }) => {
  const [cityInfo, setCityInfo] = useState(null);
  const [dailyData, setDailyData] = useState(weatherData.daily); // fallback
  const [hourlyData, setHourlyData] = useState(weatherData.hourly); // fallback
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split("T")[0]);
  const navigate = useNavigate();
  const handleNavigationClick = () => {
    navigate(`/weather`);
  };
  const { cityName } = useParams();
  // console.log(cityName);

  // console.log(multiWeatherData[2]?.address.city.toLowerCase());
  const ourCity = multiWeatherData.find((object) => object?.address.city.toLowerCase() === cityName?.toLowerCase());

  // get city cords
  const lat = ourCity?.data.latitude;
  const lon = ourCity?.data.longitude;
  const markerPosition = lat && lon ? [lat, lon] : null;

  // Checking if there is data
  const dailyWeather = ourCity?.data?.daily;

  // Looking city in our fetch
  useEffect(() => {
    if (!multiWeatherData || multiWeatherData.length === 0) return;
    const translatedName = cityName[cityName.toLowerCase()] || cityName.toLowerCase();

    // We iterate over the multiWeatherData array and search for the city
    const cityFromUrl = multiWeatherData.find((cityObj) => cityObj.address.city.toLowerCase().trim() === translatedName);
    if (cityFromUrl && cityFromUrl.data) {
      setCityInfo(cityFromUrl);
      setDailyData(cityFromUrl.data.daily);
      setHourlyData(cityFromUrl.data.hourly);
    }
  }, [cityName, multiWeatherData]);

  // Get the forecast for the selected day
  const forecastForSelectedDay = getForecastForDate(selectedDate, hourlyData);

  // get city name
  const city = cityInfo?.address.city;

  // Maping Daily array
  const dailyForecast = dailyData.time.map((date, index) => ({
    date,
    maxTemp: dailyData.temperature_2m_max[index],
    minTemp: dailyData.temperature_2m_min[index],
    precipitation: dailyData.precipitation_sum[index],
    windspeed: dailyData.windspeed_10m_max[index],
    weatherCode: dailyData.weathercode[index],
  }));

  const pageVariants = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };

  // chartData options
  const { chartData, options } = createChartData(forecastForSelectedDay);

  const weatherIcon = forecastForSelectedDay[0]?.icon;
  const temperature = Math.round(forecastForSelectedDay[0]?.temperature);
  // adding info on map
  const customIcon = createWeatherMapIcon(weatherIcon, temperature);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={style.body_weekly}
    >
      <div className={style.daily_info}>
        {/* Current Day */}{" "}
        <span className={style.return_button} onClick={() => handleNavigationClick()}>
          &larr; BACK
        </span>
        <div className={style.daily_header}>
          <div className={style.backgroundGif}>{/* <img src={`${weatherGif}`} /> */}</div>

          <h2>
            {city} / {getFormattedDate(selectedDate)}
          </h2>
          {/* selector */}
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            {dailyData.time.map((date) => (
              <option key={date} value={date}>
                {getFormattedDate(date)}
              </option>
            ))}
          </select>
        </div>
        <div className={style.graphic}>
          <Line data={chartData} options={options} />
        </div>
        {/* Displaying the forecast for the selected day */}
        <div className={style.forecast}>
          {forecastForSelectedDay
            .filter((forecast) => {
              const now = new Date();
              const forecastTime = new Date(forecast.time);
              const diffInMs = forecastTime - now;
              const diffInHours = diffInMs / (1000 * 60 * 60);
              return diffInHours >= 0;
            })
            .map((forecast, index) => (
              <div key={forecast.time} className={style.hour_card}>
                <div>
                  {index === 0 ? "Now" : `${new Date(forecast.time).getHours() % 12 || 12}${new Date(forecast.time).getHours() < 12 ? "AM" : "PM"}`}
                </div>
                <span>{forecast.icon}</span>
                <div>{Math.round(forecast.temperature)}°C</div>
              </div>
            ))}
        </div>
      </div>

      <div className={style.weekly_info}>
        {/* Weakly weather block */}
        <div className={style.weekly_block}>
          <h3>WEEKLY WEATHER</h3>
          <div className={style.weather_list}>
            {dailyForecast.map((day, i) => (
              <WeeklyContent key={i} day={day} setSelectedDate={setSelectedDate} />
            ))}
          </div>
        </div>

        {markerPosition && (
          <MapContainer center={markerPosition} zoom={9} className={style.map}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={markerPosition} icon={customIcon} />
          </MapContainer>
        )}
      </div>
    </motion.div>
  );
};
