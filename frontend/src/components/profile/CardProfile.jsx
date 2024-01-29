import PropTypes from "prop-types";
import { useState } from "react";
import CartContent from "./CartContent";
import flachBase from "../../assets/flachBase.svg";
import flachHaute from "../../assets/flachHaute.svg";
import line from "../../assets/Line.svg";

function CardProfile({ item }) {
  const [show, setShow] = useState(false);
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

        <div className="card-profile-header-icons">
          {item.icons.map((icon) => (
            <img key={icon} src={icon} alt="icon" />
          ))}
        </div>
      </div>
      <img className="card-profile-line" src={line} alt="line" />
      <CartContent item={item} show={show} />
    </div>
  );
}
CardProfile.propTypes = {
  item: PropTypes.shape({
    status: PropTypes.string.isRequired,
    icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
export default CardProfile;
