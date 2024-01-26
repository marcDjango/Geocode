import React from "react";
import "./AdminLayout.scss";
import { Link, Outlet } from "react-router-dom";
import Avatar from "../assets/images/avatar.png";
import Email from "../assets/images/clarity_email-solid.svg";
import Car from "../assets/images/fa-solid_car.svg";
import User from "../assets/images/fa-solid_users.svg";
import Setting from "../assets/images/ion_settings.svg";
import Logout from "../assets/images/solar_logout-2-bold.svg";
import Calender from "../assets/images/uis_schedule.svg";
import verifyTokenOnServer from "../services/authVerify";

function AdminLayout() {
  const istoken = verifyTokenOnServer();
  console.info(istoken);
  return (
    <div className="adminlayout-content">
      <div className="admin-side">
        <div className="side-menu">
          <div className="top-side-menu">
            <div className="header-side-menu">
              <img src={Avatar} alt="" />
              <span className="text-profil-admin">
                <h3>Administrateur</h3>
                <p>Bonjour</p>
              </span>
            </div>

            <div className="main-side-menu">
              <ul className="side-menu-navigation">
                <li className="menu-navigation-link">
                  <img src={User} alt="icon-link" />
                  <Link to="/admin/users">Liste Users</Link>
                </li>
                <li className="menu-navigation-link">
                  <img src={Car} alt="icon-link" />
                  <Link to="/admin/cars">Voitures</Link>
                </li>
                <li className="menu-navigation-link">
                  <img src={Email} alt="icon-link" />
                  <Link to="/admin/message">Documents</Link>
                </li>
                <li className="menu-navigation-link">
                  <img src={Calender} alt="icon-link" />
                  <p>Réservations</p>
                </li>
                <li className="menu-navigation-link">
                  <img src={Setting} alt="icon-link" />
                  <p>Options</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="bottom-side-menu">
            <div className="footer-side-menu">
              <img src={Logout} alt="" />
              <Link className="logout-link" to="/logout">
                Se déconnecter
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* fin side menu navigation */}
      <div className="admin-body">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
