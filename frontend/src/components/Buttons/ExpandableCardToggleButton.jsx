import React, { useState } from "react";
import PropTypes from "prop-types";
import flecheHaute from "../../assets/flecheHaute.svg";
import flecheBase from "../../assets/flecheBase.svg";

function ExpandableCardToggleButton({ setIsExpandable }) {
  const [show, setShow] = useState(false);
  const handleOnClick = () => {
    setIsExpandable(!show);
    setShow(!show);
  };
  return (
    <button
      type="button"
      className="card-profile-header-button"
      onClick={handleOnClick}
    >
      {show ? (
        <img src={flecheHaute} alt="fleche" />
      ) : (
        <img src={flecheBase} alt="fleche" />
      )}
    </button>
  );
}

ExpandableCardToggleButton.propTypes = {
  setIsExpandable: PropTypes.func.isRequired,
};

export default ExpandableCardToggleButton;
