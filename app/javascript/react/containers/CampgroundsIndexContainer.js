import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CampgroundIndexTile from "../components/CampgroundIndexTile"

const CampgroundsIndexContainer = (props) => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    fetch("/api/v1/campgrounds")
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
        setCampgrounds(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  let campgroundTiles;
  if (campgrounds.length === 0) {
    campgroundTiles = <p>(Loading campgrounds...)</p>
  } else {
    campgroundTiles = campgrounds.map((campground) => {
        return <CampgroundIndexTile key={campground.id}
          campground={campground} />
    });
  };

  return(
    <div className="grid-container">
      <div className="grid-x grid-margin-x grid-margin-y">
        {campgroundTiles}
      </div>
    </div>
  )
};

export default CampgroundsIndexContainer;
