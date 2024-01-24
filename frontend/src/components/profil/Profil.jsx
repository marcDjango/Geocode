import React, { useEffect, useState } from "react";
import { useCurrentUserContext } from "../../contexte/CurrentUserContext";
import CardProfil from "./CardProfil";
import "./profil.scss";
import stylo from "../../assets/stylo.svg";
import pius from "../../assets/plusCar.svg";
import favoryVid from "../../assets/favoryVid.svg";
import profilImage from "../../assets/images/profilImag.png";
import vehicule from "../../assets/car-imag.svg";
import chargingImage from "../../assets/guidance_charging-station.svg";

function Profil() {
  const { VITE_BACKEND_URL } = import.meta.env;
  const [dataUser, setDataUser] = useState();
  const { auth } = useCurrentUserContext();
  // console.log(auth);
  const fetchdata = async () => {
    try {
      const { id } = auth;
      const response = await fetch(`${VITE_BACKEND_URL}/api/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDataUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const data = [
    { id: 1, status: "Profil", img: profilImage, icons: [stylo] },
    { id: 2, status: "Vehicule", img: vehicule, icons: [pius, stylo] },
    { id: 3, status: "Borne", img: chargingImage, icons: [favoryVid] },
  ];
  return (
    <div className="profil">
      <section className="profil-garage">
        <div className="profil-garage-text">
          {dataUser && (
            <h1>
              {dataUser.name}
              {dataUser.firstname}
            </h1>
          )}
          <p>Marque: Audi</p>
        </div>
      </section>

      {data.map((item) => (
        <CardProfil key={item.id} item={item} dataUser={dataUser} />
      ))}
    </div>
  );
}

export default Profil;
