import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

function LeafletGeocoder() {
  const map = useMap();
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
      position: "topleft",
      placeholder: "Rechercher une ville ou une adresse",
    })
      .on("markgeocode", function handleMarkGeocodeEvent(e) {
        const latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);
  return null;
}

export default LeafletGeocoder;
