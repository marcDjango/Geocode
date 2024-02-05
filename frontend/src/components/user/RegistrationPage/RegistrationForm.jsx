import React, { useState } from "react";
import PropTypes from "prop-types";
import user from "./config.json";
import Form from "../../form/form";
import "./RegistrationForm.scss";
import Alert from "../../alert/alert";

const { VITE_BACKEND_URL } = import.meta.env;

function RegistrationForm({ isSignupModal, setIsSignupModal }) {
  const [isErrors, setIsErrors] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleOnClickCloseModal = () => {
    setIsSignupModal(!isSignupModal);
  };

  const FormPostData = async (e) => {
    e.preventDefault();

    // Créer un objet FormData à partir de l'événement de formulaire
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);

    // Déclarer 'password' et 'confirm_password' ici
    const password = "password";
    const confirPassword = "confirm_password";

    // Vérifier si le mot de passe et la confirmation du mot de passe sont identiques
    if (data[password] !== data[confirPassword]) {
      // Si non identiques, gérer cela ici (par exemple, afficher une erreur)
      console.error(
        "Le mot de passe et la confirmation du mot de passe ne correspondent pas."
      );
      return;
    }
    // Supprimer la clé 'confirm_password' de l'objet data avant l'envoi
    const { [confirPassword]: _, ...dataWithoutConfirmPassword } = data;

    // Ajouter une nouvelle clé au nouvel objet
    const newDataWithAdditionalKey = {
      ...dataWithoutConfirmPassword,
      is_admin: 0,
      profil_image: null,
    };
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Spécifier le type de contenu JSON
        },
        body: JSON.stringify(newDataWithAdditionalKey), // Convertir l'objet data en chaîne JSON
      });
      if (!response.ok) {
        const dataresponse = await response.json();
        if (dataresponse.validationErrors.length > 0) {
          setIsErrors(dataresponse.validationErrors);
        }
        throw new Error("Erreur lors de l'inscription");
      } else {
        setIsErrors(null);
        setIsSubmit(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="background-modal">
      <div className="registration-contain">
        {(isErrors || isSubmit) && (
          <Alert errors={isErrors} submit={isSubmit} />
        )}
        <div>
          <button
            className="btn-close-modal"
            type="button"
            onClick={handleOnClickCloseModal}
          >
            X
          </button>
        </div>
        <Form data={user} FormPostData={FormPostData} />;
      </div>
    </div>
  );
}

export default RegistrationForm;

RegistrationForm.defaultProps = {
  isSignupModal: false,
  setIsSignupModal: null,
};
RegistrationForm.propTypes = {
  isSignupModal: PropTypes.bool,
  setIsSignupModal: PropTypes.func,
};
