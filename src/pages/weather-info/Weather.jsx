import style from "./Weather.module.css";
import { WeatherHeader } from "./Header/WeatherHeader";
import { WeatherMain } from "./Main/WeatherMain";
import { WeatherFooter } from "./Footer/WeatherFooter";

export const Weather = () => {
  return (
    <div className={style.weather__main}>
      <WeatherHeader />

      <WeatherMain />

      <WeatherFooter />
    </div>
  );
};
