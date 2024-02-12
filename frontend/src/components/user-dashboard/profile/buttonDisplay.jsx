import React from "react";
import PropTypes from "prop-types"; // Import de PropTypes
import flechBase from "../../../assets/flachBase.svg";
import flechHaute from "../../../assets/flachHaute.svg";
import "./style.scss";

function ButtonDisplay({ show, setShow }) {
  const handleOnClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <button
        className="card-profile-header-button"
        type="button"
        onClick={handleOnClick}
      >
        {show ? (
          <img src={flechHaute} alt="flech" />
        ) : (
          <img src={flechBase} alt="flech" />
        )}
      </button>
    </div>
  );
}
// Définition des PropTypes
ButtonDisplay.propTypes = {
  show: PropTypes.bool.isRequired, // show doit être de type booléen et requis
  setShow: PropTypes.func.isRequired, // setShow doit être de type fonction et requis
};

export default ButtonDisplay;
