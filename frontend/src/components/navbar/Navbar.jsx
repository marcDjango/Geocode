import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ContactPage from "../user/ContactPage/ContactPage";
import { useCurrentUserContext } from "../../contexte/CurrentUserContext";
import avatar from "../../assets/Vector.svg";
import "./navbar.scss";
import RegistrationForm from "../user/RegistrationPage/RegistrationForm";

function Navbar() {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClick] = useState(false);
  const [isContactModal, setIsContactModal] = useState(false);
  const [isSignupModal, setIsSignupModal] = useState(false);

  const location = useLocation();
  const { auth } = useCurrentUserContext();
  const navbarData = [
    { name: "Accueil", route: "/" },
    { name: "Carte", route: "/map" },
    { name: "Profil", route: "/profile" },
    { name: "Contact", route: "/contact" },
  ];
  if (window.innerWidth >= 600 && location.pathname === "/") {
    return null;
  }
  return (
    <div className="navbar">
      {window.innerWidth < 600 ? (
        <>
          <button
            type="button"
            className={`hamburger ${buttonClicked ? "active" : ""}`}
            onClick={() => setButtonClick(!buttonClicked)}
            aria-label="burger-menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
          <button
            type="button"
            className="navbar-links-navigate"
            onClick={() => setButtonClick(false)}
          >
            {buttonClicked &&
              navbarData.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className="category-btn"
                  onClick={() =>
                    item.name === "Contact"
                      ? setIsContactModal(!isContactModal)
                      : navigate(item.route)
                  }
                >
                  {item.name}
                </button>
              ))}
          </button>
          {isContactModal && (
            <ContactPage
              isContactModal={isContactModal}
              setIsContactModal={setIsContactModal}
            />
          )}
          {isSignupModal && (
            <RegistrationForm
              isSignupModal={isSignupModal}
              setIsSignupModal={setIsSignupModal}
            />
          )}
        </>
      ) : (
        <div className="navbar-desktop">
          {navbarData.map((item) => (
            <button
              type="button"
              className="navbar-links-desktop"
              key={item.name}
              onClick={() =>
                item.name === "Contact"
                  ? setIsContactModal(!isContactModal)
                  : navigate(item.route)
              }
            >
              {item.name}
            </button>
          ))}
          {isContactModal && (
            <ContactPage
              isContactModal={isContactModal}
              setIsContactModal={setIsContactModal}
            />
          )}
          {isSignupModal && (
            <RegistrationForm
              isSignupModal={isSignupModal}
              setIsSignupModal={setIsSignupModal}
            />
          )}
          {!auth && location.pathname !== "/login" && (
            <>
              <button
                type="button"
                className="navbar-links-desktop"
                onClick={() => setIsSignupModal(!isSignupModal)}
              >
                S'inscrire
              </button>
              <Link className="navbar-links-desktop" to="/login">
                <img
                  className="logInOut-avatar-desktop "
                  src={avatar}
                  alt="avatar"
                />
              </Link>
            </>
          )}

          {localStorage.getItem("token") && (
            <button
              type="button"
              className="navbar-links-desktop"
              onClick={() => {
                localStorage.clear();
                navigate("/logout");
              }}
            >
              Déconnexion
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
