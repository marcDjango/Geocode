import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContactPage from "../user/ContactPage/ContactPage";
import "./navbar.scss";
import { useCurrentUserContext } from "../../contexte/CurrentUserContext";
import avatar from "../../assets/Vector.svg";

function Navbar() {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClick] = React.useState(false);
  const [isContactModal, setIsContactModal] = useState(false);
  const location = useLocation();
  const { auth } = useCurrentUserContext();
  const navbarData = [
    { name: "Accueil", route: "/" },
    { name: "Carte", route: "/map" },
    { name: "Profil", route: "/" },
    { name: "Informations", route: "/" },
    { name: "Actualités", route: "/" },
    { name: "Contact", route: "/contact" },
    { name: "A propos de nous", route: "/" },
  ];
  return (
    <div className="navbar">
      {window.innerWidth < 480 ? (
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
            className="navbar-buttons-navigate"
            onClick={() => setButtonClick(false)}
          >
            {buttonClicked &&
              navbarData.map((item) => (
                <button
                  type="button"
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
          </button>
          {isContactModal && (
            <ContactPage
              isContactModal={isContactModal}
              setIsContactModal={setIsContactModal}
            />
          )}
        </>
      ) : (
        <div className="navbar-desktop">
          {navbarData.map((item) => (
            <button
              className="navbar-buttons-desktop"
              type="button"
              key={item.name}
              onClick={() => navigate(item.route)}
            >
              {item.name}
            </button>
          ))}
          {!auth && location.pathname !== "/login" && (
            <>
              <button
                type="button"
                className="navbar-buttons-desktop"
                onClick={() => navigate("/")}
              >
                S'inscrire
              </button>
              <button
                type="button"
                className="navbar-buttons-desktop"
                onClick={() => navigate("/login")}
              >
                <img
                  className="logInOut-avatar-desktop "
                  src={avatar}
                  alt="avatar"
                />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
