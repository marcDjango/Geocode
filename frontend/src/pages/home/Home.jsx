import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import logoSearch from "../../assets/logoSearch.svg";
import verifyTokenOnServer from "../../services/authVerify";

function Home() {
  const navigate = useNavigate();
  const [isTokenValid, setTokenValid] = useState(null);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await verifyTokenOnServer();

        if (token) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        setTokenValid(false);
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <div className="home">
      <button
        className="home-btn"
        type="button"
        onClick={() => navigate("/map")}
      >
        <img className="home-logoSeaech" src={logoSearch} alt="logo" />
        {!isTokenValid ? <h1>test</h1> : <h1>Trouver une borne</h1>}
      </button>
    </div>
  );
}

export default Home;
