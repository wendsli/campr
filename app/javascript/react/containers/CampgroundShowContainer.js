import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import AdminTileContainer from './AdminTileContainer';
import CampgroundShowTile from '../components/CampgroundShowTile';
import CampgroundShowMapTile from '../components/CampgroundShowMapTile';
import CampgroundShowWeatherTile from '../components/CampgroundShowWeatherTile';
import EditCampgroundFormContainer from './EditCampgroundFormContainer';

const CampgroundShowContainer = (props) => {
  const [campground, setCampground] = useState();
  const [deleteRedirect, setDeleteRedirect] = useState(false);
  const [editCampground, setEditCampground] = useState(false);

  let mapTile, showTile, weatherTile, adminTile, editCampgroundTile;
  const id = props.match.params.id

  useEffect(() => {
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

  let handleDeleteClick = (event) => {
    event.preventDefault();
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
        setDeleteRedirect(true)
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (deleteRedirect === true) {
    return <Redirect to="/campgrounds" />
  };

  if (campground) {
    if (campground.user.admin) {
      adminTile = <AdminTileContainer
        campground={campground}
        handleDeleteClick={handleDeleteClick}
        setEditCampground={setEditCampground}
        />
    } else {
      adminTile = <></>
    };
  };

  if (campground) {
    if (campground.user.admin && editCampground === true) {
      editCampgroundTile = <EditCampgroundFormContainer
        campground={campground}
        setCampground={setCampground}
        setEditCampground={setEditCampground}
        />
    } else {
      editCampgroundTile = <></>
    }
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

  return(
    <div>
      {adminTile}
      <div>
        {editCampgroundTile}
      </div>
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
