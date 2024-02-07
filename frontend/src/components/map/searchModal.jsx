import { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

function LeafletGeocoderModal() {
  const map = useMap();
  const [latlng, setLatlng] = useState(null);
  useEffect(() => {
    const geocoderControl = L.Control.geocoder({
      defaultMarkGeocode: false,
      position: "bottomleft",
      placeholder: "Rechercher une ville ou une adresse",
      collapsed: false,
      showResultIcons: false,
    }).addTo(map);

    geocoderControl.on("markgeocode", function handleMarkGeocodeEvent(e) {
      const centerPosition = e.geocode.center;
      setLatlng(centerPosition);

      L.marker(centerPosition).addTo(map).bindPopup(e.geocode.name).openPopup();
      map.fitBounds(e.geocode.bbox);
    });
  }, [map]);

  useEffect(() => {
    const element = document.querySelector(
      ".leaflet-control-geocoder-options-open"
    );
    const bodymodal = document.querySelector(".background-modal-map");

    if (element) {
      if (latlng) {
        element.style.display = "none";
        bodymodal.style.display = "none";
      }
    }
  }, [latlng]);

  return null;
}

export default LeafletGeocoderModal;
