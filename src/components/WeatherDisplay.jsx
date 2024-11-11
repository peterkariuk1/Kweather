import PropTypes from "prop-types";
import classNames from "classnames";

function WeatherDisplay(props) {
  const { data, isSearched} = props;

 
  
  return (
    <div className="weather-display-container">
      <div className="top-details">
        <div>
          <h2>{data.name || "Enter Country or City Name"}</h2>
          <h1>
            {data?.main?.temp
              ? `${(data.main.temp - 273.15).toFixed(1)} °C`
              : ""}
          </h1>
        </div>
        <div>
          <p className="weather-element">{data.weather?.[0]?.main || ""}</p>
        </div>
      </div>
      <div
        className={classNames("bottom-details", {
          "bottom-details-active": isSearched,
        })}
      >
        <div>
          <h4>
            {data?.main?.feels_like
              ? `${(data.main.feels_like - 273.15).toFixed(1)} °C`
              : "N/A"}
          </h4>
          <p>Feels Like</p>
        </div>
        <div>
          <h4>{data?.main?.humidity ? `${data.main.humidity} %` : "N/A"}</h4>
          <p>Humidity</p>
        </div>
        <div>
          <h4>{data?.wind?.speed ? `${data.wind.speed} ms` : "N/A"}</h4>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

WeatherDisplay.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
      })
    ),
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }),
  }).isRequired,
  isSearched: PropTypes.bool.isRequired,
};
export default WeatherDisplay;
