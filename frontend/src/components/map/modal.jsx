import { useState } from "react";
import "./modal.scss";
import PropTypes from "prop-types";
import priseType2 from "../../assets/Prise1.svg";
import priseEf from "../../assets/Prise2.svg";
import priseChademo from "../../assets/Prise3.svg";
import priseComboCcs from "../../assets/Prise4.svg";
import priseAutre from "../../assets/Prise5.svg";
import deplier from "../../assets/Deplier.svg";
import replier from "../../assets/Replier.svg";
import horloge from "../../assets/mdi_clock-outline.svg";
import prise from "../../assets/lucide_plug.svg";

function Modal(props) {
  const { station, handleActivateRoute, handleStopRoute, isRoutingActive } =
    props;

  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const displayText = expanded
    ? station.horaires
    : `${station.horaires.slice(0, 25)}`;

  return (
    <div className="popup-charging-station">
      <div className="part-user">
        <div>UserName</div>
        <div>UserImage</div>
      </div>
      <div className="part-charging-station">
        <div className="part-one-charging-station">
          <div className="station-nom-operateur">
            {decodeURIComponent(escape(station.nom_operateur))}
          </div>
          <div>{decodeURIComponent(escape(station.nom_enseigne))}</div>
          <div>{station.adresse_station}</div>

          <div>
            {station.implatation_station === undefined
              ? ""
              : decodeURIComponent(escape(station.implatation_station))}
          </div>
        </div>
        <div className="part-two-charging-station">
          <div className="number-pdc">
            <img src={prise} alt="prise" />
            {station.nbre_pdc} prises
          </div>
          <div className="timetables">
            <img src={horloge} alt="prise" />
            Ouvert {displayText}
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
            )}
          </div>
        </div>
        <div className="part-plug-charging-station">
          <h3> Type de prises</h3>
          <div className="images-plug">
            <img src={priseEf} alt="Type EF" />
            <img src={priseType2} alt="Type 2" />
            <img src={priseComboCcs} alt="Combo CCS" />
            <img src={priseChademo} alt="Chademo" />
            <img src={priseAutre} alt="Autre" />
          </div>
          <div className="plug-charging-station">
            <div>{station.prise_type_ef === "TRUE" ? "Oui" : "Non"}</div>
            <div>{station.prise_type_2 === "TRUE" ? "Oui" : "Non"}</div>
            <div>{station.prise_type_combo_ccs === "TRUE" ? "Oui" : "Non"}</div>
            <div>{station.prise_type_chademo === "TRUE" ? "Oui" : "Non"}</div>
            <div>{station.prise_type_autre === "TRUE" ? "Oui" : "Non"}</div>
          </div>
        </div>
        <div className="part-rate-charging-station">
          <h3>Tarifs</h3>
          {station.tarification === ""
            ? "Pas d'informations"
            : `Coût de l'énergie : ${station.tarification}€`}
        </div>
        <div className="part-information-charging-station">
          <h3>Informations</h3>
          <div>{decodeURIComponent(escape(station.restriction_gabarit))}</div>
          <div>{decodeURIComponent(escape(station.condition_acces))}</div>
          <div>{decodeURIComponent(escape(station.accessibilite_pmr))}</div>
        </div>
        <div className="button-charging-station">
          <button
            type="button"
            className="button-reservation"
            disabled={station.reservation !== "1"}
          >
            Réserver
          </button>
          <button
            type="button"
            className="itinerary-button"
            onClick={isRoutingActive ? handleStopRoute : handleActivateRoute}
          >
            {isRoutingActive ? "Arrêter l'itinéraire" : "Activer l'itinéraire"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  station: PropTypes.shape({
    nom_operateur: PropTypes.string,
    nom_enseigne: PropTypes.string,
    adresse_station: PropTypes.string,
    implatation_station: PropTypes.string,
    nbre_pdc: PropTypes.number,
    horaires: PropTypes.string,
    prise_type_ef: PropTypes.string,
    prise_type_2: PropTypes.string,
    prise_type_combo_ccs: PropTypes.string,
    prise_type_chademo: PropTypes.string,
    prise_type_autre: PropTypes.string,
    tarification: PropTypes.string,
    restriction_gabarit: PropTypes.string,
    condition_acces: PropTypes.string,
    accessibilite_pmr: PropTypes.string,
    reservation: PropTypes.string,
  }).isRequired,
  handleActivateRoute: PropTypes.func.isRequired,
  handleStopRoute: PropTypes.func.isRequired,
  isRoutingActive: PropTypes.bool.isRequired,
};
