import React from "react";
import "./modalLocationMap.scss";
import LeafletGeocoderModal from "./searchModal";

function modalLocationMap({ userPosition }) {
  if (userPosition) return null;
  return (
    <div className="background-modal-map">
      <div className="main-background-modal-map">
        Veuillez activer les services de localisation pour cette application,
        sinon entrer manuellement le nom de votre ville :{" "}
        <div className="location-background-modal-map">
          {!userPosition && <LeafletGeocoderModal />}
        </div>
      </div>
    </div>
  );
}

export default modalLocationMap;
