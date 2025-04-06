import style from "./Weather.module.css";
import { getWeatherData } from "./../../services/weatherServices";
import { WeatherHeader } from "./Header/WeatherHeader";
import { WeatherMain } from "./Main/WeatherMain";
import { WeatherFooter } from "./Footer/WeatherFooter";
import { PreLoading } from "./PreLoading";
import { ErrorPage } from "./ErrorPage";

export const Weather = () => {
  const { loading, weatherData } = getWeatherData();

  return (
    <div className={style.weather__main}>
      {loading ? (
        <>
          <WeatherHeader />
          <PreLoading />
          <WeatherFooter />
        </>
      ) : !weatherData ? (
        <ErrorPage />
      ) : (
        <>
          <WeatherHeader />
          <WeatherMain weatherData={weatherData} />
          <WeatherFooter />
        </>
      )}
    </div>
  );
};
