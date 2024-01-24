import { Link, useLocation } from "react-router-dom";
import { React, useState } from "react";
import "./navbar.scss";
import { useCurrentUserContext } from "../../contexte/CurrentUserContext";
import avatar from "../../assets/Vector.svg";

function navbar() {
  const location = useLocation();
  const { auth } = useCurrentUserContext();
  const [buttonClicked, setButtonClick] = useState(false);
  const navbarData = [
    { name: "Accueil", route: "/" },
    { name: "Carte", route: "/map" },
    { name: "Profil", route: "/profil" },
    { name: "Informations", route: "/" },
    { name: "Actualités", route: "/" },
    { name: "Contact", route: "/contact" },
    { name: "A propos de nous", route: "/" },
  ];
  if (window.innerWidth >= 600 && location.pathname === "/") {
    return null;
  }
  return (
    <div className="navbar">
      {window.innerWidth < 600 ? (
        <>
          {" "}
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
                <Link key={item.name} to={item.route}>
                  {item.name}
                </Link>
              ))}
          </button>
        </>
      ) : (
        <div className="navbar-desktop">
          {navbarData.map((item) => (
            <Link
              className="navbar-links-desktop"
              key={item.name}
              to={item.route}
            >
              {item.name}
            </Link>
          ))}
          {!auth && location.pathname !== "/login" && (
            <>
              <Link className="navbar-links-desktop" to="/signup">
                S'inscrire
              </Link>
              <Link className="navbar-links-desktop" to="/login">
                <img
                  className="logInOut-avatar-desktop "
                  src={avatar}
                  alt="avatar"
                />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default navbar;
