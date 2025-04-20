import style from "./../Weather.module.css";
import Error from "../../../../public/gif/error.gif";

export const ErrorPage = () => {
  return (
    <div className={style.error}>
      <img src={Error} alt="Loading..." />
      <h1>False to load the weather, try again...</h1>
    </div>
  );
};
