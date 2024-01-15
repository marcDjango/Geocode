import React from "react";
import "./modal.scss";
import PropTypes from "prop-types";

function Modal(props) {
  const { station } = props;

  return (
    <div>
      <div className="popup-charging-station">
        <div className="part-user">user</div>
        <div className="part-charging-station">
          <div className="part-one-charging-station">
            <div>{station.nom_operateur}</div>
            <div>{station.nom_enseigne}</div>
            <div>{station.adresse_station}</div>
            <div>{station.implatation_station}</div>
          </div>
          <div className="part-two-charging-station">
            <div className="number-pdc">{station.nbre_pdc} prises</div>
            <div className="timetables">Ouvert {station.horaires}</div>
          </div>
          <div className="part-plug-charging-station">
            <h3> Type de prise</h3>
            {station.prise_type_ef}
            {station.prise_type_2}
            {station.prise_type_combo_ccs}
            {station.prise_type_chademo}
            {station.prise_type_autre}
          </div>
          <div className="part-rate-charging-station">
            <h3>Tarif</h3>
            Coût de l'énergie : {station.tarification}
          </div>
          <div className="part-information-charging-station">
            {station.restriction_gabarit}
            {station.condition_acces}
            {station.accessibilite_pmr}
          </div>
          <button type="button" className="button-reservation">
            Réserver
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
  }).isRequired,
};
