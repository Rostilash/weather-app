export const handleSetCoordinates = (lat, lon) => {
  const coordinates = { lat, lon };
  localStorage.setItem("coordinates", JSON.stringify(coordinates));
  console.log("Coordinates saved to localStorage:", coordinates);
};
