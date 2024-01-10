import React, { useState } from "react";
import PropTypes from "prop-types";
import "./input.scss";

function Input({ name, placeholder, type }) {
  const [valueInput, setValueInput] = useState("");
  const handleOnChange = (e) => {
    setValueInput(e.target.value);
  };
  return (
    <input
      className="input-style typo"
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={valueInput}
      onChange={handleOnChange}
      required
    />
  );
}

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
