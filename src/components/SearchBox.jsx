import PropTypes from "prop-types";
import classNames from "classnames";


function SearchBox(props) {
  const { location, setLocation, handleWeatherData,showInstructions,setShowInstructions} = props;

  const handleInstructions = () => {
    setShowInstructions(location !== '');
  };

  return (
    <div className="search-box-container">
      <input
        placeholder="Enter Location"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
          handleInstructions();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && location) {
            if (!location) {
              return;
            } else {
              handleWeatherData();
            }
          }
        }}
      />
      <div
        className={classNames("instructions-container", {
          "instructions-container-active": showInstructions,
        })}
      >
        <p>Press enter to continue</p>
      </div>
    </div>
  );
}

SearchBox.propTypes = {
  handleWeatherData: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  showInstructions:PropTypes.bool.isRequired,
  setShowInstructions:PropTypes.func.isRequired
};

export default SearchBox;
