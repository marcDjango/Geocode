import PropTypes from "prop-types";
import CartContent from "./CartContent";
import flachBase from "../../assets/flachBase.svg";

function CardProfil({ item, dataUser }) {
  return (
    <div className="card-profil">
      <div className="card-profil-header">
        <div className="card-profil-button-title">
          <button type="button" className="card-profil-header-button">
            <img src={flachBase} alt="flach" />
          </button>

          <h1>{item.status}</h1>
        </div>

        <div className="card-profil-header-icons">
          {item.icons.map((icon) => (
            <img key={icon} src={icon} alt="icon" />
          ))}
        </div>
      </div>

      <CartContent item={item} dataUser={dataUser} />
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
  }).isRequired,
};
export default CardProfil;
