import React from "react";
import style from "./ColorLegendModal.module.css";

const legendData = [
  {
    label: "Very Cold (< 0°C)",
    color: "blue",
  },
  {
    label: "Cold (~ +5°C)",
    color: "lightskyblue",
  },
  {
    label: "Normal (~ +14°C)",
    color: "yellow",
  },
  {
    label: "Hot (~ +24°C)",
    color: "orange",
  },
  {
    label: "Very Hot (~ +34°C)",
    color: "red",
  },
];

const ColorLegendModal = ({ onClose }) => {
  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h3>Temperature Color Legend</h3>
        <ul className={style.legendList}>
          {legendData.map((item, index) => (
            <li key={index} className={style.legendItem}>
              <span className={style.colorDot} style={{ backgroundColor: item.color }}></span>
              {item.label}
            </li>
          ))}
        </ul>
        <button className={style.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ColorLegendModal;
