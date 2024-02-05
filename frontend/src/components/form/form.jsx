import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Select from "../select/select";
import Input from "../input/input";
import User from "../../assets/images/Vector.svg";

function Form({ data, FormPostData, isAuth, action, route, isAdmin }) {
  return (
    <div>
      <form className="df-column" onSubmit={FormPostData}>
        {action && (
          <div className="contain-login-logo">
            <img src={User} alt="user icon" />
          </div>
        )}
        {Object.keys(data).map((fieldName) =>
          data[fieldName].type !== "select" ? (
            <Input
              key={fieldName}
              name={fieldName}
              type={data[fieldName].type}
              placeholder={data[fieldName].value}
              required={data[fieldName].option === "required"}
              isAuth={isAuth}
              route={route}
              isAdmin={isAdmin}
            />
          ) : (
            <Select
              key={fieldName}
              entry={fieldName}
              name={data[fieldName].value}
              objet={data[fieldName].option}
            />
          )
        )}
        {action && (
          <Link className="login-link-password" to="/sinscire">
            Mot de passe oublié?
          </Link>
        )}
        <button className="signin-btn-submit" type="submit">
          {action ? "Se connecter" : "Valider"}
        </button>
        {action && (
          <Link className="login-link-signup" to="/signup">
            S'inscrire
          </Link>
        )}
      </form>
    </div>
  );
}

export default Form;

const dataShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  option: PropTypes.arrayOf,
});
Form.defaultProps = {
  isAuth: false,
  isAdmin: false,
  action: false,
  route: null,
};
Form.propTypes = {
  route: PropTypes.string,
  data: PropTypes.objectOf(dataShape).isRequired,
  FormPostData: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  isAuth: PropTypes.bool,
  action: PropTypes.bool,
};
