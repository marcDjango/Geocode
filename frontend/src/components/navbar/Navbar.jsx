import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

function navbar() {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClick] = React.useState(false);
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
        style={{ color: "red" }}
        onClick={() => setButtonClick(!buttonClicked)}
      >
        {buttonClicked ? "X" : "O"}
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
