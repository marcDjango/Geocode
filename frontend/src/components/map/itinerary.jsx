import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

function Itinerary({ userLocation, isActive, chargingStations }) {
  const map = useMap();
  const markerRef = useRef(null);
  const routingControlRef = useRef(null);

  // Fonction pour enlever l'itinéraire
  const removeRoutingControl = () => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }
  };

  useEffect(() => {
    if (isActive) {
      // Récupère les coordonnées de la station de recharge
      const waypoints = chargingStations.map((station) => {
        return L.latLng(
          station.consolidated_latitude,
          station.consolidated_longitude
        );
      });

      // Crée un contrôle de routage avec des options
      const routingControl = L.Routing.control({
        waypoints: [
          {
            latLng: L.latLng(userLocation[0], userLocation[1]),
            name: "Ma localisation",
          },
          ...waypoints,
        ],
        lineOptions: { color: "blue", weight: 4, opacity: 0.7 },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        language: "fr",
      })
        // Événement déclenché lorsque des routes sont trouvées
        .on("routesfound", (e) => {
          const currentMarker = markerRef.current;

          if (currentMarker) {
            // Anime le déplacement du marqueur le long des coordonnées de l'itinéraire
            e.routes[0].coordinates.forEach((c, i) => {
              setTimeout(
                () => currentMarker.setLatLng([c.lat, c.lng]),
                1000 * i
              );
            });
          }
        })
        // Ajoute le contrôle de routage à la carte
        .addTo(map);

      // Stocke la référence au contrôle de routage
      routingControlRef.current = routingControl;
    }

    // Nettoie la carte lorsque le composant est démonté
    return () => {
      removeRoutingControl();
    };
  }, [map, userLocation, isActive, chargingStations]);

  return null;
}

Itinerary.propTypes = {
  userLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  isActive: PropTypes.bool.isRequired,
  chargingStations: PropTypes.arrayOf(
    PropTypes.shape({
      consolidated_latitude: PropTypes.number.isRequired,
      consolidated_longitude: PropTypes.number.isRequired,
    }).isRequired
  ),
};

Itinerary.defaultProps = {
  chargingStations: [],
};

export default Itinerary;
