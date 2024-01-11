import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "./location.scss";
import imagePosition from "../../assets/tabler_location.svg";

function LocationMarker() {
  const [location, setLocation] = useState(null);

  const map = useMapEvents({
    locationfound(e) {
      setLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const handleFindLocationClick = () => {
    map.locate();
  };

  return (
    <div>
      <button
        type="button"
        className="buttonLocation"
        onClick={handleFindLocationClick}
      >
        <img src={imagePosition} alt="Location" />
      </button>
      {location === null ? null : (
        <Marker position={location}>
          <Popup>Vous êtes ici</Popup>
        </Marker>
      )}
    </div>
  );
}

export default LocationMarker;
