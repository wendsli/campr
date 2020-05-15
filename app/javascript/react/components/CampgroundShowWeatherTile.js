import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

const CampgroundShowWeatherTile = (props) => {
  const weather = props.weather;

  const kelvinToFahrenheit = (kelvinTemp) => {
    return parseInt((kelvinTemp - 273.15) * 9/5 + 32)
  };

  const temp = kelvinToFahrenheit(weather.temp)
  const feels = kelvinToFahrenheit(weather.feels)
  const lowTemp = kelvinToFahrenheit(weather.low)
  const highTemp = kelvinToFahrenheit(weather.high)

  let weatherIcon;
  if (weather.icon) {
    weatherIcon = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  };

  let tinyWeatherIcon;
  if (weather.icon) {
    tinyWeatherIcon = `http://openweathermap.org/img/wn/${weather.icon}.png`
  };

  return (
    <div className="callout campground-show-weather-tile">
      <div className="grid-container">
        <div className="grid-x weather-location-and-icon">
          <div className="grid-y weather-place-and-date">
            <h4>{weather.location}</h4>
            <p className="weather-date">{weather.date}</p>
          </div>
          <img className="weather-icon"
            src={weatherIcon}
          />
          <h4 className="weather-temp">{temp}&deg;F</h4>
        </div>
        <hr className="divider solid" />
        <div className="grid-y weather-temperature">
          <p className="weather-high-low-temp">
            <FontAwesomeIcon icon={faTemperatureHigh} size="1x" />
            &nbsp;&nbsp;{highTemp}&nbsp; / &nbsp;
            <FontAwesomeIcon icon={faTemperatureLow} size="1x" />
            &nbsp;&nbsp;{lowTemp}&nbsp;&deg;F
          </p>
          <p className="tiny-weather-icon-and-description">
            <img className="tiny-weather-icon"
              src={tinyWeatherIcon}
            />
            {weather.description}
          </p>
        </div>
        <hr className="divider solid" />
        <div className="grid-y weather-wind-and-humidity">
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind} mph</p>
        </div>
      </div>
    </div>
  );
};

export default CampgroundShowWeatherTile;
