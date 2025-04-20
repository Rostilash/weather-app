import L from "leaflet";

export const createWeatherMapIcon = (weatherIcon, temperature) => {
  return L.divIcon({
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
};
