import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import "./navbar.scss";

function navbar() {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClick] = useState(false);
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
              onClick={() => navigate(item.route)}
            >
              {item.name}
            </button>
          ))}
      </button>
    </div>
  );
}

export default navbar;
