import { Link } from "react-router-dom";
import "./home.scss";
import geocode from "../../assets/Geocode.svg";

function Home() {
  return (
    <div className="home">
      <img className="main-image-home" src={geocode} alt="geocode" />
      <Link className="home-btn" to="/map">
        Trouver une borne
      </Link>
    </div>
  );
}

export default Home;
