import { redirect } from "react-router-dom";
import { useCurrentUserContext } from "../contexte/CurrentUserContext";

const { VITE_BACKEND_URL } = import.meta.env;

const verifyTokenOnServer = async () => {
  const token = localStorage.getItem("token");
  const { auth } = useCurrentUserContext();
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/api/verify-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(auth), // Convertir l'objet data en chaîne JSON
    });
    if (response.ok) {
      const data = await response.json();
      console.info("Token vérifié avec succès :", data.token);
      return token; // Retourne le token une fois vérifié avec succès
    }
    return redirect("/logout");
  } catch (error) {
    throw Error("Erreur lors de la vérification :", error.message);
  }
};

export default verifyTokenOnServer;
