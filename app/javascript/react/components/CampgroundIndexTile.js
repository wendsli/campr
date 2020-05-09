import React from "react";
import { Link } from 'react-router-dom';

const CampgroundIndexTile = (props) => {
  const camp = props.campground

  return (
    <div className="callout campground-index-tile cell small-12 medium-4 text-center">
      <Link to={`/campgrounds/${camp.id}`}>
        <img className="campground-index-image" src={camp.image} />
        <div className="campground-index-text">
          <h5>{camp.name}</h5>
          <p>{camp.city}, {camp.state}</p>
        </div>
      </Link>
    </div>
  );
};

export default CampgroundIndexTile
