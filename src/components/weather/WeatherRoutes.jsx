import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { WeatherContent } from "./Body/WeatherContent";
import { WeatherWeekly } from "./pages/Weakly/WeatherWeekly";
import { About } from "./pages/About/About";
import { MapWithGeocoding } from "./pages/Search/MapGeocoding";
import { PreLoading } from "./pages/PreLoading";
import { ErrorPage } from "./pages/ErrorPage";
import style from "./Weather.module.css";

export default function WeatherRoutes({ loading, weatherData, multiWeatherData, addCityToHistory, deleteCityFromHistory }) {
  const location = useLocation();

  if (loading) return <PreLoading />;
  if (!weatherData) return <ErrorPage />;

  return (
    <div className={style.weather__body}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/weather-app/about" element={<About />} />
          <Route
            path="/weather-app/"
            element={
              <WeatherContent multiWeatherData={multiWeatherData} addCityToHistory={addCityToHistory} deleteCityFromHistory={deleteCityFromHistory} />
            }
          />
          <Route
            path="/weather-app/weekly/:cityName"
            element={<WeatherWeekly weatherData={weatherData} multiWeatherData={multiWeatherData} loading={loading} />}
          />

          <Route path="/weather-app/ip-search" element={<MapWithGeocoding />} />

          <Route path="/" element={<Navigate to="/weather-app/" />} />
          <Route path="*" element={<Navigate to="/weather-app/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
