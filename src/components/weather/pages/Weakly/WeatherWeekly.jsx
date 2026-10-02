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
import ColorLegendModal from "./ColorLegendModal.jsx";
import { weatherDescriptions, weatherIcons } from "../../utils/weatherFilterData.js";

export const WeatherWeekly = ({ weatherData, multiWeatherData }) => {
  const [cityInfo, setCityInfo] = useState(null);
  const [dailyData, setDailyData] = useState(weatherData.daily); // fallback
  const [hourlyData, setHourlyData] = useState(weatherData.hourly); // fallback
  const [showLegend, setShowLegend] = useState(false);

  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split("T")[0]);
  const navigate = useNavigate();

  const handleNavigationClick = () => {
    navigate(`/`);
  };

  const { cityName } = useParams();
  const ourCity = multiWeatherData.find(
    (object) => object?.address.city.toLowerCase() === cityName?.toLowerCase(),
  );

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
    const cityFromUrl = multiWeatherData.find(
      (cityObj) => cityObj.address.city.toLowerCase().trim() === translatedName,
    );
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

  // Map daily data into a format shared by the overview and weekly forecast.
  const dailyForecast = dailyData.time.map((date, index) => ({
    date,
    maxTemp: dailyData.temperature_2m_max[index],
    minTemp: dailyData.temperature_2m_min[index],
    precipitation: dailyData.precipitation_sum[index],
    windspeed: dailyData.windspeed_10m_max[index],
    weatherCode: dailyData.weathercode[index],
  }));
  const selectedDay = dailyForecast.find((day) => day.date === selectedDate);
  const selectedDayDescription =
    weatherDescriptions[selectedDay?.weatherCode] || "Weather conditions";
  const selectedDayIcon = weatherIcons[selectedDay?.weatherCode];
  const isSelectedToday = selectedDate === new Date().toISOString().split("T")[0];
  const displayedHourlyForecast = forecastForSelectedDay.filter(
    (forecast) => !isSelectedToday || new Date(forecast.time) >= new Date(),
  );
  const selectedHour = displayedHourlyForecast[0] || forecastForSelectedDay[0];

  const pageVariants = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };

  // ChartData options Graphic functions
  const { chartData, options, customPlugins } = createChartData(forecastForSelectedDay);

  //  Icon and Temperature for MAP
  const weatherIcon = forecastForSelectedDay[0]?.icon;
  const temperature = Math.round(forecastForSelectedDay[0]?.temperature);
  const customIcon = createWeatherMapIcon(weatherIcon, temperature);

  const [openMap, setOpenMap] = useState(false);

  const handleOpenMap = () => {
    setOpenMap((prev) => !prev);
  };
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={style.body_weekly}
    >
      {showLegend && <ColorLegendModal onClose={() => setShowLegend(false)} />}

      <header className={style.page_header}>
        <button
          type="button"
          className={style.return_button}
          onClick={handleNavigationClick}
          aria-label="Back to weather overview"
        >
          <img src="https://cdn-icons-png.flaticon.com/128/12071/12071357.png" alt="" />
        </button>
        <div className={style.page_title}>
          <span>WEATHER OVERVIEW</span>
          <h1>{city}</h1>
        </div>
        <label className={style.date_control}>
          <span>Forecast date</span>
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            {dailyData.time.map((date) => (
              <option key={date} value={date}>
                {getFormattedDate(date)}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className={style.daily_info} aria-label="Selected day weather">
        <div className={style.summary_card}>
          <div className={style.summary_main}>
            {selectedDayIcon && (
              <img className={style.summary_icon} src={selectedDayIcon} alt="" />
            )}
            <div>
              <p className={style.summary_date}>{getFormattedDate(selectedDate)}</p>
              <h2>{selectedDayDescription}</h2>
              <p className={style.summary_location}>{city} · Daily forecast</p>
            </div>
          </div>
          <div className={style.summary_temperature}>
            <span className={style.high_temperature}>{Math.round(selectedDay?.maxTemp)}°</span>
            <span className={style.temperature_separator}>/</span>
            <span className={style.low_temperature}>{Math.round(selectedDay?.minTemp)}°</span>
            <span className={style.temperature_unit}>C</span>
          </div>
          <div className={style.weather_stats}>
            <div className={style.weather_stat}>
              <span>Feels like</span>
              <strong>
                {selectedHour ? `${Math.round(selectedHour.apparent_temperature)}°C` : "—"}
              </strong>
            </div>
            <div className={style.weather_stat}>
              <span>Humidity</span>
              <strong>{selectedHour ? `${selectedHour.humidity}%` : "—"}</strong>
            </div>
            <div className={style.weather_stat}>
              <span>Wind</span>
              <strong>{Math.round(selectedDay?.windspeed)} km/h</strong>
            </div>
            <div className={style.weather_stat}>
              <span>Precipitation</span>
              <strong>{selectedDay?.precipitation} mm</strong>
            </div>
          </div>
        </div>

        <section className={style.chart_panel} aria-label="Hourly temperature chart">
          <div className={style.section_heading}>
            <div>
              <span>HOURLY DETAILS</span>
              <h2>Temperature throughout the day</h2>
            </div>
            <button
              type="button"
              className={style.legend_button}
              onClick={() => setShowLegend(true)}
            >
              Temperature legend
            </button>
          </div>
          <div className={style.graphic}>
            <Line key={selectedDate} data={chartData} options={options} plugins={customPlugins} />
          </div>
          <div className={style.forecast_heading}>
            <h3>Hourly forecast</h3>
            <span>Scroll to explore</span>
          </div>
          <div className={style.forecast}>
            {displayedHourlyForecast.map((forecast, index) => (
                <div key={forecast.time} className={style.hour_card}>
                  <span className={style.hour_time}>
                    {isSelectedToday && index === 0
                      ? "Now"
                      : `${new Date(forecast.time).getHours() % 12 || 12}${new Date(forecast.time).getHours() < 12 ? "AM" : "PM"}`}
                  </span>
                  <span className={style.icon}>
                    <img src={forecast.icon} alt="" />
                  </span>
                  <strong>{Math.round(forecast.temperature)}°C</strong>
                </div>
              ))}
          </div>
        </section>
      </section>

      <section className={style.weekly_info} aria-label="Weekly forecast">
        <div className={style.weekly_block}>
          <div className={style.weekly_heading}>
            <div>
              <span>PLAN AHEAD</span>
              <h2>Weekly weather</h2>
            </div>
            <button type="button" className={style.map_toggle} onClick={handleOpenMap}>
              {!openMap ? "Open map" : "Close map"}
            </button>
          </div>
          <div className={style.weather_list}>
            {dailyForecast.map((day) => (
              <WeeklyContent
                key={day.date}
                day={day}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            ))}
          </div>
        </div>

        {openMap && markerPosition && (
          <MapContainer center={markerPosition} zoom={9} className={style.map}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={markerPosition} icon={customIcon} />
          </MapContainer>
        )}
      </section>
    </motion.div>
  );
};
