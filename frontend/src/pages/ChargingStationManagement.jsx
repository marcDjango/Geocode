import React from "react";
import { useLoaderData } from "react-router-dom";
import RegistrationForm from "../components/user/RegistrationPage/RegistrationForm";

const { VITE_BACKEND_URL } = import.meta.env;

export const fetchdata = async () => {
  try {
    const reponse = await fetch(`${VITE_BACKEND_URL}/api/charging-station`);
    const data = await reponse.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

function ChargingStationManagement() {
  const dataLoad = useLoaderData();
  console.info(dataLoad);
  return (
    <div>
      <RegistrationForm />
      {/* {dataLoad.map((item) => item.nom_operateur)} */}
    </div>
  );
}

export default ChargingStationManagement;
