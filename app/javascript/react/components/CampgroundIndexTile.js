import React from "react";
import { Link } from 'react-router-dom';

const CampgroundIndexTile = (props) => {
  const camp = props.campground

  let campgroundImage;
  if (camp.image) {
    campgroundImage = camp.image
  } else {
    campgroundImage =
      "https://images.pexels.com/photos/665166/pexels-photo-665166.jpeg"
  }

  return (
    <div
      className="callout campground-index-tile cell small-12 medium-4
        text-center"
    >
      <Link to={`/campgrounds/${camp.id}`}>
        <img className="campground-index-image" src={campgroundImage} />
        <div className="campground-index-text">
          <h5>{camp.name}</h5>
          <p>{camp.city}, {camp.state}</p>
        </div>
      </Link>
    </div>
  );
};

export default CampgroundIndexTile
