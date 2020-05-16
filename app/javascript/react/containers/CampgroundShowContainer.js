import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import CampgroundShowTile from '../components/CampgroundShowTile';
import CampgroundShowMapTile from '../components/CampgroundShowMapTile';
import CampgroundShowWeatherTile from '../components/CampgroundShowWeatherTile';

const CampgroundShowContainer = (props) => {
  const [campground, setCampground] = useState();
  const [weather, setWeather] = useState({});
  const [authenticationRedirect, setAuthenticationRedirect] = useState(false)

  useEffect(() => {
    const id = props.match.params.id;
    fetch(`/api/v1/campgrounds/${id}`)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        setAuthenticationRedirect(true)
      } else {
        setCampground(body.campground);
        setWeather(body.weather)
      };
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  if (authenticationRedirect) {
    return <Redirect to={"/users/sign_in"} />
  }

  let mapTile;
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
    } else {
      mapTile = "Loading campground area map..."
    }
  }

  let showTile;
  if (campground) {
    showTile = <CampgroundShowTile campground={campground} />
  } else {
    showTile = "Loading campground information..."
  }

  let weatherTile;
  if (campground) {
    weatherTile = <CampgroundShowWeatherTile weather={weather}/>
  } else {
    weatherTile = "Loading campground weather data..."
  }

  return(
    <div className="grid-container grid-x grid-margin-x campground-show-layout">
      <div className="cell callout map-and-weather medium-5">
        {weatherTile}
        <hr className="divider solid" />
        <div className="map">
          {mapTile}
        </div>
      </div>
      {showTile}
    </div>
  );
};

export default CampgroundShowContainer;
