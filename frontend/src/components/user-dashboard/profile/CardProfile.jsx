import React, { useState } from "react";
import "./CardProfile.scss";
import ButtonDisplay from "./buttonDisplay";

function CardProfile() {
  const [show, setShow] = useState(false);
  return (
    <div className="card-profile-contain">
      <div className="card-profile-header">
        <ButtonDisplay show={show} setShow={setShow} />
        Title
      </div>
      <div className="card-profile-main">
        <div className="card-profile-main-column">
          <div className="card-profile-main-row">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis iusto
            illum praesentium minus obcaecati corporis aliquid nemo soluta,
            quibusdam magnam temporibus officia neque ratione aperiam id porro
            esse vero quaerat omnis quasi ipsa animi aliquam amet. Eaque, quas
            deserunt delectus atque temporibus, eum similique ducimus iste
            tempore, odit architecto esse?
          </div>
          <div className={`card-profile-main-row-hidden ${show ? "show" : ""}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis iusto
            illum praesentium minus obcaecati corporis aliquid nemo soluta,
            quibusdam magnam temporibus officia neque ratione aperiam id porro
            esse vero quaerat omnis quasi ipsa animi aliquam amet. Eaque, quas
            deserunt delectus atque temporibus, eum similique ducimus iste
            tempore, odit architecto esse?
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
