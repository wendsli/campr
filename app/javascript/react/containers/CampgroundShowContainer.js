import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import CampgroundShowTile from '../components/CampgroundShowTile';
import CampgroundShowMapTile from '../components/CampgroundShowMapTile';
import CampgroundShowWeatherTile from '../components/CampgroundShowWeatherTile';
import AdminTile from '../components/AdminTile';

const CampgroundShowContainer = (props) => {
  const [campground, setCampground] = useState();
  const [redirect, setRedirect] = useState(false);
  let mapTile, showTile, weatherTile, adminTile;

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
      setCampground(body)
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  let deleteClick = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    fetch(`/api/v1/campgrounds/${id}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        setRedirect(true)
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (redirect === true) {
    return <Redirect to="/campgrounds" />
  }

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
    };
  };

  if (campground) {
    showTile = <CampgroundShowTile campground={campground} />
  } else {
    showTile = "Loading campground information..."
  };

  if (campground) {
    weatherTile = <CampgroundShowWeatherTile weather={campground.weather}/>
  } else {
    weatherTile = "Loading campground weather data..."
  };

  if (campground) {
    if (campground.user.admin) {
      adminTile = <AdminTile
        campground={campground}
        deleteClick={deleteClick}
        />
    } else {
      adminTile = <></>
    }
  }

  return(
    <div>
      {adminTile}
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
    </div>
  );
};

export default CampgroundShowContainer;
