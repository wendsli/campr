import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import _ from 'lodash';

import NewCampgroundForm from "../components/NewCampgroundForm"

const NewCampgroundFormContainer = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [newCampground, setNewCampground] = useState({});
  const [errors, setErrors] = useState({});

  const [fieldValues, setFieldValues] = useState({
    name: "", street: "", city: "", state: "", zip: "", website: "", phone: "",
    image: "", latitude: "", longitude: "", store: false, firewood: false,
    bathrooms: false, showers: false, utilities: false, waste: false
  });

  const [selectedIcons, setSelectedIcons] = useState({
    store: false, firewood: false, bathrooms: false, showers: false,
    utilities: false, waste: false
  });

  const validateForm = () => {
    let submitErrors = {};
    const requiredFields = [
      "name", "street", "city", "state", "zip", "website"
    ];

    requiredFields.forEach((field) => {
      if (fieldValues[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        };
      };
    });

    if (fieldValues["state"] === "State:") {
      submitErrors = {
        ...submitErrors,
        ["state"]: "must be selected from the list"
      };
    };

    if (!fieldValues["website"].includes("http://") &&
      (!fieldValues["website"].includes("https://"))) {
      submitErrors = {
        ...submitErrors,
        ["website"]: "must include full HTTP(S) address",
      };
    };

    setErrors(submitErrors);
    return _.isEmpty(submitErrors);
  };

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
      setRedirect(true);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (redirect) {
    return <Redirect to={`/campgrounds/${newCampground.id}`} />
  }

  return(
    <div>
      <NewCampgroundForm
        handleFormSubmit={handleFormSubmit}
        fieldValues={fieldValues}
        setFieldValues={setFieldValues}
        validateForm={validateForm}
        errors={errors}
      />
    </div>
  )
};

export default NewCampgroundFormContainer;
