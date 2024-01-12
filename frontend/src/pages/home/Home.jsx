import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import logoSearch from "../../assets/logoSearch.svg";

function Home() {
  const navigate = useNavigate();
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
