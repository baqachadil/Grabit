import React from "react";
import GoogleMapReact from "google-map-react";

export default function Map(props) {
  const getMapOptions = maps => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }]
        }
      ]
    };
  };

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
