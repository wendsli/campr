import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CampgroundShowTile = (props) => {
  const camp = props.campground

  let campgroundImage;
  if (camp.image) {
    campgroundImage = camp.image
  } else {
    campgroundImage =
      "https://images.pexels.com/photos/665166/pexels-photo-665166.jpeg"
  }

  let campgroundLatLong;
  if (camp.latitude & camp.longitude) {
    campgroundLatLong = `Latitude: ${camp.latitude}, Longitude: ${camp.longitude}`
  }

  let store, firewood, bathrooms, showers, utilities, waste

  store = <div className={`campground-show-icon-container
    ${camp["store"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="store" size="2x" />
    <label>Store</label>
  </div>

  firewood = <div className={`campground-show-icon-container
    ${camp["firewood"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="tree" size="2x" />
    <label>Firewood</label>
  </div>

  bathrooms = <div className={`campground-show-icon-container
    ${camp["bathrooms"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="restroom" size="2x" />
    <label>Bathrooms</label>
  </div>

  showers = <div className={`campground-show-icon-container
    ${camp["showers"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="shower" size="2x" />
    <label>Showers</label>
  </div>

  utilities = <div className={`campground-show-icon-container
    ${camp["utilities"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="charging-station" size="2x" />
    <label>Utilities</label>
  </div>

  waste = <div className={`campground-show-icon-container
    ${camp["waste"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="trash-alt" size="2x" />
    <label>Waste Disposal</label>
  </div>

  return (
    <div className="callout campground-show-tile">
      <div className="campground-overview grid-container grid-x">
        <div className="campground-show-image-container">
          <img className="campground-show-image" src={campgroundImage} />
        </div>
        <div className="campground-info">
          <h5><a href={camp.website} target="_blank">{camp.name}</a></h5>
          <p>{camp.street}, {camp.city}, {camp.state}, {camp.zip}</p>
          <p><a href="tel:${camp.phone}">{camp.phone}</a></p>
          <p>{campgroundLatLong}</p>
          <div className="campground-show-icons grid-x grid-padding-x">
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
