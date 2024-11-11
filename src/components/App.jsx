import { useState } from "react";
import SearchBox from "./SearchBox.jsx";
import WeatherDisplay from "./WeatherDisplay.jsx";
import Collapsibles from "./Collapsibles.jsx";
import "../styles/App.css";
import axios from "axios";

function App() {
  const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [showInstructions,setShowInstructions] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openWeatherApiKey}`;

  const handleWeatherData = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsSearched(true);
        setLocation("");
        setShowInstructions(false)
        handleClearDisplay()
      })
      .catch((error) => {
        alert("Error fetching weather data", error);
        setLocation("");
        setShowInstructions(false)
      });
  };
  const handleClearDisplay = () => {
    setTimeout(function (){
      setData({});
      setIsSearched(false)
    },30000)
  }

  return (
    <div className="app-container">
      <SearchBox
        location={location}
        setLocation={setLocation}
        handleWeatherData={handleWeatherData}
        showInstructions={showInstructions}
        setShowInstructions={setShowInstructions}
      />
      <WeatherDisplay data={data} isSearched={isSearched} />
      <Collapsibles openWeatherApiKey={openWeatherApiKey} />
    </div>
  );
}

export default App;
