import windIcon from "../images/icons8-wind-64.png";
import humidityIcon from "../images/icons8-drop-30.png";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import axios from "axios";

function Collapsibles(props) {
  const [nairobiData, setNairobiData] = useState({});
  const [kenyaData, setKenyaData] = useState({});
  const [mombasaData, setMombasaData] = useState({});
  const { openWeatherApiKey } = props;
  const nairobiURL = `https://api.openweathermap.org/data/2.5/weather?q=nairobi&appid=${openWeatherApiKey}`;
  const kenyaURL = `https://api.openweathermap.org/data/2.5/weather?q=kenya&appid=${openWeatherApiKey}`;
  const mombasaURL = `https://api.openweathermap.org/data/2.5/weather?q=mombasa&appid=${openWeatherApiKey}`;

  useEffect(() => {
    const fetchNairobiData = async () => {
      try {
        const response = await axios.get(nairobiURL);
        setNairobiData(response.data);
      } catch (error) {
        console.log("Error fetching Nairobi weather data", error);
      }
    };
    fetchNairobiData();
  }, []);
  useEffect(() => {
    const fetchKenyaData = async () => {
      try {
        const response = await axios.get(kenyaURL);
        setKenyaData(response.data);
      } catch (error) {
        console.log("Error fetching Kenya weather data", error);
      }
    };
    fetchKenyaData();
  }, []);

  useEffect(() => {
    const fetchMombasaData = async () => {
      try {
        const response = await axios.get(mombasaURL);
        setMombasaData(response.data);
      } catch (error) {
        console.log("Error fetching Kenya weather data", error);
      }
    };
    fetchMombasaData();
  }, []);

  const currentDay = dayjs().format("dddd");
  const currentDate = dayjs().format("D MMM");
  const collapsibles = [
    {
      day: currentDay,
      date: currentDate,
      location: nairobiData.name,
      element: nairobiData.weather?.[0]?.main,
      tempMain: nairobiData?.main?.temp
        ? (nairobiData.main.temp - 273.15).toFixed(0)
        : "N/A",
      tempFeels: nairobiData?.main?.feels_like
        ? (nairobiData.main.feels_like - 273.15).toFixed(0)
        : "N/A",
      windSpeed: nairobiData?.wind?.speed
        ? nairobiData.wind.speed.toFixed(0)
        : "N/A",
      humidity: nairobiData?.main?.humidity ? nairobiData.main.humidity : "N/A",
    },
    {
      day: currentDay,
      date: currentDate,
      location: kenyaData.name,
      element: kenyaData.weather?.[0]?.main,
      tempMain: kenyaData?.main?.temp
        ? (kenyaData.main.temp - 273.15).toFixed(0)
        : "N/A",
      tempFeels: kenyaData?.main?.feels_like
        ? (kenyaData.main.feels_like - 273.15).toFixed(0)
        : "N/A",
      windSpeed: kenyaData?.wind?.speed
        ? kenyaData.wind.speed.toFixed(0)
        : "N/A",
      humidity: kenyaData?.main?.humidity ? kenyaData.main.humidity : "N/A",
    },
    {
      day: currentDay,
      date: currentDate,
      location: mombasaData.name,
      element: mombasaData.weather?.[0]?.main,
      tempMain: mombasaData?.main?.temp
        ? (mombasaData.main.temp - 273.15).toFixed(0)
        : "N/A",
      tempFeels: mombasaData?.main?.feels_like
        ? (mombasaData.main.feels_like - 273.15).toFixed(0)
        : "N/A",
      windSpeed: mombasaData?.wind?.speed
        ? mombasaData.wind.speed.toFixed(0)
        : "N/A",
      humidity: mombasaData?.main?.humidity ? mombasaData.main.humidity : "N/A",
    },
  ];
  return (
    <div>
      <p className="at-a-glance">Weather at a glance</p>
      <div className="collapsibles-container">
        {collapsibles.map((collapsible, collapsibleIndex) => {
          return (
            <div key={collapsibleIndex} className="collapsible">
              <header>
                <h5>
                  {collapsible.day}
                  <br />
                  <span>{collapsible.date}</span>
                </h5>
                <h2>{collapsible.location}</h2>
              </header>
              <div className="mid-tab">
                <h3>{collapsible.element}</h3>
                <h3>
                  {collapsible.tempMain}°<span>{collapsible.tempFeels}°</span>
                </h3>
              </div>
              <div className="bottom-tab">
                <div>
                  <img src={windIcon} />
                  <p>{collapsible.windSpeed} m/s</p>
                  <p className="weather-element-bottom">Wind</p>
                </div>
                <div>
                  <img src={humidityIcon} />
                  <p>{collapsible.humidity}%</p>
                  <p className="weather-element-bottom">Humidity</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Collapsibles.propTypes = {
  openWeatherApiKey: PropTypes.string.isRequired,
};

export default Collapsibles;
