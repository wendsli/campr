import React, { useState, useEffect } from 'react';

import CampgroundShowMapTile from '../components/CampgroundShowMapTile';
import CampgroundShowWeatherTile from '../components/CampgroundShowWeatherTile';

const CampgroundShowWeatherAndMapContainer = (props) => {
  const campground = props.campground
  let weatherTile, mapTile

  if (campground) {
    if (campground.weather.code === "404") {
      weatherTile = <div className="load-failed-message">
        Sorry, no weather data available for this campground.
        </div>
    } else {
      weatherTile = <CampgroundShowWeatherTile weather={campground.weather}/>
    }
  } else {
    weatherTile = <div className="loading-message">
      Loading campground weather data...
      </div>
  };

  if (campground) {
    if (campground.latitude && campground.longitude) {
      mapTile = <CampgroundShowMapTile
      latitude={campground.latitude}
      longitude={campground.longitude}
      isMarkerShown={true}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOBSMrSGGkPkNlhDdTAKwM55ZNsght8Yg&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `300px` }} />}
      mapElement={<div style={{ height: `100%`}} />}
      />
    } else if (campground.latitude === null || campground.longitude === null) {
      mapTile = <div className="load-failed-message">
        Sorry, no area map is available for this campground.
        </div>
    } else {
      mapTile = <div className="loading-message">
        Loading campground area map...
        </div>
    };
  };

  return(
    <div className="cell callout map-and-weather medium-5">
      <div className="weather">
        {weatherTile}
      </div>
      <hr className="divider solid" />
      <div className="map">
        {mapTile}
      </div>
    </div>
  )
};

export default CampgroundShowWeatherAndMapContainer;
