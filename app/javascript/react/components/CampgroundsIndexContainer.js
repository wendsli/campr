import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CampgroundTile from "./CampgroundTile"

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
    campgroundTiles = <p>No campgrounds yet</p>
  } else {
    campgroundTiles = campgrounds.map((campground) => {
        return <CampgroundTile key={campground.id} campground={campground} />
    });
  };

  return(
    <div>
      {campgroundTiles}
      <Link className="button" to="/campgrounds/new">
        Add a new Campground
      </Link>
    </div>
  )
};

export default CampgroundsIndexContainer;
