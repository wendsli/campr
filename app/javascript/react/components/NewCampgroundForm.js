import React, { useState } from "react"
import _ from 'lodash'

import ErrorList from "./ErrorList"

const NewCampgroundForm = (props) => {
  const [submitErrors, setSubmitErrors] = useState({});

  const [fieldValues, setFieldValues] = useState({
    name: "", street: "", city: "", state: "", zip: "", url: "", phone: "",
    image: "", latitude: "", longitude: "", store: false, firewood: false,
    bathrooms: false, showers: false, utilities: false, waste_disposal: false
  });

  const handleChange = (event) => {
    setFieldValues({
      ...fieldValues,
      [event.currentTarget.id]: event.currentTarget.value
    });
  };

  const validateForm = () => {
    const requiredFields = ["name", "street", "city", "state", "zip", "url"];
    let newErrors = {};

    requiredFields.forEach((field) => {
      if (fieldValues[field].trim() === "") {
        newErrors = {
          ...newErrors,
          [field]: "is blank"
        };
      };
    });

    if (!fieldValues["url"].includes("http://") &&
      (!fieldValues["url"].includes("https://"))) {
      newErrors = {
        ...newErrors,
        ["url"]: "must include full HTTP(S) address",
      };
    };

    setSubmitErrors(newErrors);
    return _.isEmpty(submitErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      props.handleFormSubmit(fieldValues)
    };
  };

  return(
    <div>
      <h3>Add a campground!</h3>
      <form onSubmit={handleSubmit}>
        <div className="error-list">
          <ErrorList errors={submitErrors} />
        </div>

        <div className="campground-form-text-fields">
          <input
            aria-label="Campground name"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={fieldValues.name}
            placeholder="Campground name"
          />

          <div className="campground-form-address">
            <input
              aria-label="Street address"
              type="text"
              name="street"
              id="street"
              onChange={handleChange}
              value={fieldValues.street}
              placeholder="Street"
            />

            <input
              aria-label="City"
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={fieldValues.city}
              placeholder="City"
            />

            <input
              aria-label="State"
              type="text"
              name="state"
              id="state"
              onChange={handleChange}
              value={fieldValues.state}
              placeholder="State"
            />

            <input
              aria-label="Zip code"
              type="text"
              name="zip"
              id="zip"
              onChange={handleChange}
              value={fieldValues.zip}
              placeholder="Zip code"
            />
          </div>

          <input
            aria-label="Website"
            type="text"
            name="url"
            id="url"
            onChange={handleChange}
            value={fieldValues.website}
            placeholder="Campground website - http://...."
          />

          <input
            aria-label="Phone number"
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
            value={fieldValues.phone}
            placeholder="Phone number"
          />

          <input
            aria-label="Image URL"
            type="text"
            name="image"
            id="image"
            onChange={handleChange}
            value={fieldValues.image}
            placeholder="Image URL"
          />

          <input
            aria-label="Campground latitude"
            type="text"
            name="latitude"
            id="latitude"
            onChange={handleChange}
            value={fieldValues.latitude}
            placeholder="Campground latitude"
          />

          <input
            aria-label="Campground longitude"
            type="text"
            name="longitude"
            id="longitude"
            onChange={handleChange}
            value={fieldValues.longitude}
            placeholder="Campground longitude"
          />
        </div>

        <div className="campground-form-boolean-fields">
          <input
            type="checkbox"
            name="store"
            id="store"
            onChange={handleChange}
            value={fieldValues.store}
          />
          <label htmlFor="store">Store</label>

          <input
            type="checkbox"
            name="firewood"
            id="firewood"
            onChange={handleChange}
            value={fieldValues.firewood}
          />
          <label htmlFor="name">Firewood</label>

          <input
            type="checkbox"
            name="bathrooms"
            id="bathrooms"
            onChange={handleChange}
            value={fieldValues.bathrooms}
          />
          <label htmlFor="name">Bathrooms</label>

          <input
            type="checkbox"
            name="showers"
            id="showers"
            onChange={handleChange}
            value={fieldValues.showers}
          />
          <label htmlFor="showers">Showers</label>

          <input
            type="checkbox"
            name="utilities"
            id="utilities"
            onChange={handleChange}
            value={fieldValues.utilities}
          />
          <label htmlFor="utilities">Utilities</label>

          <input
            type="checkbox"
            name="waste"
            id="waste"
            onChange={handleChange}
            value={fieldValues.waste}
          />
          <label htmlFor="waste">Waste Disposal</label>
        </div>

        <div>
          <input className="button" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default NewCampgroundForm;
