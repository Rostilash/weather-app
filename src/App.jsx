import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Weather } from "./pages/weather-info/Weather";

function App() {
  return (
    <>
      <Router>
        <Weather />
      </Router>
    </>
  );
}

export default App;
