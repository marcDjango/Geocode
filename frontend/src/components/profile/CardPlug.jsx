import { useState } from "react";
import { Link } from "react-router-dom";
import favoryVid from "../../assets/favoryVid.svg";
import flachBase from "../../assets/flachBase.svg";
import flachHaute from "../../assets/flachHaute.svg";
import line from "../../assets/Line.svg";
import chargingImage from "../../assets/guidance_charging-station.svg";

function CardPlug() {
  const [show, setShow] = useState(false);
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

          <h1>Borne</h1>
        </div>

        <Link to="/profile/">
          <img src={favoryVid} alt="favory" />
        </Link>
      </div>
      <img className="card-profile-line" src={line} alt="line" />
      <div className="cart-content">
        <div className="cart-content-up">
          <img src={chargingImage} alt="ststion" />
          <ul className="cart-content-text">
            <li>Toulouse </li>
            <li>Type de prise:</li>
            <li> xx yy zz</li>
          </ul>
        </div>
        <div className="cart-content-text">
          {show && (
            <ul>
              <li>Toulouse </li>
              <li> Type de prise:</li>
              <li> xx yy zz</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardPlug;
