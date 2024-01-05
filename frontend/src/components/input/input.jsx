import React from "react";
import PropTypes from "prop-types";

function Input({ name, value, onChange }) {
  return (
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
Input.defaultProps = {
  value: "",
};
