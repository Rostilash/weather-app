import L from "leaflet";

export const createWeatherMapIcon = (weatherIcon, temperature) => {
  return L.divIcon({
    className: "custom_div_icon",
    html: `<div style="
      color: black;
      background-color: rgba(56, 56, 56, 0.25);
      background: rgb(105 105 105 / 87%);;
      height: 30px;
      width: 25px;
      border-radius: 50%;
      font-size: 14px;
      font-weight: bold;
      display: flex;
      text-align: center;
      align-items: center;
      gap: 15px;
    ">
    <img src="${weatherIcon}" alt="icon" style="width: 20px; height: 20px;" />
      ${temperature}°C</div>`,
  });
};
