import React, { useState } from "react";
import "./Reservation.scss";
import { useLocation } from "react-router-dom";
import MyCalendar from "./Schedule";
import priseType2 from "../../../assets/Prise1.svg";
import priseEf from "../../../assets/Prise2.svg";
import priseChademo from "../../../assets/Prise3.svg";
import priseComboCcs from "../../../assets/Prise4.svg";
import priseAutre from "../../../assets/Prise5.svg";
import deplier from "../../../assets/Deplier.svg";
import replier from "../../../assets/Replier.svg";

const { VITE_BACKEND_URL } = import.meta.env;

function Reservation() {
  const [reservationDateTime, setReservationDateTime] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const token = localStorage.getItem("token");
  const payload = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const data = location.state;
  const [isFormValidated, setIsFormValidated] = useState(false);
  const tarification =
    data.station.tarification !== "" ? data.station.tarification : 0;

  const uploadReservation = async (station) => {
    try {
      const isoDate = new Date(reservationDateTime);
      isoDate.setMinutes(
        reservationDateTime.getMinutes() -
          reservationDateTime.getTimezoneOffset()
      );

      const formattedDate = isoDate.toISOString().split("T")[0];

      const response = await fetch(`${VITE_BACKEND_URL}/api/reservations`, {
        method: "POST",
        body: JSON.stringify({
          charging_station_id: station,
          user_id: payload.id,
          reservation_date: formattedDate,
          reservation_heure: selectedHour,
          amount_paid: tarification,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.scrollTo(0, 0);
      } else {
        console.error("Échec de la réservation !");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReservation = (item) => {
    uploadReservation(item);
  };

  const onDateTimeChange = (selectedDateTime) => {
    setReservationDateTime(selectedDateTime);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date ? new Date(date).toLocaleDateString("fr-FR", options) : "";
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const displayText = expanded
    ? data.station.horaires
    : `${data.station.horaires.slice(0, 25)}`;

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleValidation = () => {
    setIsFormValidated(true);
  };

  return (
    <div className="reservation-modal">
      <div className="reservation-main">
        <div className="reservation-informations">
          <div className="informations-title">
            <h2>{decodeURIComponent(escape(data.station.nom_enseigne))}</h2>
          </div>
          <div className="informations-data">
            <div>Adresse : {data.station.adresse_station}</div>
            <div>Numéro de téléphone : {data.station.telephone_operateur}</div>
            <div>
              Horaires : {displayText}
              {data.station.horaires.length > 25 && (
                <button
                  type="button"
                  className="fold-out-button"
                  onClick={toggleExpansion}
                >
                  <img
                    src={expanded ? replier : deplier}
                    alt={expanded ? "Réduire" : "Voir plus"}
                  />
                </button>
              )}{" "}
            </div>
          </div>
          <div className="informations-plug">
            <h3>Type de prises disponibles :</h3>
            <div>
              <img src={priseEf} alt="Type EF" /> Prise Ef :{" "}
              {data.station.prise_type_ef === "TRUE" ? "Oui" : "Non"}
            </div>
            <div>
              <img src={priseType2} alt="Type 2" /> Prise Type 2 :{" "}
              {data.station.prise_type_2 === "TRUE" ? "Oui" : "Non"}
            </div>
            <div>
              <img src={priseComboCcs} alt="Combo CCS" /> Prise Combo CCS :{" "}
              {data.station.prise_type_combo_ccs === "TRUE" ? "Oui" : "Non"}
            </div>
            <div>
              <img src={priseChademo} alt="Chademo" /> Prise Chademo :{" "}
              {data.station.prise_type_chademo === "TRUE" ? "Oui" : "Non"}
            </div>
            <div>
              <img src={priseAutre} alt="Autre" /> Autre :{" "}
              {data.station.prise_type_autre === "TRUE" ? "Oui" : "Non"}
            </div>
          </div>
          <div className="informations-price">
            Tarifs : {data.station.tarification}€
          </div>
        </div>
        <div className="reservation-validation">
          <div className="validation-title">
            <h2>Réservation</h2>{" "}
          </div>
          <div className="reservation-date">
            <MyCalendar onDateTimeChange={onDateTimeChange} />
          </div>
          <div className="time-slot-container">
            <select
              id="timeSlot"
              name="timeSlot"
              onChange={handleHourChange}
              value={selectedHour}
            >
              <option value="">Sélectionnez un créneau</option>
              {[
                8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14,
                14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5,
              ].map((startHour) => {
                const endHour = startHour + 0.5;
                const formattedStartHour = Math.floor(startHour);
                const formattedEndHour = Math.floor(endHour);
                const startMinute = startHour % 1 === 0 ? "00" : "30";
                const endMinute = endHour % 1 === 0 ? "00" : "30";

                const formattedOption = `${formattedStartHour}:${startMinute} - ${formattedEndHour}:${endMinute}`;

                return (
                  <option
                    key={startHour}
                    value={`${formattedStartHour}:${startMinute}`}
                  >
                    {formattedOption}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button
              type="button"
              className="button-validation-calendar"
              onClick={handleValidation}
            >
              Valider
            </button>
          </div>
          {isFormValidated && (
            <>
              <div className="reservation-price">
                {reservationDateTime && (
                  <>
                    Vous avez choisi de réserver une borne{" "}
                    <strong>{data.station.nom_enseigne}</strong> le{" "}
                    <strong>{formatDate(reservationDateTime)} à </strong>
                    <strong>
                      <strong>{selectedHour}</strong>
                    </strong>{" "}
                    pour une durée de 30 min, votre montant est de{" "}
                    <strong>{tarification}</strong> €{" "}
                  </>
                )}
              </div>

              <button
                type="button"
                className="reservation-button"
                onClick={() => handleReservation(data.station.id)}
              >
                Réserver et Payer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservation;
