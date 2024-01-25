import { Link } from "react-router-dom";
import "./home.scss";

function Home() {
  return (
    <div className="home">
      <Link className="home-btn" to="/map">
        Trouver une borne
      </Link>
    </div>
  );
}

export default Home;
