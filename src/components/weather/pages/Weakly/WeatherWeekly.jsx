import React, { useState, useEffect } from "react";
import style from "./WeatherWeekly.module.css";
import { motion } from "framer-motion";
import WeeklyContent from "./WeeklyContent";
import { weatherBackgroundGiphs, weatherIcons } from "./../../utils/weatherFilterData.js";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from "chart.js";

export const WeatherWeekly = ({ weatherData, multiWeatherData }) => {
  const { cityName } = useParams();
  const ourCity = multiWeatherData.find((object) => object.address.city.toLowerCase() === cityName?.toLowerCase());

  const lat = ourCity?.data.latitude;
  const lon = ourCity?.data.longitude;
  const markerPosition = lat && lon ? [lat, lon] : null;

  // Checking if there is data
  const dailyWeather = ourCity?.data?.daily;

  if (!dailyWeather) {
    // console.log("Weather data not found for this city");
  } else {
    // console.log(dailyWeather);
  }

  const navigate = useNavigate();

  const handleNavigationClick = () => {
    navigate(`/weather`);
  };

  const [cityInfo, setCityInfo] = useState(null);
  const [dailyData, setDailyData] = useState(weatherData.daily); // fallback
  const [hourlyData, setHourlyData] = useState(weatherData.hourly); // fallback
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split("T")[0]);

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

  // Adding from Data
  const getForecastForDate = (date) => {
    if (!hourlyData?.time) return [];

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return hourlyData.time
      .map((time, index) => {
        const forecastTime = new Date(time);

        if (forecastTime < start || forecastTime > end) return null;

        const weatherCode = hourlyData.weathercode?.[index];

        return {
          time,
          temperature: hourlyData.temperature_2m[index],
          apparent_temperature: Math.round(hourlyData.apparent_temperature[index]),
          humidity: Math.floor(hourlyData.relative_humidity_2m[index]),
          visibility: hourlyData.visibility[index].toFixed(1),
          weatherCode,
          icon: weatherIcons[weatherCode] || "❓",
        };
      })
      .filter(Boolean);
  };

  // Get the forecast for the selected day
  const forecastForSelectedDay = getForecastForDate(selectedDate);
  const weatherCodeHourly = forecastForSelectedDay[0].weatherCode;
  const weatherGif = weatherBackgroundGiphs[weatherCodeHourly];

  // Formatting a date for a title
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

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
  const city = cityInfo?.address.city;

  // Values for graphic
  const graphicTemp = forecastForSelectedDay.map((hour) => hour.temperature);
  const graphicTempApparent = forecastForSelectedDay.map((hour) => hour.apparent_temperature);
  const graphicTime = forecastForSelectedDay.map((hour) => hour.time);
  const graphicIcons = forecastForSelectedDay.map((hour) => hour.icon) || "o";

  const formattedTime = graphicTime.map((date) =>
    new Date(date).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const customIconsPlugin = {
    id: "customIcons",
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;
      const dataset = chart.getDatasetMeta(0);

      dataset.data.forEach((point, index) => {
        ctx.save();
        ctx.font = "18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(graphicIcons[index], point.x, point.y - 15);
        ctx.restore();
      });
    },
  };
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler, customIconsPlugin);
  const chartData = {
    labels: formattedTime,
    datasets: [
      {
        label: "Temperature (°C)",
        data: graphicTemp,
        backgroundColor: "rgba(99, 58, 214, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 10,
        pointStyle: "circle",
        segment: {
          borderColor: (ctx) => {
            const temp = ctx.p0.parsed.y;
            if (temp > 35) return "red";
            if (temp > 18) return "orange";
            if (temp < 10) return "lightskyblue";
            if (temp < 10) return "blue";
            return "white";
          },
        },
      },
      {
        label: "Feels like (°C)",
        data: graphicTempApparent,
        borderColor: "rgba(255, 0, 0, 0.5)",
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff", // Колір підпису легенди
        },
        onClick: () => {}, // блокує дію по кліку
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const temp = context.dataset.data[index];

            // Якщо в тебе є додаткові дані
            const humidity = forecastForSelectedDay[index]?.humidity;
            const visibility = forecastForSelectedDay[index]?.visibility;

            return [`Temperature: ${temp}°C`, `Humidity: ${humidity}%`, `Visibility: ${visibility / 1000} км`];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff", // Колір підписів осі X (години)
        },
        grid: {
          color: "rgba(255,255,255,0.2)", // Світла сітка по X
        },
      },
      y: {
        ticks: {
          color: "#fff", // Колір підписів осі Y (температура)
        },
        grid: {
          color: "rgba(255,255,255,0.2)", // Світла сітка по Y
        },
      },
    },
    animation: {
      tension: {
        duration: 1000,
        easing: "easeInOutQuart",
        from: 1,
        to: 0,
        loop: false,
      },
    },
  };

  const weatherIcon = forecastForSelectedDay[0]?.icon;
  const temperature = Math.round(forecastForSelectedDay[0]?.temperature);

  const customIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div style="
    color: black;
    background-color: rgba(56, 56, 56, 0.25);
    background: radial-gradient(circle, rgba(255,215,0,0.7), rgba(255,140,0,0.5));
    box-shadow: 0 0 11px 5px orange;
    height: 20px;
    width: 30px;
    border-radius: 50%;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    text-align: center;
    align-items: center;
    gap: 6px;
  ">${weatherIcon} ${temperature}°C</div>`,
  });
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
        {/* Current Day */}
        <div className={style.daily_header}>
          <div className={style.backgroundGif}>{/* <img src={`${weatherGif}`} /> */}</div>
          <span className={style.return_button} onClick={() => handleNavigationClick()}>
            &larr; BACK
          </span>
          <h2>
            {city} / {formatDate(selectedDate)}
          </h2>
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            {dailyData.time.map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
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
          <h3 style={{ marginBottom: "20px" }}>WEEKLY WEATHER</h3>
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
