import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";

function CartContent({ item, show }) {
  const dataUser = useLoaderData();

  let data1 = [];
  let data2 = [];
  if (item.status === "Profil") {
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
    if (dataUser.Marque && dataUser.model && dataUser.type) {
      data1 = [
        { id: 1, line: `Marque: ${dataUser.Marque}` },
        { id: 2, line: `Modele: ${dataUser.model}` },
        { id: 3, line: `Type de prise: ${dataUser.type}` },
      ];
    } else {
      data1 = [];
      data2 = [];
    }
  }
  if (item.status === "Borne") {
    data1 = [
      {
        id: 1,
        line: "Toulouse Métropole -Allées Paul Sabatier 31000 Toulouse",
      },
      { id: 2, line: "Type de prise:" },
      { id: 3, line: "xx  yy   zz" },
    ];
  }

  return (
    <>
      <div className="cart-content">
        <img src={item.img} alt={item.img} />

        <ul className="cart-content-text">
          {data1.map((status) => (
            <li key={status.id}>{status.line}</li>
          ))}
        </ul>
      </div>

      {show && (
        <ul className="cart-content-show">
          {data2.map((status) => (
            <li key={status.id}>{status.line}</li>
          ))}
        </ul>
      )}
    </>
  );
}
CartContent.propTypes = {
  show: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    status: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};
export default CartContent;
