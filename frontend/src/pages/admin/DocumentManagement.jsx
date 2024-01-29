// UsersManagement.jsx
import React from "react";
import { useLoaderData } from "react-router-dom";
import SortableTable from "../../components/admin/table/SortableTable";

const { VITE_BACKEND_URL } = import.meta.env;

export const fetchDataMessage = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Pas de token trouvé dans le localStorage");
    return null; // Retourne null au lieu de retourner la valeur
  }

  try {
    const response = await fetch(`${VITE_BACKEND_URL}/api/contacts`, {
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

function DocumentManagement() {
  const dataLoad = useLoaderData();

  return <SortableTable dataLoad={dataLoad} />;
}

export default DocumentManagement;
