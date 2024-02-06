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
import { Icon, DivIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import VectorImage from "../../assets/el_map-marker.svg";
import LocationMarker from "./location";
import LeafletGeocoder from "./search";
import Modal from "./modal";
import Itinerary from "./itinerary";
import Reservation from "../user/Reservation/Reservation";
import ModalMap from "./modalLocationMap";

const { VITE_BACKEND_URL } = import.meta.env;

function Map() {
  // Position initiale de la carte
  const position = [46.6031, 1.8883];

  const [chargingStations, setChargingStations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isRoutingActive, setRoutingActive] = useState(false);
  const [selectedStationLocation, setSelectedStationLocation] = useState(null);
  const [isReservationModal, setIsReservationModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isReservationButtonClicked, setIsReservationButtonClicked] =
    useState(false);

  // Fonction pour récupérer les stations de recharge depuis le backend
  const fetchChargingStations = useCallback(async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/charging-stations`);
      const data = await response.json();

      // Limitez le nombre de lignes de charging_stations
      const limitedData = data.slice(0, 1000);

      // Traitement des données garder 6 chiffres après la virgule
      const processedData = limitedData.map((station) => {
        const latitude = parseFloat(station.consolidated_latitude).toFixed(6);
        const longitude = parseFloat(station.consolidated_longitude).toFixed(6);

        return {
          ...station,
          consolidated_latitude: latitude,
          consolidated_longitude: longitude,
        };
      });

      // Supprimer les doublons
      const uniqueData = processedData.filter(
        (station, index, self) =>
          index ===
          self.findIndex(
            (s) =>
              s.consolidated_latitude === station.consolidated_latitude &&
              s.consolidated_longitude === station.consolidated_longitude
          )
      );

      setChargingStations(uniqueData);
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

  const handleMarkerClick = (station) => {
    setSelectedStation(station);
    setSelectedStationLocation([
      station.consolidated_latitude,
      station.consolidated_longitude,
    ]);
  };

  const handlePopupClose = () => {
    setSelectedStationLocation(null);
  };

  const handleActivateRoute = () => {
    setRoutingActive(true);
  };

  const handleStopRoute = () => {
    setRoutingActive(false);
  };

  const handleOpenReservationModal = () => {
    setIsReservationModal(true);
    setIsReservationButtonClicked(true);
  };

  const handleCloseReservationModal = () => {
    setIsReservationModal(false);
    setIsReservationButtonClicked(false);
  };

  return (
    <MapContainer
      center={position}
      zoom={6}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        accessToken="Ub2AxCLkCgIdI6pF2eBFVaPDSbbrCWDR9aQaCd8oiLatz7jRZajpn2Wi949QupSD"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        maxClusterRadius={80}
      >
        {chargingStations.map((station) => (
          <Marker
            key={station.id}
            position={[
              station.consolidated_latitude,
              station.consolidated_longitude,
            ]}
            icon={customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(station),
            }}
          >
            <Popup onClose={handlePopupClose} autoPan autoPanPadding={[50, 50]}>
              <Modal
                station={station}
                handleActivateRoute={handleActivateRoute}
                handleStopRoute={handleStopRoute}
                isRoutingActive={isRoutingActive}
                onReservationButtonClick={handleOpenReservationModal}
              />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <LocationMarker />
      {userLocation && selectedStationLocation && (
        <Itinerary
          userLocation={userLocation}
          isActive={isRoutingActive}
          chargingStations={[
            {
              consolidated_latitude: selectedStationLocation[0],
              consolidated_longitude: selectedStationLocation[1],
            },
          ]}
          handleStopRoute={handleStopRoute}
        />
      )}
      <ZoomControl position="bottomright" />
      <LeafletGeocoder />
      {isReservationButtonClicked && selectedStation && isReservationModal && (
        <Reservation
          handleCloseReservationModal={handleCloseReservationModal}
          station={selectedStation}
        />
      )}
      {!userLocation && <ModalMap />}
    </MapContainer>
  );
}

export default Map;
