import PropTypes from "prop-types";

function CartContent({ item, dataUser, show }) {
  let data1 = [];
  let data2 = [];
  if (item.status === "Profil" && dataUser) {
    if (show) {
      data1 = [
        { id: 1, line: `${dataUser.name} ${dataUser.firstname}` },
        { id: 2, line: `${dataUser.date_of_birth}` },
        { id: 3, line: `${dataUser.gender}` },
      ];
      data2 = [
        { id: 5, line: `${dataUser.email}` },
        { id: 4, line: `${dataUser.postal_code} ${dataUser.city}` },
        { id: 6, line: `Nombre de véhicules : ${dataUser.number_vehicles}` },
      ];
    } else {
      data1 = [
        { id: 1, line: `${dataUser.name} ${dataUser.firstname}` },
        { id: 2, line: `${dataUser.date_of_birth}` },
        { id: 3, line: `${dataUser.postal_code} ${dataUser.city}` },
      ];
    }
  }
  if (item.status === "Vehicule") {
    data1 = [
      { id: 1, line: "Marque: Audi" },
      { id: 2, line: "Model:  e-tron gt quattro" },
      { id: 3, line: "Type de prise: T2 (22w)" },
    ];
  }
  if (item.status === "Borne") {
    data1 = [
      {
        id: 1,
        line: "Toulouse Métropole - Allées Paul Sabatierb Allées Paul Sabatier 31000 Toulouse",
      },
      { id: 2, line: "Type de prise:" },
      { id: 3, line: "xx  yy   zz" },
    ];
  }

  return (
    <div className="cart-content">
      <img src={item.img} alt={item.img} />
      <div className="cart-content-text">
        <ul>
          {data1.map((status) => (
            <li key={status.id}>{status.line}</li>
          ))}
        </ul>
        {show && data2.map((status) => <li key={status.id}>{status.line}</li>)}
      </div>
    </div>
  );
}
CartContent.propTypes = {
  show: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    status: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
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
export default CartContent;
