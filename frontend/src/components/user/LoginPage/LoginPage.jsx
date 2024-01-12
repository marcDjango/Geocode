import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../../contexte/CurrentUserContext";
import Form from "../../form/form";

import "./login.scss";

function LoginPage() {
  const { auth, setAuth } = useCurrentUserContext();
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
        const user = await response.json();
        setAuth(user.user);
        localStorage.setItem("user", JSON.stringify(user.user));
        localStorage.setItem("token", user.token);

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

  return (
    <div className="login-contain">
      {auth ? (
        <p>
          Bonjour {auth.firstname} {auth.name}{" "}
        </p>
      ) : (
        <section className="login-section-contain">
          <Form data={contact} FormPostData={FormPostData} />
        </section>
      )}
    </div>
  );
}

export default LoginPage;
