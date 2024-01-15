import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../contexte/CurrentUserContext";
import "./logInOut.scss";
import avatar from "../../assets/avatar.png";

function LogInOut() {
  const navigate = useNavigate();
  const { auth } = useCurrentUserContext();
  return (
    <div className="logInOut">
      {auth.length > 0 && (
        <>
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
            onClick={() => navigate("/")}
          >
            S'inscrire
          </button>
        </>
      )}
    </div>
  );
}

export default LogInOut;
