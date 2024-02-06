import React from "react";
import { useLoaderData } from "react-router-dom";
import SortableTable from "../../components/admin/table/SortableTable";

const { VITE_BACKEND_URL } = import.meta.env;

export const fetchDataCars = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Pas de token trouvé dans le localStorage");
    return null; // Retourne null au lieu de retourner la valeur
  }

  try {
    const response = await fetch(`${VITE_BACKEND_URL}/api/cars`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Retourne null en cas d'erreur
  }
};

function CarsManagement() {
  const dataLoad = useLoaderData();
  return dataLoad.length > 0 && <SortableTable dataLoad={dataLoad} />;
}

export default CarsManagement;
