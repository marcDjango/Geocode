import React from "react";
import { useLoaderData } from "react-router-dom";
import SortableTable from "../../components/admin/table/SortableTable";

const { VITE_BACKEND_URL } = import.meta.env;

export const fetchdata = async (limit) => {
  try {
    const reponse = await fetch(
      `${VITE_BACKEND_URL}/api/charging-stations?limit=${limit}`
    );
    const data = await reponse.json();
    // Traitement des données garder 6 chiffres après la virgule
    const processedData = data.map((station) => {
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
    return uniqueData;
  } catch (error) {
    console.error(error);
  }
  return null;
};

function StationManagement() {
  const dataLoad = useLoaderData();

  return dataLoad.length > 0 && <SortableTable dataLoad={dataLoad} />;
}

export default StationManagement;
