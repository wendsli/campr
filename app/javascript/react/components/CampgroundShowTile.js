import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'

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
    campgroundLatLong =
      `Latitude: ${camp.latitude} | Longitude: ${camp.longitude}`
  }

  let store, firewood, bathrooms, showers, utilities, waste

  store = <div title="Store" className={`campground-show-icon-container
    ${camp["store"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="store" size="2x" />
  </div>

  firewood = <div title="Firewood" className={`campground-show-icon-container
    ${camp["firewood"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="tree" size="2x" />
  </div>

  bathrooms = <div title="Flush Toilets"
    className={`campground-show-icon-container
    ${camp["bathrooms"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="restroom" size="2x" />
  </div>

  showers = <div title="Showers" className={`campground-show-icon-container
    ${camp["showers"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="shower" size="2x" title="Showers" />
  </div>

  utilities = <div title="Utilities" className={`campground-show-icon-container
    ${camp["utilities"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="charging-station" size="2x" />
  </div>

  waste = <div title="Waste Disposal"
    className={`campground-show-icon-container
    ${camp["waste"] ? "selected" : "unselected" }`}>
    <FontAwesomeIcon icon="trash-alt" size="2x" />
  </div>

  return (
    <div className="callout campground-show-tile">
      <div className="campground-overview grid-container grid-x">
        <div className="campground-show-image-container">
          <img className="campground-show-image" src={campgroundImage} />
        </div>
        <div className="campground-info">
          <h3>
            <a href={camp.website} target="_blank">{camp.name}&nbsp;&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </h3>
          <hr className="divider solid" />
          <p>{camp.street}, {camp.city}, {camp.state}, {camp.zip}</p>
          <p>
            <a href="tel:${camp.phone}">
              <FontAwesomeIcon icon={faPhoneAlt} size="1x" />&nbsp;&nbsp;
              {camp.phone}
            </a>
          </p>
          <p>{campgroundLatLong}</p>
          <hr className="divider solid" />
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
