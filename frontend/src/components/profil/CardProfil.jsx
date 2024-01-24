import PropTypes from "prop-types";
import { useState } from "react";
import CartContent from "./CartContent";
import flachBase from "../../assets/flachBase.svg";
import flachHaute from "../../assets/flachHaute.svg";
import line from "../../assets/Line.svg";

function CardProfil({ item, dataUser }) {
  const [show, setShow] = useState(true);
  return (
    <div className="card-profil">
      <div className="card-profil-header">
        <div className="card-profil-button-title">
          <button
            type="button"
            className="card-profil-header-button"
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

        <div className="card-profil-header-icons">
          {item.icons.map((icon) => (
            <img key={icon} src={icon} alt="icon" />
          ))}
        </div>
      </div>
      <img className="card-profil-line" src={line} alt="line" />
      <CartContent item={item} dataUser={dataUser} show={show} />
    </div>
  );
}
CardProfil.propTypes = {
  item: PropTypes.shape({
    status: PropTypes.string.isRequired,
    icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  dataUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    date_of_birth: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    number_vehicles: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
  }).isRequired,
};
export default CardProfil;
