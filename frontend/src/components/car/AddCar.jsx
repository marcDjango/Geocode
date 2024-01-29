import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./addCar.scss";

export const fetchBrands = async () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  try {
    const [brandsResponse, plugsResponse] = await Promise.all([
      fetch(`${VITE_BACKEND_URL}/api/brands`),
      fetch(`${VITE_BACKEND_URL}/api/plugs`),
    ]);

    const dataBrands = await brandsResponse.json();
    const dataPlugs = await plugsResponse.json();

    return { dataBrands, dataPlugs };
  } catch (error) {
    console.error(error);
  }
  return null;
};

function AddCar() {
  const { dataBrands } = useLoaderData();
  const { dataPlugs } = useLoaderData();
  const [valueModal, setValueModal] = useState([]);
  const [propose, setPropose] = useState([]);
  const [marque, setMarque] = useState([]);
  const [modele, setModele] = useState([]);
  const [plugId, setPlugId] = useState(0);
  const [brandId, setBrandId] = useState(0);

  useEffect(() => {
    const dataMarque = [];
    dataBrands.map((item) => {
      if (!dataMarque.includes(item.Marque)) {
        dataMarque.push(item.Marque);
        setMarque(dataMarque);
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (valueModal.length > 0) {
      setPropose(marque.filter((item) => item.includes(valueModal)));
    } else {
      setPropose([]);
    }
  }, [marque, valueModal]);
  useEffect(() => {
    if (propose.length === 1) {
      setModele(dataBrands.filter((item) => item.Marque === propose[0]));
    }
  }, [propose]);
  return (
    <div className="add-car">
      <h1>{(plugId, brandId)}</h1>
      <br />
      <br />
      <br />
      <button type="button">close</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section>
        <h2>vehicule1</h2>
        <div>
          <label htmlFor="modele">Marque :</label>
          <input
            type="text"
            id="modele"
            name="modele"
            autoComplete="off"
            onChange={(e) => setValueModal(e.target.value.toUpperCase())}
          />
          {propose &&
            propose.map(
              (item, index) =>
                index < 3 && (
                  <button type="button" className="proposition" key={item}>
                    {item}
                  </button>
                )
            )}
        </div>
        <div>
          <label htmlFor="marque">Model :</label>
          <select
            name="marque"
            id="marque"
            onChange={(e) =>
              setBrandId(modele.filter((item) => item.model === e.target.value))
            }
          >
            <option value="">--marque--</option>
            {modele.map((item) => (
              <option key={item.id} value={item.model}>
                {item.model}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type">Type de prise :</label>

          <select
            name="type"
            id="type"
            onChange={(e) =>
              setPlugId(
                dataPlugs.filter((item) => item.type === e.target.value)
              )
            }
          >
            <option value="">--prise--</option>
            {dataPlugs.map((item) => (
              <option key={item.id} value={item.type}>
                {item.type}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section>vehicule2</section>
    </div>
  );
}

export default AddCar;
