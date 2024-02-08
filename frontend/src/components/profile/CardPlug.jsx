import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import line from "../../assets/Line.svg";
import flachBase from "../../assets/flachBase.svg";
import flachHaute from "../../assets/flachHaute.svg";
import chargingImage from "../../assets/guidance_charging-station.svg";

function CardPlug() {
  const [show, setShow] = useState(false);
  const [reservation, setReservation] = useState([]);
  const [onClick, setOnClick] = useState(false);
  useEffect(() => {
    const fetchReservationUser = async () => {
      if (!localStorage.getItem("user")) {
        return redirect("/logout");
      }
      const { VITE_BACKEND_URL } = import.meta.env;
      const { id } = JSON.parse(localStorage.getItem("user"));

      const response = await fetch(
        `${VITE_BACKEND_URL}/api/users/${id}/reservations`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 500) {
        localStorage.clear();
        return redirect("/logout");
      }
      const data = await response.json();
      if (!data) {
        return null;
      }
      setReservation(data);
      return null;
    };
    fetchReservationUser();
  }, [onClick]);
  const handlerdeleteReservation = async () => {
    setOnClick(!onClick);
    if (reservation.length) {
      try {
        const { id } = reservation[0];
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/reservations/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(reservation[0]),
          }
        );
        await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    window.location.reload();
  };
  return (
    <div className="card-profile">
      <div className="card-profile-header">
        <div className="card-profile-button-title">
          <button
            type="button"
            className="card-profile-header-button"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <img src={flachHaute} alt="flach" />
            ) : (
              <img src={flachBase} alt="flach" />
            )}
          </button>
          <h1>Réservation</h1>
        </div>

        {reservation.length > 0 && (
          <button
            type="button"
            className="card-profile-anuler-button"
            onClick={() => handlerdeleteReservation()}
          >
            Anuler
          </button>
        )}
      </div>
      <img className="card-profile-line" src={line} alt="line" />
      <div className="cart-content">
        <div className="cart-content-up">
          <img src={chargingImage} alt="ststion" />
          {reservation.length > 0 && (
            <ul className="cart-content-text">
              <li>{`Name d'operateur : ${reservation[0].nomOperateur}`}</li>
              <li>{`Date : ${reservation[0].reservationDate} Heure : ${reservation[0].reservationHeure}`}</li>
              <li>{`Tarif : ${reservation[0].amountPaid} €`}</li>
            </ul>
          )}
        </div>
        <div className="cart-content-text">
          {show && (
            <ul>
              <li>Toulouse </li>
              <li> Type de prise:</li>
              <li> xx yy zz</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardPlug;
