import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactPage from "../user/ContactPage/ContactPage";
import "./navbar.scss";

function navbar() {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClick] = React.useState(false);
  const [isContactModal, setIsContactModal] = useState(false);
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
    <>
      <div className="navbar">
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
      </div>
      {isContactModal && (
        <ContactPage
          isContactModal={isContactModal}
          setIsContactModal={setIsContactModal}
        />
      )}
    </>
  );
}

export default navbar;
