import { useLoaderData } from "react-router-dom";
import CardProfile from "./user/CardProfile";
import CardCar from "./car/CardCar";
import CardPlug from "./CardPlug";
import "./profile.scss";

export const fetchCarUser = async () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const { id } = JSON.parse(localStorage.getItem("user"));

  const response = await fetch(`${VITE_BACKEND_URL}/api/cars-user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!data) {
    return null;
  }
  return data;
};
function Profile() {
  const dataCars = useLoaderData();
  const dataUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile">
      <section className="profile-garage">
        <div className="profile-garage-text">
          <div className="picture-car" />
          {dataUser && (
            <ul>
              <h1>{dataUser.name} </h1>
              <h1>{dataUser.firstname}</h1>
            </ul>
          )}
          {dataCars.length && <p>{`Marque: ${dataCars[0].Marque}`}</p>}
        </div>
      </section>
      <CardProfile />
      <CardCar />
      <CardPlug />
    </div>
  );
}

export default Profile;
