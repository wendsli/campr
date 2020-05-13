import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CampgroundShowTile from '../components/CampgroundShowTile'
import CampgroundShowMap from '../components/CampgroundShowMap'

const CampgroundShowContainer = (props) => {
  const [campground, setCampground] = useState({});

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
      setCampground(body);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
}, []);

  return(
    <div className="grid-container grid-x grid-margin-x campground-show-layout">
      <div className="cell callout map-and-weather medium-4">
        <CampgroundShowMap
          latitude={parseFloat(campground.latitude)}
          longitude={parseFloat(campground.longitude)}
          isMarkerShown={true}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOBSMrSGGkPkNlhDdTAKwM55ZNsght8Yg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `300px` }} />}
          mapElement={<div style={{ height: `100%`}} />}
        />
      </div>
      <CampgroundShowTile campground={campground} />
    </div>
  )
}

export default CampgroundShowContainer;
