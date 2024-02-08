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
  console.info(auth);
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
      const user = await response.json();
      if (response.status === 200) {
        if (user.user.is_admin === 1) {
          delete user.user.is_admin;
          setAuth(user.user);
          localStorage.setItem("user", JSON.stringify(user.user));
          localStorage.setItem("token", user.token);
          navigate("/admin");
        } else {
          delete user.user.is_admin;
          setAuth(user.user);
          localStorage.setItem("user", JSON.stringify(user.user));
          localStorage.setItem("token", user.token);
          navigate("/map");
        }
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
