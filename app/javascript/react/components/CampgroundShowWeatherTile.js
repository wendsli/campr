import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureLow, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'

const CampgroundShowWeatherTile = (props) => {
  const weather = props.weather

  const kelvinToFahrenheit = (kelvinTemp) => {
    return parseInt((kelvinTemp - 273.15) * 9/5 + 32)
  }

  const temp = kelvinToFahrenheit(weather.temp)
  const feels = kelvinToFahrenheit(weather.feels)
  const lowTemp = kelvinToFahrenheit(weather.low)
  const highTemp = kelvinToFahrenheit(weather.high)

  let weatherIcon;
  if (weather.icon) {
    weatherIcon = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  }

  return (
    <div className="callout campground-show-weather-tile">
      <div className="main-weather-data">
        <img className="campground-show-weather-icon"
          src={weatherIcon}
        />
        <h4>{weather.conditions}&nbsp;&nbsp;|&nbsp;&nbsp;{temp}&deg;F</h4>
      </div>
      <h5>
        <FontAwesomeIcon icon={faTemperatureLow} size="1x" /> {lowTemp}&deg;F
        &nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon icon={faTemperatureHigh} size="1x" /> {highTemp}&deg;F
      </h5>
      <h5>
        Humidity: {weather.humidity}%
      </h5>
    </div>
  )
}

export default CampgroundShowWeatherTile;
