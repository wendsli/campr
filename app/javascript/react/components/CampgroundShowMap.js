import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const CampgroundShowMap = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      className="callout campground-show-map"
      defaultZoom={8}
      center={{lat: props.latitude, lng: props.longitude}}
    >
      {
        props.isMarkerShown && <Marker position={
          {lat: props.latitude, lng: props.longitude}
        } />
      }
    </GoogleMap>
  )
}))
export default CampgroundShowMap;
