import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../contexte/CurrentUserContext";
import "./logInOut.scss";
import avatar from "../../assets/Vector.svg";

function LogInOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useCurrentUserContext();
  if (window.innerWidth >= 480 && location.pathname !== "/") {
    return null;
  }
  if (auth || location.pathname === "/login") {
    return null;
  }
  return (
    <div className="logInOut">
      <button
        type="button"
        className="logInOut-btn-login"
        onClick={() => navigate("/login")}
      >
        <img className="logInOut-avatar" src={avatar} alt="avatar" />
      </button>
      <button
        type="button"
        className="logInOut-btn-signup"
        onClick={() => navigate("/signup")}
      >
        S'inscrire
      </button>
    </div>
  );
}

export default LogInOut;
