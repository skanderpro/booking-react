/* global google */
import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import React from "react";

const MapWithAMarker = (props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        defaultOptions={{
            fullscreenControl: false,
        }}
    >
       
    </GoogleMap>
);
export default withGoogleMap(MapWithAMarker);