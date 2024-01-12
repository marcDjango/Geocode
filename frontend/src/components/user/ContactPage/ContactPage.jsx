import React from "react";
import { useCurrentUserContext } from "../../../contexte/CurrentUserContext";
import contact from "./config.json";
import Form from "../../form/form";
import "../RegistrationPage/RegistrationForm.scss";

const { VITE_BACKEND_URL } = import.meta.env;

function ContactPage() {
  const { auth } = useCurrentUserContext();
  const userItem = JSON.parse(localStorage.getItem("user"));
  console.info(userItem);

  const isConnected = () => {
    if (auth) {
      contact.name.value = auth.firstname + auth.name;
      contact.email.value = auth.email;
      return true;
    }
    return false;
  };

  const FormPostData = async (e) => {
    e.preventDefault();

    // Créer un objet FormData à partir de l'événement de formulaire
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Spécifier le type de contenu JSON
        },
        body: JSON.stringify(data), // Convertir l'objet data en chaîne JSON
      });
      const dataresponse = await response.json();
      console.info(dataresponse);
      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }
      // Traiter la réponse ici si nécessaire
    } catch (error) {
      console.error(error);
    }
  };
  const verfiAuth = isConnected();
  return (
    <div>
      <Form data={contact} FormPostData={FormPostData} isAuth={verfiAuth} />
    </div>
  );
}

export default ContactPage;
