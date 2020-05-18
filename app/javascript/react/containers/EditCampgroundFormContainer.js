import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import _ from 'lodash';

import EditCampgroundForm from "../components/EditCampgroundForm"

const EditCampgroundFormContainer = ({campground, setCampground, setEditCampground}) => {
  const [errors, setErrors] = useState({});

  const [fieldValues, setFieldValues] = useState({
    name: campground.name, street: campground.street, city: campground.city,
    state: campground.state, zip: campground.zip, website: campground.website,
    phone: campground.phone, image: campground.image,
    latitude: campground.latitude, longitude: campground.longitude,
    store: campground.store, firewood: campground.firewood,
    bathrooms: campground.bathrooms, showers: campground.showers,
    utilities: campground.utilities, waste: campground.waste
  });

  const [selectedIcons, setSelectedIcons] = useState({
    store: campground.store, firewood: campground.firewood,
    bathrooms: campground.bathrooms, showers: campground.showers,
    utilities: campground.utilities, waste: campground.waste
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

  const handleEditSubmit = (formPayload) => {
    fetch(`/api/v1/campgrounds/${campground.id}`, {
      credentials: "same-origin",
      method: "PATCH",
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
      if (body.errors) {
        setErrors(body.errors)
      } else {
        setCampground(body)
        setEditCampground(false)
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return(
    <div>
      <EditCampgroundForm
        handleEditSubmit={handleEditSubmit}
        fieldValues={fieldValues}
        setFieldValues={setFieldValues}
        validateForm={validateForm}
        errors={errors}
        setEditCampground={setEditCampground}
      />
    </div>
  )
};

export default EditCampgroundFormContainer;
