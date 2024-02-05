import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import flachBase from "../../../assets/flachBase.svg";
import flachHaute from "../../../assets/flachHaute.svg";
import line from "../../../assets/Line.svg";
import profileImage from "../../../assets/images/profilImag.png";
import stylo from "../../../assets/stylo.svg";

function CardProfile() {
  const [show, setShow] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("user"));
  const [age, setAge] = useState(null);

  useEffect(() => {
    // Function to calculate age based on birthdate
    const calculateAge = () => {
      const birthdateDate = new Date(dataUser.date_of_birth);
      const currentDate = new Date();

      let calculatedAge =
        currentDate.getFullYear() - birthdateDate.getFullYear();

      // Adjust age if birthday hasn't occurred yet this year
      if (
        currentDate.getMonth() < birthdateDate.getMonth() ||
        (currentDate.getMonth() === birthdateDate.getMonth() &&
          currentDate.getDate() < birthdateDate.getDate())
      ) {
        calculatedAge -= 1;
      }

      setAge(calculatedAge.toString()); // Convert age to string before setting state
    };

    calculateAge();
  }, [dataUser.date_of_birth]);

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

          <h1>Profil</h1>
        </div>

        <Link className="card-profile-header-icons" to="/profile/">
          <img src={stylo} alt="stylo" />
        </Link>
      </div>
      <img className="card-profile-line" src={line} alt="line" />
      <div className="cart-content">
        <div className="cart-content-up">
          <img src={profileImage} alt="profile" />
          <ul className="cart-content-text">
            <li>{`${dataUser.name} ${dataUser.firstname}`}</li>
            <li>{age} ans</li>
            <li>{`${dataUser.postal_code} ${dataUser.city}`}</li>
          </ul>
        </div>
        {show && (
          <div className="cart-content-up">
            <ul className="cart-content-text">
              <li>{dataUser.email}</li>
              <li>{dataUser.gender}</li>
              <li>Nombre de véhicules : {dataUser.number_vehicles}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardProfile;
