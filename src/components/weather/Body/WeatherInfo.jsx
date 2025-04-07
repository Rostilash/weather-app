import React from "react";
import style from "./WeatherContent.module.css";

export const WeatherInfo = ({ data }) => {
  return (
    <>
      <div className={style.today_weather_visibility}>
        {/* First block */}
        <div className={style.visibility_context}>
          <img src={`../../../public/weather-icons/${data.img1}`} alt={data.name1} />
          <div className={style.visibility_context_text}>
            <span>{data.name1}</span>
            <span>
              {data.element1.toFixed(1)}
              {data.unit1}
            </span>
          </div>
        </div>

        <span className={style.divider}>|</span>

        {/* Second block */}
        <div className={style.visibility_context}>
          <img src={`../../../public/weather-icons/${data.img2}`} alt={data.name2} />
          <div className={style.visibility_context_text}>
            <span style={{ marginLeft: "-5px" }}>{data.name2}</span>
            <span>
              {data.element2}
              {data.unit2}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
