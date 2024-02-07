import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import croix from "../../../assets/croix.svg";

function ModyfyUser({ setModal, userData }) {
  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;
  const data = JSON.parse(localStorage.getItem("user"));
  const [changePassword, setChangePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState([]);
  const [newData, setNewData] = useState({
    email: userData.email,
    postal_code: userData.postal_code,
    city: userData.city,
    number_vehicles: parseInt(userData.number_vehicles, 10),
    passwordActuel: "",
    password: "",
  });
  const handlerChangeNumberVehicles = (e) => {
    if (e.target.value) {
      setNewData({
        ...newData,
        number_vehicles: parseInt(e.target.value, 10),
      });
    } else {
      setNewData({ ...newData, number_vehicles: 0 });
    }
  };
  useEffect(() => {
    setNewData({
      ...newData,
      password: "",
    });
    if (!changePassword) {
      setNewData({
        ...newData,
        password: "",
      });
      setNewData({ ...newData, password: newData.passwordActuel });
    }
  }, [changePassword, newData.passwordActuel]);
  const handlePostUser = async () => {
    if (newData.password !== confirmPassword && changePassword) {
      alert("Les mots de passe ne sont pas identiques");
      return;
    }
    if (newData.password.length < 8 && changePassword) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/api/usersModyfy/${data.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json", // Spécifier le type de contenu JSON
          },
          body: JSON.stringify(newData), // Convertir l'objet dataUpdate en chaîne JSON
        }
      );
      if (response.status === 401) {
        alert("Le mot de passe actuel est incorrect.");
        return;
      }
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
    setModal(false);
    navigate("/profile");
  };

  return (
    <div className="modyfy-user">
      <div className="modyfy-user-modal">
        <button
          type="button"
          className="add-car-modal-close"
          onClick={() => setModal(false)}
        >
          <img src={croix} alt="close" />
        </button>
        <div className="modyfy-user-modal-inputs">
          <input
            type="text"
            placeholder="Adresse email"
            value={newData.email}
            onChange={(e) => setNewData({ ...newData, email: e.target.value })}
          />

          <input
            type="text"
            placeholder="Code postal"
            value={newData.postal_code}
            onChange={(e) =>
              setNewData({ ...newData, postal_code: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Ville"
            value={newData.city}
            onChange={(e) => setNewData({ ...newData, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nombre de Véhicule"
            value={newData.number_vehicles}
            onChange={(e) => handlerChangeNumberVehicles(e)}
          />

          <input
            type="text"
            placeholder="Mot de passe actuel"
            value={newData.passwordActuel}
            onChange={(e) =>
              setNewData({ ...newData, passwordActuel: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setChangePassword(!changePassword)}
          >
            Changer le mot de passe
          </button>
          {changePassword && (
            <input
              type="text"
              placeholder="Nouveau mot de passe"
              value={newData.password}
              onChange={(e) =>
                setNewData({ ...newData, password: e.target.value })
              }
            />
          )}
          {changePassword && (
            <input
              type="text"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={
                confirmPassword === newData.password
                  ? { color: " green" }
                  : { color: "red" }
              }
            />
          )}
        </div>

        <button
          type="button"
          className="modyfy-user-modal-button"
          onClick={() => handlePostUser()}
        >
          Valider
        </button>
      </div>
    </div>
  );
}

ModyfyUser.propTypes = {
  setModal: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    number_vehicles: PropTypes.number.isRequired,
  }).isRequired,
};

export default ModyfyUser;
