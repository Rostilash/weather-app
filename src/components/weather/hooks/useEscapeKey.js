import { useEffect } from "react";

export const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        callback(); // Call the passed callback function when Escape key is pressed
      }
    };

    // Add event listener on component mount
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback]);
};
