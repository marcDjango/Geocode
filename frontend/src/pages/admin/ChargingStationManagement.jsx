import React from "react";
import { useLoaderData } from "react-router-dom";
import SortableTable from "../../components/admin/table/SortableTable";

const { VITE_BACKEND_URL } = import.meta.env;

// export const fetchdata = async () => {
//   try {
//     const reponse = await fetch(`${VITE_BACKEND_URL}/api/charging-stations`);
//     const data = await reponse.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
//   return null;
// };

export const fetchDataStations = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${VITE_BACKEND_URL}/api/charging-stations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error("error", error);
  }
};
function ChargingStationManagement() {
  const dataLoad = useLoaderData();

  return <SortableTable dataLoad={dataLoad} />;
}

export default ChargingStationManagement;
