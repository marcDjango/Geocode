import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import geocode from "../../assets/geocode.png";
import "./home.scss";

function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Code pour vérifier si l'image est chargée
    const image = new Image();
    image.src = geocode; // Utilisation de l'import de votre image
    image.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <div className="home">
      <div className={imageLoaded ? "loaded" : ""}>
        <img className="main-image-home" src={geocode} alt="geocode" />
      </div>
      <Link className="home-btn" to="/map">
        Trouver une borne
      </Link>
    </div>
  );
}

export default Home;
