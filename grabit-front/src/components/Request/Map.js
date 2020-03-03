import React from "react";
import GoogleMapReact from "google-map-react";

export default function Map(props) {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyCL3qzgqg6P8crdHBcQMnOQo7KWFnOkpVs" }}
      defaultZoom={10}
      center={props.center}
      yesIWantToUseGoogleMapApiInternals
      zoom={15}
      onGoogleApiLoaded={({ map, maps }) => props.renderPolylines(map, maps)}
    ></GoogleMapReact>
  );
}
