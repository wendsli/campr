import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const CampgroundShowMapTile = withScriptjs(withGoogleMap((props) => {

  let lat = parseFloat(props.latitude)
  let lng = parseFloat(props.longitude)

  return (
    <GoogleMap
      className="callout campground-show-map"
      defaultZoom={8}
      center={{lat: lat, lng: lng}}
    >
      {
        props.isMarkerShown && <Marker position={
          {lat: lat, lng: lng}
        } />
      }
    </GoogleMap>
  )
}))
export default CampgroundShowMapTile;
