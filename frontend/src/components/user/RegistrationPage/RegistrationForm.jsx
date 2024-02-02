import React from "react";
import user from "./config.json";
import Form from "../../form/form";
import "./RegistrationForm.scss";

const { VITE_BACKEND_URL } = import.meta.env;

function RegistrationForm() {
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
      isAdmin: 0,
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
      const dataresponse = await response.json();
      if (!response.ok) {
        console.info(dataresponse);
        throw new Error("Erreur lors de l'inscription");
      }

      // Traiter la réponse ici si nécessaire
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="background-modal">
      <div className="registration-contain">
        <Form data={user} FormPostData={FormPostData} />;
      </div>
    </div>
  );
}

export default RegistrationForm;
