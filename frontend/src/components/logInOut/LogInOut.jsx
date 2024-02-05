import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUserContext } from "../../contexte/CurrentUserContext";
import "./logInOut.scss";
import avatar from "../../assets/Vector.svg";
import RegistrationForm from "../user/RegistrationPage/RegistrationForm";

function LogInOut() {
  const location = useLocation();
  const [isSignupModal, setIsSignupModal] = useState(false);

  const { auth } = useCurrentUserContext();
  if (window.innerWidth >= 600 && location.pathname !== "/") {
    return null;
  }
  if (auth || location.pathname === "/login") {
    return null;
  }
  return (
    <>
      {isSignupModal && (
        <RegistrationForm
          isSignupModal={isSignupModal}
          setIsSignupModal={setIsSignupModal}
        />
      )}
      <div className="logInOut">
        <Link className="logInOut-link-login" to="/login">
          <img className="logInOut-avatar" src={avatar} alt="avatar" />
        </Link>
        <button
          type="button"
          className="logInOut-link-signup"
          onClick={() => setIsSignupModal(!isSignupModal)}
        >
          S'inscrire
        </button>
      </div>
    </>
  );
}

export default LogInOut;
