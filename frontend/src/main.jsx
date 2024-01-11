import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// import App from "./App";
import RootLayout from "./layout/RootLayout";
import Map from "./components/map/map";
import ChargingStationManagement, {
  fetchdata,
} from "./pages/ChargingStationManagement";
import ContactPage from "./components/user/ContactPage/ContactPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RootLayout />} path="/" />

      <Route
        element={<ChargingStationManagement />}
        path="/charging-station"
        loader={fetchdata}
      />
      <Route element={<ContactPage />} path="/contact" />
      <Route element={<Map />} path="/map" />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
