import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Form from "../../form/form";
import "../RegistrationPage/RegistrationForm.scss";

function LoginPage() {
  const { setAuth } = useOutletContext();

  // Hook pour la navigation
  const navigate = useNavigate();

  const contact = {
    email: {
      value: "Adresse email",
      type: "email",
      option: "required",
    },
    password: {
      value: "Password",
      type: "password",
      option: "required",
    },
  };
  const FormPostData = async (e) => {
    e.preventDefault();
    const { VITE_BACKEND_URL } = import.meta.env;

    // Créer un objet FormData à partir de l'événement de formulaire
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Spécifier le type de contenu JSON
        },
        body: JSON.stringify(data), // Convertir l'objet data en chaîne JSON
      });
      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const auth = await response.json();

        setAuth(auth);

        navigate("/contact");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
      if (!response.ok) {
        throw new Error("Erreur lors de la connexion");
      }
      // Traiter la réponse ici si nécessaire
    } catch (error) {
      console.error(error);
    }
  };

  return <Form data={contact} FormPostData={FormPostData} />;
}

export default LoginPage;
