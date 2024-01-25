import { useNavigate } from "react-router-dom";

const { VITE_BACKEND_URL } = import.meta.env;

const verifyTokenOnServer = async () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    console.error("Pas de token trouvé dans le localStorage");
    return null; // Ajout de la ligne pour retourner null en cas d'absence de token
  }
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/api/verify-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.info("Token vérifié avec succès :", data.token);
      return token; // Retourne le token une fois vérifié avec succès
    }
    console.error(
      "Erreur lors de la vérification du token :",
      response.statusText
    );
    navigate("/logout");
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error.message);
  }

  return null; // Retourne null en cas d'erreur pendant la vérification
};

export default verifyTokenOnServer;
