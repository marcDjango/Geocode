import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ContactPage from "../components/user/ContactPage/ContactPage";
import LoginPage from "../components/user/LoginPage/LoginPage";
import ChargingStationManagement, {
  fetchdata,
} from "../pages/ChargingStationManagement";
import Map from "../components/map/map";
import RegistrationForm from "../components/user/RegistrationPage/RegistrationForm";
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
import AddCar, { fetchBrands } from "../components/car/AddCar";

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* routes pour l'utilisateur ou visiteur  */}
      <Route element={<RootLayout />} path="/" id="rootlayout">
        <Route index element={<Home />} />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<RegistrationForm />} path="/signup" />
        <Route element={<Map />} path="/map" />
        <Route element={<Profile />} path="/profile" loader={fetchCarUser} />
      </Route>
      <Route element={<AddCar />} path="/add-car" loader={fetchBrands} />
      {/* routes pour l'administrateur */}
      <Route
        element={<AdminLayout />}
        path="/admin"
        loader={verifyTokenOnServer}
      >
        <Route
          element={<ChargingStationManagement />}
          path="/admin/charging-station"
          loader={fetchdata}
        />
        <Route
          element={<UsersManagement />}
          path="/admin/users"
          loader={fetchDataUsers}
        />
        <Route
          element={<CarsManagement />}
          path="/admin/cars"
          loader={fetchDataCars}
        />
        <Route
          element={<DocumentManagement />}
          path="/admin/message"
          loader={fetchDataMessage}
        />
      </Route>
    </Route>
  )
);

export default AppRoutes;
