// verifyTokenOnServer.js

const { VITE_BACKEND_URL } = import.meta.env;

const verifyTokenOnServer = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Pas de token trouvé dans le localStorage");
    return;
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
      console.info("Token vérifié avec succès :", data);
    } else {
      console.error(
        "Erreur lors de la vérification du token :",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error.message);
  }
};

export default verifyTokenOnServer;
