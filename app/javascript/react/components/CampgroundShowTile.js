import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CampgroundShowTile = (props) => {
  const camp = props.campground

  let campgroundLatLong;
  if (camp.latitude & camp.longitude) {
    campgroundLatLong = `Latitude: ${camp.latitude}, Longitude: ${camp.longitude}`
  }

  let store, firewood, bathrooms, showers, utilities, waste

  if (camp.store) {
    store = <FontAwesomeIcon
      className="campground-icon available-service-campground-icon"
      icon="store" size="2x"
    />
  } else {
    store = <FontAwesomeIcon
      className="campground-icon unavailable-service-campground-icon"
      icon="store" size="2x"
    />
  }

  if (camp.firewood) {
    firewood = <FontAwesomeIcon
      className="campground-icon available-service-campground-icon"
      icon="tree" size="2x"
    />
  } else {
    firewood = <FontAwesomeIcon
      className="campground-icon unavailable-service-campground-icon"
      icon="tree" size="2x"
    />
  }

  if (camp.bathrooms) {
    bathrooms = <FontAwesomeIcon
      className="campground-icon available-service-campground-icon"
      icon="restroom" size="2x"
    />
  } else {
    bathrooms = <FontAwesomeIcon
      className="campground-icon unavailable-service-campground-icon"
      icon="restroom" size="2x"
    />
  }

  if (camp.showers) {
    showers = <FontAwesomeIcon
      className="campground-icon available-service-campground-icon"
      icon="shower" size="2x"
    />
  } else {
    showers = <FontAwesomeIcon
      className="campground-icon unavailable-service-campground-icon"
      icon="shower" size="2x"
    />
  }

  if (camp.utilities) {
    utilities = <FontAwesomeIcon
      className="campground-icon available-service-campground-icon"
      icon="charging-station" size="2x"
    />
  } else {
    utilities = <FontAwesomeIcon
      className="campground-icon unavailable-service-campground-icon"
      icon="charging-station" size="2x"
    />
  }

  if (camp.waste) {
    waste = <FontAwesomeIcon
      className="campground-icon available-service-campground-icon"
      icon="trash-alt" size="2x"
    />
  } else {
    waste = <FontAwesomeIcon
      className="campground-icon unavailable-service-campground-icon"
      icon="trash-alt" size="2x"
    />
  }

  return (
    <div className="callout campground-show-tile">
      <div className="campground-overview grid-container grid-x">
        <img className="campground-show-image" src={camp.image} />
        <div className="campground-info">
          <h5><a href={camp.website} target="_blank">{camp.name}</a></h5>
          <p>{camp.street}, {camp.city}, {camp.state}, {camp.zip}</p>
          <p><a href="tel:${camp.phone}">{camp.phone}</a></p>
          <p>{campgroundLatLong}</p>
          <div className="campground-icons">
          {store}
          {firewood}
          {bathrooms}
          {showers}
          {utilities}
          {waste}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampgroundShowTile
