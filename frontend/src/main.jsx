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
import ChargingStationManagement, {
  fetchdata,
} from "./pages/ChargingStationManagement";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RootLayout />} path="/" />

      <Route
        element={<ChargingStationManagement />}
        path="/charging-station"
        loader={fetchdata}
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
