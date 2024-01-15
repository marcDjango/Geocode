import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import logoSearch from "../../assets/logoSearch.svg";
import verifyTokenOnServer from "../../services/authVerify";

function Home() {
  const navigate = useNavigate();
  const [isTokenValid, setisTokenValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await verifyTokenOnServer();

        if (token) {
          setisTokenValid(true);
        } else {
          setisTokenValid(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        setisTokenValid(false);
      }
    };

    checkToken();
  }, [navigate]);
  console.info(isTokenValid);
  return (
    <div className="home">
      <button
        className="home-btn"
        type="button"
        onClick={() => navigate("/map")}
      >
        <img className="home-logoSeaech" src={logoSearch} alt="logo" />
        <h1>Trouver une borne</h1>
      </button>
    </div>
  );
}

export default Home;
