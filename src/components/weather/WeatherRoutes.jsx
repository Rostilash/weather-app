import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { WeatherContent } from "./Body/WeatherContent";
import { WeatherWeekly } from "./pages/Weakly/WeatherWeekly";
import { About } from "./pages/About/About";
import { MapWithGeocoding } from "./pages/Search/MapGeocoding";
import { PreLoading } from "./pages/PreLoading";
import { ErrorPage } from "./pages/ErrorPage";
import style from "./Weather.module.css";

export default function WeatherRoutes({ loading, weatherData, getWeatherData, multiWeatherData }) {
  const location = useLocation();

  if (loading) return <PreLoading />;
  if (!weatherData) return <ErrorPage />;

  return (
    <div className={style.weather__body}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/about" element={<About />} />
          <Route
            path="/weather"
            element={<WeatherContent weatherData={weatherData} multiWeatherData={multiWeatherData} updateCoordinates={getWeatherData} />}
          />
          <Route path="/weather/weekly/:cityName" element={<WeatherWeekly weatherData={weatherData} multiWeatherData={multiWeatherData} />} />
          {/* <Route path="/weather/weekly/:cityName" element={<WeeklyWeather />} /> */}

          <Route path="/weather/map-city" element={<MapWithGeocoding weatherData={weatherData} getWeatherData={getWeatherData} />} />

          <Route path="/" element={<Navigate to="/weather" />} />
          <Route path="*" element={<Navigate to="/weather" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
