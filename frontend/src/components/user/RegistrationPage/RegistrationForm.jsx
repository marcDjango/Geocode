import React from "react";
import "./RegistrationForm.scss";
import user from "./config.json";
import Form from "../../form/form";

const { VITE_BACKEND_URL } = import.meta.env;

function RegistrationForm() {
  const FormPostData = async (e) => {
    e.preventDefault();
    // Vérifier si le mot de passe et la confirmation du mot de passe sont identiques
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const { confirm_password: confirPassword, ...dataWithoutConfirmPassword } =
      data;
    const password = "password";
    // Supprimer la clé 'confirm_password' de l'objet data avant l'envoi
    if (data[password] !== data[confirPassword]) {
      // Si non identiques, vous pouvez gérer cela ici (par exemple, afficher une erreur)
      console.error(
        "Le mot de passe et la confirmation du mot de passe ne correspondent pas."
      );
      return;
    }
    // Si le mot de passe et la confirmation du mot de passe sont identiques
    // Ajouter une nouvelle clé au nouvel objet
    const newDataWithAdditionalKey = {
      ...dataWithoutConfirmPassword,
      role: 0,
    };
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Spécifier le type de contenu JSON
        },
        body: JSON.stringify(newDataWithAdditionalKey), // Convertir l'objet data en chaîne JSON
      });
      if (!response) {
        throw new Error("Erreur: lors de l'inscription");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <Form data={user} FormPostData={FormPostData} />;
}

export default RegistrationForm;
