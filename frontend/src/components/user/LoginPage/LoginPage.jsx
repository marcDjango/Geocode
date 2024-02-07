import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../../contexte/CurrentUserContext";
import Form from "../../form/form";
import Alert from "../../alert/alert";
import "./login.scss";
import RegistrationForm from "../RegistrationPage/RegistrationForm";

function LoginPage() {
  const { auth, setAuth } = useCurrentUserContext();
  const navigate = useNavigate();
  const [isErrors, setIsErrors] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSignupModal, setIsSignupModal] = useState(false);

  const contact = {
    email: {
      value: "Adresse email",
      type: "email",
      option: "required",
    },
    password: {
      value: "Mot de passe",
      type: "password",
      option: "required",
    },
  };
  const FormPostData = async (e) => {
    e.preventDefault();
    const { VITE_BACKEND_URL } = import.meta.env;
    setIsSubmit(true);
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
      const user = await response.json();
      if (response.status === 200) {
        setAuth(user.user);
        localStorage.setItem("user", JSON.stringify(user.user));
        localStorage.setItem("token", user.token);
        navigate("/");
      } else {
        if (user.validationErrors.length > 0) {
          setIsErrors(user.validationErrors);
          setIsSubmit(true);
        }
        throw new Error("Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("error", error);
      setIsErrors({ field: "server", message: "Erreur de serveur" });
      setIsSubmit(true);
    }
  };
  return (
    <section className="tercolumn">
      <div className="login-contain">
        {auth ? (
          <p>
            Bonjour {auth.firstname} {auth.name}{" "}
          </p>
        ) : (
          <div className="login-main">
            <section className="login-section-contain">
              <div className="login-form-contain">
                <Form
                  data={contact}
                  FormPostData={FormPostData}
                  action
                  route="/login"
                  setModal={setIsSignupModal}
                />
              </div>
            </section>
            <div className="pos-relative">
              {isErrors && isSubmit && (
                <Alert errors={isErrors} submit={isSubmit} />
              )}
            </div>
          </div>
        )}
      </div>
      {isSignupModal && (
        <RegistrationForm
          isSignupModal={isSignupModal}
          setIsSignupModal={setIsSignupModal}
        />
      )}
    </section>
  );
}

export default LoginPage;
