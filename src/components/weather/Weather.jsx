import style from "./Weather.module.css";
import { getWeatherData } from "../../services/weatherServices";
import { WeatherHeader } from "./Header/WeatherHeader";
import { WeatherFooter } from "./Footer/WeatherFooter";
import WeatherRoutes from "./WeatherRoutes";

export const Weather = () => {
  const { loading, weatherData } = getWeatherData();

  return (
    <>
      <div className={style.weather__main}>
        <WeatherHeader />
        <WeatherRoutes loading={loading} weatherData={weatherData} />
        <WeatherFooter />
      </div>
    </>
  );
};
