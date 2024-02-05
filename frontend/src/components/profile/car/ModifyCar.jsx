import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import propTypes from "prop-types";
import AddCar from "./AddCar";

function ModifyCar({ setModalCar }) {
  const [dataModifyCar, setDataModifyCar] = useState();
  const [dataDeleteCar, setDataDeleteCar] = useState();

  // const [delste, setDelete] = useState(false);
  const dataCars = useLoaderData();
  const navigate = useNavigate();
  const handlerClickModify = (index) => {
    setDataModifyCar(dataCars[index]);
  };
  const handlerClickDelete = (index) => {
    setDataDeleteCar(dataCars[index]);
  };
  const handlerDeleteCar = async () => {
    try {
      const { id } = dataDeleteCar;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cars/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataDeleteCar),
        }
      );
      await response.json();
      setDataDeleteCar(null);
    } catch (error) {
      console.error(error);
    }
    setDataDeleteCar(null);
    navigate("/profile");
  };
  return (
    <div className="modify-delete-car">
      {dataCars.length > 0 && !dataDeleteCar && (
        <div className="modify-delete-car-content">
          {dataCars.map((car, index) => (
            <div key={car.model}>
              <button type="button" onClick={() => handlerClickModify(index)}>
                modifier: {car.Marque}
              </button>
              <button type="button" onClick={() => handlerClickDelete(index)}>
                supprimer: {car.Marque}
              </button>
            </div>
          ))}
        </div>
      )}
      {dataDeleteCar && (
        <div className="delete-car-modal">
          <h1>Voulez-vous vraiment supprimer ce vehicule</h1>
          <div className="delete-car-modal-content">
            <ul className="delete-car-modal-content-text">
              <li>Marque: {dataDeleteCar.Marque}</li>
              <li>Model: {dataDeleteCar.model}</li>
              <li>Type: {dataDeleteCar.type}</li>
            </ul>
            <div className="buttons-content">
              <button type="button" onClick={() => setDataDeleteCar(null)}>
                Annuler
              </button>
              <button type="button" onClick={() => handlerDeleteCar()}>
                <h3>Supprimer</h3>
              </button>
            </div>
          </div>
        </div>
      )}
      {dataModifyCar && (
        <AddCar
          state={setDataModifyCar}
          dataModifyCar={dataModifyCar}
          setModalCar={setModalCar}
          setDataModifyCar={setDataModifyCar}
        />
      )}
    </div>
  );
}

ModifyCar.propTypes = {
  setModalCar: propTypes.func.isRequired,
};

export default ModifyCar;
