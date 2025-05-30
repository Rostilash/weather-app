import style from "./../Weather.module.css";

export const ErrorPage = () => {
  return (
    <div className={style.error}>
      <img src="gif/error.gif" alt="Loading..." />
      <h1>False to load the weather, try again...</h1>
    </div>
  );
};
