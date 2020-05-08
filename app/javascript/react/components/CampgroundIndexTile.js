import React from "react";
import { Link } from 'react-router-dom';

const CampgroundIndexTile = (props) => {
  const camp = props.campground

  return (
    <div className="callout campground-index-tile">
      <Link to={`/campgrounds/${camp.id}`}>
        <h5>{camp.name}</h5>
        <p>{camp.city}, {camp.state}</p>
      </Link>
    </div>
  );
};

export default CampgroundIndexTile
