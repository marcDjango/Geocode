import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const { VITE_BACKEND_URL } = import.meta.env;

function Delete() {
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { path, sortOrder, sortColumn } = location.state;
  const pathArray = path.split("/").reverse();

  const fetchDataDelete = async () => {
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/api/${pathArray[0]}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setIsDelete(true);
        // Naviguer vers l'emplacement après la suppression réussie
        navigate(path, {
          state: {
            sortOrder: sortOrder || "",
            sortColumn: sortColumn || "",
          },
        });
      } else {
        console.error(
          "Échec de la suppression :",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  useEffect(() => {
    // Appeler fetchDataDelete seulement si la suppression n'a pas encore été effectuée
    if (!isDelete) {
      fetchDataDelete();
    }
  }, [isDelete]);

  return null;
}

export default Delete;
