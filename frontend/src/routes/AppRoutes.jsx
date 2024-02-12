import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import LoginPage from "../components/user/LoginPage/LoginPage";
import StationManagement, { fetchdata } from "../pages/admin/StationManagement";
import Map, { getUserLocation } from "../components/map/map";
import Home from "../pages/home/Home";
import Logout from "../pages/Logout";
import AdminLayout from "../layout/AdminLayout";
import UsersManagement, { fetchDataUsers } from "../pages/admin/UserManagement";
import CarsManagement, { fetchDataCars } from "../pages/admin/CarsManagement";
import DocumentManagement, {
  fetchDataMessage,
} from "../pages/admin/DocumentManagement";
import Profile, { fetchCarUser } from "../components/profile/Profile";
import verifyTokenOnServer from "../services/authVerify";
import Delete from "../pages/admin/ActionAdmin/delete";
import ReservationManagement, {
  fetchDataReservation,
} from "../pages/admin/ReservationManagement";
import CardProfile from "../components/user-dashboard/profile/CardProfile";

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* routes pour l'utilisateur ou visiteur  */}
      <Route element={<RootLayout />} path="/" id="rootlayout">
        <Route index element={<Home />} path="/" />
        <Route index element={<CardProfile />} path="/test" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<Map />} path="/map" loader={getUserLocation} />
        <Route element={<Profile />} path="/profile" loader={fetchCarUser} />
      </Route>
      {/* routes pour l'administrateur */}
      <Route
        element={<AdminLayout />}
        path="/admin"
        loader={verifyTokenOnServer}
      >
        <Route
          element={<UsersManagement />}
          path="/admin/users"
          loader={fetchDataUsers}
        />
        <Route
          element={<StationManagement />}
          path="/admin/stations"
          loader={fetchdata}
        />
        <Route
          element={<ReservationManagement />}
          path="/admin/reservations"
          loader={fetchDataReservation}
        />
        <Route
          element={<CarsManagement />}
          path="/admin/cars"
          loader={fetchDataCars}
        />
        <Route
          element={<DocumentManagement />}
          path="/admin/contacts"
          loader={fetchDataMessage}
        />
        <Route element={<Delete />} path="/admin/delete/:id" />
      </Route>
    </Route>
  )
);

export default AppRoutes;
