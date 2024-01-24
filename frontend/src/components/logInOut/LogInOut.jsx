import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUserContext } from "../../contexte/CurrentUserContext";
import "./logInOut.scss";
import avatar from "../../assets/Vector.svg";

function LogInOut() {
  const location = useLocation();

  const { auth } = useCurrentUserContext();
  if (window.innerWidth >= 600 && location.pathname !== "/") {
    return null;
  }
  if (auth || location.pathname === "/login") {
    return null;
  }
  return (
    <div className="logInOut">
      <Link className="logInOut-link-login" to="/login">
        <img className="logInOut-avatar" src={avatar} alt="avatar" />
      </Link>
      <Link className="logInOut-link-signup" to="/signup">
        S'inscrire
      </Link>
    </div>
  );
}

export default LogInOut;
