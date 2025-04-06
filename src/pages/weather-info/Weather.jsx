import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import style from "./Weather.module.css";
import { getWeatherData } from "./../../services/weatherServices";
import { WeatherHeader } from "./Header/WeatherHeader";
import { WeatherMain } from "./Main/WeatherMain";
import { WeatherFooter } from "./Footer/WeatherFooter";
import { PreLoading } from "./PreLoading";
import { ErrorPage } from "./ErrorPage";
import MapWithGeocoding from "./Search/MapGeocoding";
import { WeatherWeekly } from "./Main/WeatherWeekly";
import { About } from "./Main/About/About";
import { AnimatePresence } from "framer-motion";

export const Weather = () => {
  const { loading, weatherData } = getWeatherData();
  const location = useLocation();
  return (
    <div className={style.weather__main}>
      {loading ? (
        <>
          {/* If loading */}
          <WeatherHeader />
          <PreLoading />
          <WeatherFooter />
        </>
      ) : !weatherData ? (
        <>
          {/* Error  */}
          <WeatherHeader />
          <ErrorPage />
          <WeatherFooter />
        </>
      ) : (
        <>
          {/* Our Page */}
          <WeatherHeader />

          <div className={style.weather__body}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/about" element={<About />} />
                <Route path="/weather" element={<WeatherMain weatherData={weatherData} />} />
                <Route path="/weather/weekly" element={<WeatherWeekly weatherData={weatherData} />} />
                <Route path="/weather/map-city" element={<MapWithGeocoding />} />
                <Route path="/" element={<Navigate to="/weather" />} />
                <Route path="*" element={<Navigate to="/weather" />} />
              </Routes>
            </AnimatePresence>
          </div>

          <WeatherFooter />
        </>
      )}
    </div>
  );
};
