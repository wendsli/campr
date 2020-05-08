import React from "react";
import { Link } from 'react-router-dom';

const CampgroundIndexTile = (props) => {
  const camp = props.campground

  return (
    <div className="callout campground-index-tile cell small-12 medium-4 text-center">
      <img className="campground-index-image" src={camp.image} />
      <Link to={`/campgrounds/${camp.id}`}>
        <h5>{camp.name}</h5>
        <p>{camp.city}, {camp.state}</p>
      </Link>
    </div>
  );
};

export default CampgroundIndexTile
