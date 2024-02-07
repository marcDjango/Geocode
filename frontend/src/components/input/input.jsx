import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import email from "../../assets/images/email.png";
import password from "../../assets/images/password.png";
import hidden from "../../assets/images/Hidden.png";
import show from "../../assets/images/Show.png";
import "./input.scss";

function Input({ name, placeholder, type, isAuth, route, isAdmin }) {
  const [valueInput, setValueInput] = useState("");
  useEffect(() => {
    if (isAdmin) {
      setValueInput(placeholder);
    }
  }, [isAdmin]);

  const [isVisible, setIsVisible] = useState(false);
  const handleOnChange = (e) => {
    setValueInput(e.target.value);
  };
  const autocompleted = route === "contact";
  const style = route === "/login";
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
    <label className={style ? `icon-${name}` : ""}>
      {style && <img src={name === "password" ? password : email} alt={name} />}
      <input
        className={`input-${style ? "login" : "general"}-style typo`}
        type={isVisible ? "text" : type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={isAuth && autocompleted ? placeholder : valueInput}
        onChange={handleOnChange}
        required
        autoComplete="off"
      />
      {style && name === "password" && (
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          <img src={isVisible ? show : hidden} alt={name} />
        </button>
      )}
    </label>
  );
}

export default Input;
Input.defaultProps = {
  isAuth: false,
  isAdmin: false,
  route: null,
};
Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isAuth: PropTypes.bool,
  route: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};
