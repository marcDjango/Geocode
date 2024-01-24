import PropTypes from "prop-types";

function CartContent({ item, dataUser }) {
  let data = [];
  if (item.status === "Profil" && dataUser) {
    data = [
      { id: 1, line: `${dataUser.name} ${dataUser.firstname}` },
      { id: 2, line: `${dataUser.date_of_birth}` },
      { id: 3, line: `${dataUser.postal_code} ${dataUser.city}` },
    ];
  }
  if (item.status === "Vehicule") {
    data = [
      { id: 1, line: "Marque: Audi" },
      { id: 2, line: "Model:  e-tron gt quattro" },
      { id: 3, line: "Type de prise: T2 (22w)" },
    ];
  }
  if (item.status === "Borne") {
    data = [
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
          {data.map((status) => (
            <li key={status.id}>{status.line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CartContent;
CartContent.propTypes = {
  item: PropTypes.shape({
    status: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,

  dataUser: PropTypes.arrayOf.isRequired,
};
