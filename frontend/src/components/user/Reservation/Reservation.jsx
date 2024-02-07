import React, { useState } from "react";
import "./Reservation.scss";
import PropTypes from "prop-types";
import MyCalendar from "./Schedule";
import priseType2 from "../../../assets/Prise1-2.svg";
import priseEf from "../../../assets/Prise2-2.svg";
import priseChademo from "../../../assets/Prise3-2.svg";
import priseComboCcs from "../../../assets/Prise4-2.svg";
import priseAutre from "../../../assets/Prise5-2.svg";
import deplier from "../../../assets/Deplier.svg";
import replier from "../../../assets/Replier.svg";
import telephone from "../../../assets/Telephone.svg";
import position from "../../../assets/position.svg";
import horloge from "../../../assets/horloge-2.svg";

const { VITE_BACKEND_URL } = import.meta.env;

function Reservation({ station, handleCloseReservationModal }) {
  const [reservationDateTime, setReservationDateTime] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const token = localStorage.getItem("token");
  const payload = JSON.parse(localStorage.getItem("user"));
  const [isFormValidated, setIsFormValidated] = useState(false);
  const tarification = station.tarification !== "" ? station.tarification : 0;

  const uploadReservation = async (chargingStation) => {
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
          charging_station_id: chargingStation,
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
        handleCloseReservationModal();
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
    ? station.horaires
    : `${station.horaires.slice(0, 25)}`;

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleValidation = () => {
    setIsFormValidated(true);
  };

  const handleCancellation = () => {
    setIsFormValidated(false);
  };

  return (
    <div className="reservation-modal">
      <div className="reservation-main">
        <div className="reservation-informations">
          <div className="button-close-modal-main">
            <button
              className="boutton-close-modal-reservation"
              type="button"
              onClick={handleCloseReservationModal}
            >
              X
            </button>
          </div>
          <div className="informations-title">
            <h2>{decodeURIComponent(escape(station.nom_enseigne))}</h2>
          </div>
          <div className="informations-data">
            <div className="informations-adresse">
              <img src={position} alt="adresse" />
              Adresse : {station.adresse_station}
            </div>
            <div className="informations-telephone">
              <img src={telephone} alt="telephone" />
              Numéro de téléphone : {station.telephone_operateur}
            </div>
            <div className="informations-horloge">
              <img src={horloge} alt="horloge" />
              Horaires : {displayText}
              {station.horaires.length > 25 && (
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
              {station.prise_type_ef === "TRUE" ? "Oui" : "Non"}
            </div>
            <div>
              <img src={priseType2} alt="Type 2" /> Prise Type 2 :{" "}
              {station.prise_type_2 === "TRUE" ? "Oui" : "Non"}
            </div>
            <div>
              <img src={priseComboCcs} alt="Combo CCS" /> Prise Combo CCS :{" "}
              {station.prise_type_combo_ccs === "TRUE" ? "Oui" : "Non"}
            </div>
            <div>
              <img src={priseChademo} alt="Chademo" /> Prise Chademo :{" "}
              {station.prise_type_chademo === "TRUE" ? "Oui" : "Non"}
            </div>
            <div>
              <img src={priseAutre} alt="Autre" /> Autre :{" "}
              {station.prise_type_autre === "TRUE" ? "Oui" : "Non"}
            </div>
          </div>
          <div className="informations-price">
            Tarifs : {station.tarification}€
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
              className="select-no-arrow"
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
          {reservationDateTime && selectedHour && (
            <div>
              <button
                type="button"
                className="button-validation-calendar"
                onClick={handleValidation}
              >
                Validez
              </button>
            </div>
          )}
          {isFormValidated && (
            <div className="background-modal-validation-reservation">
              <div className="modal-validation-reservation">
                <div className="reservation-price">
                  {reservationDateTime && (
                    <>
                      Vous avez choisi de réserver une borne{" "}
                      <strong>{station.nom_enseigne}</strong> le{" "}
                      <strong>{formatDate(reservationDateTime)} à </strong>
                      <strong>
                        <strong>{selectedHour}</strong>
                      </strong>{" "}
                      pour une durée de 30 min, votre montant est de{" "}
                      <strong>{tarification}</strong> €.
                    </>
                  )}
                </div>
                <div className="reservation-button">
                  <button
                    type="button"
                    className="validation-reservation-button"
                    onClick={() => handleReservation(station.id)}
                  >
                    Réservez et Payez
                  </button>
                  <button
                    type="button"
                    className="cancellation-reservation-button"
                    onClick={handleCancellation}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservation;

Reservation.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number,
    nom_enseigne: PropTypes.string,
    adresse_station: PropTypes.string,
    telephone_operateur: PropTypes.string,
    horaires: PropTypes.string,
    tarification: PropTypes.number,
    prise_type_ef: PropTypes.string,
    prise_type_2: PropTypes.string,
    prise_type_combo_ccs: PropTypes.string,
    prise_type_autre: PropTypes.string,
    prise_type_chademo: PropTypes.string,
  }).isRequired,
  handleCloseReservationModal: PropTypes.func.isRequired,
};
