import React from "react";

const CampgroundTile = (props) => {
  const camp = props.campground

  return (
    <div className="campground-tile">
      <h5><a href={camp.url} target="_blank">{camp.name}</a></h5>
      <p>{camp.street}, {camp.city}, {camp.state}, {camp.zip}</p>
      <a href="tel:${camp.phone}">{camp.phone}</a>
    </div>
  );
};

export default CampgroundTile
