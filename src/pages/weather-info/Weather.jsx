import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import style from "./Weather.module.css";
import { getWeatherData } from "./../../services/weatherServices";
import { WeatherHeader } from "./Header/WeatherHeader";
import { WeatherMain } from "./Main/WeatherMain";
import { WeatherFooter } from "./Footer/WeatherFooter";
import { PreLoading } from "./PreLoading";
import { ErrorPage } from "./ErrorPage";
import MapWithGeocoding from "./Search/MapGeocoding";

export const Weather = () => {
  const { loading, weatherData } = getWeatherData();

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
          {/* <MapWithGeocoding /> */}
          <WeatherHeader />
          <WeatherMain weatherData={weatherData} />
          <WeatherFooter />
        </>
      )}
    </div>
  );
};
