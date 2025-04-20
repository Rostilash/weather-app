import React from "react";
import style from "./../Weather.module.css";
import preloader from "../../../../public/gif/preloader.webp";

export const PreLoading = () => {
  return (
    <div className={style.loading}>
      <img src={preloader} alt="Loading..." />
    </div>
  );
};
