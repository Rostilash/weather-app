import React from "react";
import "./Loading.css";

export const Loading = () => {
  return (
    <>
      <svg className="pl" viewBox="0 0 200 200">
        <circle className="pl__ring" cx="100" cy="100" r="80" strokeWidth="20" fill="none" />
        <circle className="pl__worm" cx="100" cy="100" r="80" strokeWidth="20" fill="none" />
      </svg>
    </>
  );
};
