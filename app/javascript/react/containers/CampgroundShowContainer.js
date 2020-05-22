import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import CampgroundShowWeatherAndMapContainer from './CampgroundShowWeatherAndMapContainer'
import CampgroundShowTile from '../components/CampgroundShowTile';
import AdminTile from '../components/AdminTile';

const CampgroundShowContainer = (props) => {
  const [campground, setCampground] = useState();
  const [redirect, setRedirect] = useState(false);

  let weatherAndMapContainer, showTile, adminTile;

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
    if (campground.user.admin) {
      adminTile = <AdminTile
        campground={campground}
        deleteClick={deleteClick}
        />
    } else {
      adminTile = <></>
    }
  }

  if (campground) {
    weatherAndMapContainer = <CampgroundShowWeatherAndMapContainer
      campground={campground} />
  } else {
    weatherAndMapContainer = <div className="loading-message">
      Loading weather and map data...
      </div>
  }

  if (campground) {
    showTile = <CampgroundShowTile campground={campground} />
  } else {
    showTile = <div className="loading-message">
      Loading campground information...
      </div>
  };

  return(
    <div>
      {adminTile}
      <div className="grid-container grid-x grid-margin-x campground-show-layout">
        {weatherAndMapContainer}
        {showTile}
      </div>
    </div>
  );
};

export default CampgroundShowContainer;
