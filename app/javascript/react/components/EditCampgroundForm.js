import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ErrorList from './ErrorList'

const states = [
  "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "GU", "HI", "IA",
  "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS",
  "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA",
  "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"
]

const EditCampgroundForm = (props) => {
  const stateList = ["State:"].concat(states).map(state => {
    return(
      <option key={state} value={state}>
        {state}
      </option>
    )
  })

  const handleFormTextChange = (event) => {
    props.setFieldValues({
      ...props.fieldValues,
      [event.currentTarget.id]: event.currentTarget.value
    });
  };

  const handleFormIconClick = (event) => {
    event.preventDefault();
    props.setFieldValues({
      ...props.fieldValues,
      [event.currentTarget.id]: !props.fieldValues[event.currentTarget.id]
    });
  }

  const textFieldValueTrim = () => {
    const fieldValueKeys = Object.keys(props.fieldValues)
    fieldValueKeys.forEach((field) => {
      let inputValue = props.fieldValues[field];
      if (typeof(inputValue) !== "boolean") {
        props.setFieldValues({
          ...props.fieldValues,
          [field]: inputValue.trim()
        });
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    textFieldValueTrim()
    if (props.validateForm()) {
      props.handleEditSubmit(props.fieldValues)
    };
  };

  return(
    <div className="callout edit-campground-form">
      <h3>Edit this campground:</h3>
      <ErrorList errors={props.errors} />
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          <div className="campground-form-text-fields">
            <div className="grid-x grid-padding-x grid-margin-x">
              <input
                aria-label="Campground name"
                type="text"
                className="medium-4 cell"
                name="name"
                id="name"
                onChange={handleFormTextChange}
                value={props.fieldValues.name}
                placeholder="* Campground name"
              />

              <input
                aria-label="Phone number"
                className="medium-3 cell"
                type="text"
                name="phone"
                id="phone"
                onChange={handleFormTextChange}
                value={props.fieldValues.phone}
                placeholder="Phone: 555-555-5555"
              />

              <input
                aria-label="*Website"
                className="medium-5 cell"
                type="text"
                name="website"
                id="website"
                onChange={handleFormTextChange}
                value={props.fieldValues.website}
                placeholder="* Campground website: http://...."
              />
            </div>

            <div className="grid-x grid-padding-x grid-margin-x">
              <input
                aria-label="Street address"
                className="medium-5 cell"
                type="text"
                name="street"
                id="street"
                onChange={handleFormTextChange}
                value={props.fieldValues.street}
                placeholder="* Street address"
              />

              <input
                aria-label="City"
                className="medium-3 cell"
                type="text"
                name="city"
                id="city"
                onChange={handleFormTextChange}
                value={props.fieldValues.city}
                placeholder="* City"
              />

              <select
                aria-label="State"
                className="medium-2 cell"
                name="state"
                id="state"
                onChange={handleFormTextChange}
                placeholder={{ key: "State:", value: "State:"}}
                value={props.fieldValues.state}
              >
                {stateList}
              </select>

              <input
                aria-label="Zip code"
                className="medium-2 cell"
                type="text"
                name="zip"
                id="zip"
                onChange={handleFormTextChange}
                value={props.fieldValues.zip}
                placeholder="* Zip code"
              />
            </div>

            <div className="grid-x grid-padding-x grid-margin-x">
              <input
                aria-label="Image URL"
                className="medium-6 cell"
                type="text"
                name="image"
                id="image"
                onChange={handleFormTextChange}
                value={props.fieldValues.image}
                placeholder="Campground photo URL: http://..."
              />

              <input
                aria-label="Campground latitude"
                type="text"
                className="medium-3 cell"
                name="latitude"
                id="latitude"
                onChange={handleFormTextChange}
                value={props.fieldValues.latitude}
                placeholder="Latitude"
              />

              <input
                aria-label="Campground longitude"
                className="medium-3 cell"
                type="text"
                name="longitude"
                id="longitude"
                onChange={handleFormTextChange}
                value={props.fieldValues.longitude}
                placeholder="Longitude"
              />
            </div>
          </div>

          <div className="campground-form-icons">
            <h5>Campground Services:</h5>
            <div className="grid-x grid-padding-x">
              <div className={`campground-form-icon-container
                ${props.fieldValues["store"] ? "selected" : "unselected" }`}>
                <FontAwesomeIcon
                  icon="store"
                  size="2x"
                  name="store"
                  id="store"
                  title="Store"
                  className={`campground-form-icon
                    ${props.fieldValues["store"] ? "selected" : "unselected" }`}
                  onClick={handleFormIconClick}
                />
              </div>

              <div className={`campground-form-icon-container
                ${props.fieldValues["firewood"] ? "selected" : "unselected" }`}>
                <FontAwesomeIcon
                  icon="tree"
                  size="2x"
                  name="firewood"
                  id="firewood"
                  title="Firewood"
                  className={`campground-form-icon
                    ${props.fieldValues["firewood"] ? "selected" : "unselected" }`}
                  onClick={handleFormIconClick}
                />
              </div>

              <div className={`campground-form-icon-container
                ${props.fieldValues["bathrooms"] ? "selected" : "unselected" }`}>
                <FontAwesomeIcon
                  icon="restroom"
                  size="2x"
                  name="bathrooms"
                  id="bathrooms"
                  title="Flush Toilets"
                  className={`campground-form-icon
                    ${props.fieldValues["bathrooms"] ? "selected" : "unselected" }`}
                  onClick={handleFormIconClick}
                />
              </div>

              <div className={`campground-form-icon-container
                ${props.fieldValues["showers"] ? "selected" : "unselected" }`}>
                <FontAwesomeIcon
                  icon="shower"
                  size="2x"
                  name="showers"
                  id="showers"
                  title="Showers"
                  className={`campground-form-icon
                    ${props.fieldValues["showers"] ? "selected" : "unselected" }`}
                  onClick={handleFormIconClick}
                />
              </div>

              <div className={`campground-form-icon-container
                ${props.fieldValues["utilities"] ? "selected" : "unselected" }`}>
                <FontAwesomeIcon
                  icon="charging-station"
                  size="2x"
                  name="utilities"
                  id="utilities"
                  title="Utilities"
                  className={`campground-form-icon
                    ${props.fieldValues["utilities"] ? "selected" : "unselected" }`}
                  onClick={handleFormIconClick}
                />
              </div>

              <div className={`campground-form-icon-container
                ${props.fieldValues["waste"] ? "selected" : "unselected" }`}>
                <FontAwesomeIcon
                  icon="trash-alt"
                  size="2x"
                  name="waste"
                  id="waste"
                  title="Waste Disposal"
                  className={`campground-form-icon
                    ${props.fieldValues["waste"] ? "selected" : "unselected" }`}
                  onClick={handleFormIconClick}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="edit-campground-form-submit">
          <input
            className="button submit-campground-edits"
            type="submit"
            value="Submit Edits"
            onSubmit={handleSubmit}
          />
          <button
            className="button cancel-campground-edits"
            onClick={() => props.setEditCampground(false)}
          >
            Cancel Edits
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCampgroundForm;
