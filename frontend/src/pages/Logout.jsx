import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  // Effacer le localStorage
  localStorage.clear();

  useEffect(() => {
    // Utiliser useEffect pour appeler navigate() après le rendu initial
    navigate("/");
  }, [navigate]);
  return null;
}

export default Logout;
