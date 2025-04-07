import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Weather } from "./components/weather/Weather";

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
