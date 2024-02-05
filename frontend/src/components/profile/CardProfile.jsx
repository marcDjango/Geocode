import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContent from "./CartContent";
import flachBase from "../../assets/flachBase.svg";
import flachHaute from "../../assets/flachHaute.svg";
import line from "../../assets/Line.svg";

function CardProfile({ item }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClickIcon = (e) => {
    if (e.target.alt === "Profil") {
      navigate("/profile");
    }
    if (e.target.alt === "Vehicule") {
      navigate("/add-car");
    }
    if (e.target.alt === "Borne") {
      navigate("/profile");
    }
  };
  return (
    <div className={show ? "card-profile-show card-profile" : "card-profile"}>
      <div className="card-profile-header">
        <div className="card-profile-button-title">
          <button
            type="button"
            className="card-profile-header-button"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <img src={flachHaute} alt="flach" />
            ) : (
              <img src={flachBase} alt="flach" />
            )}
          </button>

          <h1>{item.status}</h1>
        </div>

        <button
          type="button"
          className="card-profile-header-icons"
          onClick={(e) => handleClickIcon(e)}
        >
          <img key={item.icon} src={item.icon} alt={item.status} />
        </button>
      </div>
      <img className="card-profile-line" src={line} alt="line" />
      <CartContent item={item} show={show} />
    </div>
  );
}
CardProfile.propTypes = {
  item: PropTypes.shape({
    status: PropTypes.string.isRequired,
    icon: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
export default CardProfile;
