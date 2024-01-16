import { useCallback, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import { Icon, DivIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import VectorImage from "../../assets/el_map-marker.svg";
import LocationMarker from "./location";
import LeafletGeocoder from "./search";
import Modal from "./modal";
import Itinerary from "./itinerary";

const { VITE_BACKEND_URL } = import.meta.env;

function Map() {
  // Position initiale de la carte
  const position = [48.8566, 2.3522];
  const [chargingStations, setChargingStations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isRoutingActive, setRoutingActive] = useState(false);

  // Fonction pour récupérer les stations de recharge depuis le backend
  const fetchChargingStations = useCallback(async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/charging-stations`);
      const data = await response.json();

      // Limitez le nombre de lignes à 1000
      const limitedData = data.slice(0, 500);

      setChargingStations(limitedData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchChargingStations();
  }, [fetchChargingStations]);

  // Fonction pour créer une icône personnalisée pour les clusters
  const createClusterCustomIcon = useCallback((cluster) => {
    return new DivIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  }, []);

  // Icône personnalisée pour les marqueurs individuels
  const customIcon = new Icon({
    iconUrl: VectorImage,
    iconSize: [38, 38],
  });

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((currentPosition) => {
        setUserLocation([
          currentPosition.coords.latitude,
          currentPosition.coords.longitude,
        ]);
      });
    }
  }, []);

  useEffect(() => {
    getUserLocation();
    fetchChargingStations();
  }, [getUserLocation, fetchChargingStations]);

  const handleActivateRoute = () => {
    setRoutingActive(true);
  };

  return (
    <MapContainer center={position} zoom={8} zoomControl={false}>
      <TileLayer
        attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        accessToken="Ub2AxCLkCgIdI6pF2eBFVaPDSbbrCWDR9aQaCd8oiLatz7jRZajpn2Wi949QupSD"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        maxClusterRadius={100}
      >
        {chargingStations.map((station) => (
          <Marker
            key={station.id}
            position={[
              station.consolidated_latitude,
              station.consolidated_longitude,
            ]}
            icon={customIcon}
          >
            <Popup>
              <Modal station={station} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <LocationMarker />
      {userLocation && (
        <Itinerary
          userLocation={userLocation}
          isActive={isRoutingActive}
          chargingStations={chargingStations}
        />
      )}
      <ZoomControl position="topright" />
      <LeafletGeocoder />
      <button
        type="button"
        className="itinerary-button"
        onClick={handleActivateRoute}
      >
        Activer l'itinéraire
      </button>
    </MapContainer>
  );
}

export default Map;
