import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import "./input.scss";

function Input({ name, placeholder, type, isAuth }) {
  const [valueInput, setValueInput] = useState("");
  const handleOnChange = (e) => {
    setValueInput(e.target.value);
  };
  const location = useLocation();
  const autocompleted = location.pathname === "/contact" && true;

  return type === "textArea" ? (
    <textarea
      className="input-style-textarea typo"
      id={name}
      name={name}
      rows="5"
      cols="50"
      placeholder={placeholder}
      value={valueInput}
      onChange={handleOnChange}
      style={{ resize: "none" }}
      required
    />
  ) : (
    <input
      className="input-style typo"
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={isAuth && autocompleted ? placeholder : valueInput}
      onChange={handleOnChange}
      required
    />
  );
}

export default Input;
Input.defaultProps = {
  isAuth: false,
};
Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isAuth: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
};
