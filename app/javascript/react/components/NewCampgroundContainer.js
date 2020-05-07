import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import NewCampgroundForm from "./NewCampgroundForm"

const NewCampgroundContainer = (props) => {
  // const [redirect, setRedirect] = useState(false)
  const [newCampground, setNewCampground] = useState({})

  const handleFormSubmit = (formPayload) => {
    fetch('/api/v1/campgrounds', {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      let newCampground = body.campground;
      setNewCampground(newCampground);
      // setRedirect(true);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  // if (redirect) {
  //   return <Redirect to={`/campgrounds/${newCampground.id}`} />
  // }

  return(
    <div>
      <NewCampgroundForm handleFormSubmit={handleFormSubmit} />
    </div>
  )
};

export default NewCampgroundContainer;
