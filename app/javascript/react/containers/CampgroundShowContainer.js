import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CampgroundShowTile from '../components/CampgroundShowTile'

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
    <div>
      <CampgroundShowTile campground={campground} />
      <Link className="button" to="/campgrounds">All Campgrounds</Link>
    </div>
  )
}

export default CampgroundShowContainer
