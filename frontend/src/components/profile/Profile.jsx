import { useLoaderData } from "react-router-dom";
import CardProfile from "./CardProfile";
import "./profile.scss";
import stylo from "../../assets/stylo.svg";
import pius from "../../assets/plusCar.svg";
import favoryVid from "../../assets/favoryVid.svg";
import profileImage from "../../assets/images/profilImag.png";
import vehicule from "../../assets/car-imag.svg";
import chargingImage from "../../assets/guidance_charging-station.svg";

export const fetcCarUser = async () => {
  try {
    const { VITE_BACKEND_URL } = import.meta.env;
    const { id } = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(`${VITE_BACKEND_URL}/api/users/cars/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    const [user] = data;
    return user;
  } catch (error) {
    console.error(error);
  }
  return null;
};
function Profile() {
  const dataUser = useLoaderData();

  const data = [
    { id: 1, status: "Profil", img: profileImage, icons: [stylo] },
    { id: 2, status: "Vehicule", img: vehicule, icons: [pius, stylo] },
    { id: 3, status: "Borne", img: chargingImage, icons: [favoryVid] },
  ];
  return (
    <div className="profile">
      <section className="profile-garage">
        <div className="profile-garage-text">
          {dataUser && (
            <ul>
              <h1>{dataUser.name} </h1>
              <h1>{dataUser.firstname}</h1>
            </ul>
          )}
          <p>{`Marque: ${dataUser.Marque}`}</p>
        </div>
      </section>

      {data.map((item) => (
        <CardProfile key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Profile;
