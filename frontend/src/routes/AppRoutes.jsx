import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ContactPage from "../components/user/ContactPage/ContactPage";
import LoginPage from "../components/user/LoginPage/LoginPage";
import ChargingStationManagement, {
  fetchdata,
} from "../pages/ChargingStationManagement";
import Map from "../components/map/map";
import Home from "../pages/home/Home";

function AppRoutes() {
  return (
    <Routes>
      {/* routes pour l'utilisateur ou visiteur  */}
      <Route element={<RootLayout />} path="/">
        <Route element={<Home />} path="/" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Map />} path="/map" />
      </Route>

      {/* routes pour l'administrateur */}
      <Route
        element={<ChargingStationManagement />}
        path="admin/charging-station"
        loader={fetchdata}
      />
    </Routes>
  );
}

export default AppRoutes;
